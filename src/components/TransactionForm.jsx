import { useState, useEffect } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useCollection } from '../hooks/useCollection';
import { auth } from '../firebase/config';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, X, AlertTriangle } from 'lucide-react';

const DAILY_LIMIT = 50000;

const TransactionForm = ({ theme = 'dark' }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('Food & Dining');
    const [method, setMethod] = useState('Online');

    const [showLimitModal, setShowLimitModal] = useState(false);
    const [pendingTxn, setPendingTxn] = useState(null);

    const { addTransaction } = useFirestore('transactions');
    const { documents } = useCollection('transactions');

    const categories = {
        income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
        expense: ['Food & Dining', 'Shopping', 'Grocery', 'Rent', 'Transport', 'Bills', 'Entertainment'],
    };

    useEffect(() => {
        document.body.style.overflow = showLimitModal ? 'hidden' : 'auto';
    }, [showLimitModal]);

    const submit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;

        const value = Number(amount);
        const txn = { title, amount: value, type, category, method };

        if (method === 'Online' && type === 'expense') {
            const todaySpent =
                documents?.filter(t => {
                    if (!t.createdAt) return false;
                    return (
                        t.type === 'expense' &&
                        t.method === 'Online' &&
                        new Date(t.createdAt.toDate()).toDateString() ===
                        new Date().toDateString()
                    );
                }).reduce((a, b) => a + b.amount, 0) || 0;

            if (todaySpent + value > DAILY_LIMIT) {
                setPendingTxn(txn);
                setShowLimitModal(true);
                return;
            }
        }

        await commit(txn);
    };

    const commit = async (txn) => {
        await addTransaction(txn, auth.currentUser.uid);
        setTitle('');
        setAmount('');
    };

    const confirmLimit = async () => {
        if (!pendingTxn) return;
        await commit(pendingTxn);
        setPendingTxn(null);
        setShowLimitModal(false);
    };

    return (
        <>
            <AnimatePresence>
                {showLimitModal && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
                            onClick={() => setShowLimitModal(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className={`relative z-10 w-full max-w-md p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3.5rem] border shadow-[0_0_120px_rgba(0,0,0,1)]
                            ${theme === 'dark' ? 'bg-[#0a0c10] border-white/10' : 'bg-white border-slate-200'}`}
                        >
                            <button
                                onClick={() => setShowLimitModal(false)}
                                className="absolute top-6 right-6 sm:top-8 sm:right-8 p-2 text-slate-400 hover:text-rose-500 transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="h-16 w-16 sm:h-20 sm:w-20 bg-rose-500/10 rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 border border-rose-500/20">
                                    <AlertTriangle className="text-rose-500" size={32} sm:size={40} />
                                </div>

                                <h3 className={`text-xl sm:text-2xl font-black uppercase italic mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    Limit Exceeded
                                </h3>

                                <p className={`text-xs sm:text-sm font-bold leading-relaxed mb-8 sm:mb-10 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Limit: ₹{DAILY_LIMIT.toLocaleString()}
                                    <span className="block mt-2 text-rose-500 text-[10px] uppercase tracking-[0.2em] animate-pulse">
                                        Budget Breach Detected
                                    </span>
                                </p>

                                <button
                                    onClick={confirmLimit}
                                    className="w-full h-14 sm:h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-black uppercase tracking-widest text-white transition italic text-xs sm:text-sm"
                                >
                                    Authorize Commit
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 border transition-all duration-500 relative z-0
                ${theme === 'dark' ? 'bg-[#0a0c10]/60 border-white/5' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}
            >
                <div className="flex items-center gap-3 mb-8 sm:mb-10">
                    <PlusCircle className="text-indigo-400" size={24} />
                    <h3 className={`text-xl sm:text-2xl font-black uppercase italic ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        New Record
                    </h3>
                </div>

                <form onSubmit={submit} className="space-y-4 sm:space-y-6">
                    <Input label="Title" value={title} setValue={setTitle} theme={theme} placeholder="e.g. Salary" />

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <Input label="Value" type="number" value={amount} setValue={setAmount} theme={theme} placeholder="₹ 0" />
                        <Select label="Method" value={method} setValue={setMethod} theme={theme}>
                            <option value="Online">Online</option>
                            <option value="Cash">Cash</option>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <Select
                            label="Flow"
                            value={type}
                            theme={theme}
                            setValue={(v) => {
                                setType(v);
                                setCategory(categories[v][0]);
                            }}
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </Select>

                        <Select label="Category" value={category} theme={theme} setValue={setCategory}>
                            {categories[type].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </Select>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-14 sm:h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-black uppercase tracking-widest text-white shadow-xl transition-all italic text-xs sm:text-sm"
                    >
                        Add Transaction
                    </motion.button>
                </form>
            </motion.div>
        </>
    );
};

const Input = ({ label, value, setValue, type = 'text', theme, placeholder }) => (
    <div className="space-y-1.5 sm:space-y-2">
        <label className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-black ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            required
            className={`w-full h-12 sm:h-14 px-4 sm:px-6 rounded-xl sm:rounded-2xl border outline-none font-bold transition-all focus:border-indigo-500 text-xs sm:text-sm
            ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
        />
    </div>
);

const Select = ({ label, value, setValue, children, theme }) => (
    <div className="space-y-1.5 sm:space-y-2">
        <label className={`text-[9px] sm:text-[10px] uppercase tracking-widest font-black ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
            {label}
        </label>
        <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full h-12 sm:h-14 px-3 sm:px-4 rounded-xl sm:rounded-2xl border outline-none font-bold text-[10px] sm:text-xs cursor-pointer focus:border-indigo-500 appearance-none
            ${theme === 'dark' ? 'bg-[#0a0c10] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
        >
            {children}
        </select>
    </div>
);

export default TransactionForm;