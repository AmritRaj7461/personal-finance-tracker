import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingBag, Zap, Car, Plus, X, CheckCircle2 } from 'lucide-react';
import { useFirestore } from '../hooks/useFirestore';
import { auth } from '../firebase/config';

const QuickActions = ({ theme }) => {
    const { addTransaction } = useFirestore('transactions');
    const [selectedAction, setSelectedAction] = useState(null);
    const [customAmount, setCustomAmount] = useState('');

    const actions = [
        { label: 'Food', icon: <Coffee size={16} />, amt: 200, cat: 'Food & Dining' },
        { label: 'Fuel', icon: <Car size={16} />, amt: 1000, cat: 'Transport' },
        { label: 'Shop', icon: <ShoppingBag size={16} />, amt: 500, cat: 'Shopping' },
        { label: 'Bills', icon: <Zap size={16} />, amt: 1500, cat: 'Bills' },
    ];

    const handleQuickLog = async () => {
        if (!auth.currentUser || !selectedAction) return;

        const finalAmount = customAmount ? Number(customAmount) : selectedAction.amt;

        await addTransaction({
            title: selectedAction.label,
            amount: finalAmount,
            type: 'expense',
            category: selectedAction.cat,
            method: 'Online',
            createdAt: new Date()
        }, auth.currentUser.uid);

        setSelectedAction(null);
        setCustomAmount('');
    };

    return (
        <div className="space-y-4 mb-6 sm:mb-8">
            {/* Header Label */}
            <div className="flex items-center gap-2 px-1 sm:px-2">
                <Plus size={14} className="text-indigo-500" />
                <span
                    className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                        }`}
                >
                    Quick Auth Bar
                </span>
            </div>

            {/* Horizontal Scroll of Actions */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
                {actions.map((item) => (
                    <motion.button
                        key={item.label}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setSelectedAction(item);
                            setCustomAmount(item.amt.toString());
                        }}
                        className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 rounded-[1.8rem] border transition-all duration-300 group whitespace-nowrap ${theme === 'dark'
                            ? 'bg-[#0a0c10]/60 border-white/5 text-slate-300 hover:bg-indigo-500/10 hover:border-indigo-500/30'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm'
                            }`}
                    >
                        <div
                            className={`p-2 sm:p-2.5 rounded-xl ${theme === 'dark'
                                ? 'bg-white/5 text-indigo-400'
                                : 'bg-indigo-50 text-indigo-600'
                                }`}
                        >
                            {item.icon}
                        </div>
                        <div className="text-left">
                            <p
                                className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-800'
                                    }`}
                            >
                                {item.label}
                            </p>
                            <p
                                className={`text-xs font-bold ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                                    }`}
                            >
                                ₹{item.amt}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* AUTH MODAL */}
            <AnimatePresence>
                {selectedAction && (
                    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAction(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
                        />

                        {/* Modal Body */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className={`relative z-10 w-full max-w-sm p-6 sm:p-10 rounded-[3rem] border shadow-[0_0_120px_rgba(0,0,0,1)] ${theme === 'dark'
                                ? 'bg-[#0a0c10] border-white/10'
                                : 'bg-white border-slate-200'
                                }`}
                        >
                            <button
                                onClick={() => setSelectedAction(null)}
                                className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-slate-500 hover:text-rose-500 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="h-14 w-14 sm:h-16 sm:w-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
                                    <CheckCircle2 className="text-indigo-500" size={32} />
                                </div>

                                <h3
                                    className={`text-lg sm:text-xl font-black uppercase italic mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                                        }`}
                                >
                                    Confirm Action
                                </h3>

                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 sm:mb-8">
                                    Authorizing {selectedAction.label} Transaction
                                </p>

                                {/* Amount Input */}
                                <div className="w-full space-y-2 mb-8 sm:mb-10">
                                    <label className="text-[9px] font-black uppercase text-indigo-500 block text-left ml-2">
                                        Override Amount
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 italic text-xl">
                                            ₹
                                        </span>
                                        <input
                                            type="number"
                                            value={customAmount}
                                            onChange={(e) => setCustomAmount(e.target.value)}
                                            className={`w-full h-14 sm:h-16 pl-12 pr-6 rounded-2xl border outline-none font-black text-xl sm:text-2xl italic transition-all focus:border-indigo-500 ${theme === 'dark'
                                                ? 'bg-white/5 border-white/10 text-white'
                                                : 'bg-slate-50 border-slate-200 text-slate-900'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleQuickLog}
                                    className="w-full h-14 sm:h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-black uppercase tracking-widest text-white shadow-xl shadow-indigo-600/30 transition-all italic text-sm"
                                >
                                    Authorize Now
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuickActions;
