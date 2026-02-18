import { useState } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { auth } from '../firebase/config';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

const TransactionForm = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('Food & Dining');
    const [method, setMethod] = useState('Online');
    const { addTransaction } = useFirestore('transactions');

    const categories = {
        income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
        expense: ['Food & Dining', 'Shopping', 'Grocery', 'Rent', 'Transport', 'Bills', 'Entertainment']
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) return;
        await addTransaction({
            title, amount: Number(amount), type, category, method
        }, auth.currentUser.uid);
        setTitle(''); setAmount('');
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="cyber-glass rounded-[3rem] p-10 border-indigo-500/20">
            <div className="flex items-center gap-3 mb-8">
                <PlusCircle className="text-indigo-400" />
                <h3 className="text-2xl font-black tracking-tight italic uppercase">New Record</h3>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Identification</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Server Hosting" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-indigo-500 transition-all font-bold" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Asset Value</label>
                        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-indigo-500 transition-all font-bold" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Method</label>
                        <select value={method} onChange={e => setMethod(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 outline-none font-bold text-xs">
                            <option value="Online" className="bg-[#030014]">Online</option>
                            <option value="Cash" className="bg-[#030014]">Cash</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Vector</label>
                        <select value={type} onChange={e => { setType(e.target.value); setCategory(categories[e.target.value][0]); }} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 outline-none font-bold text-xs">
                            <option value="expense" className="bg-[#030014]">Expense</option>
                            <option value="income" className="bg-[#030014]">Income</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Sector</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-12 bg-white/5 border border-white/10 rounded-2xl px-4 outline-none font-bold text-xs">
                            {categories[type].map(cat => <option key={cat} value={cat} className="bg-[#030014]">{cat}</option>)}
                        </select>
                    </div>
                </div>

                <button className="w-full h-16 rounded-2xl bg-indigo-600 font-black tracking-widest hover:bg-indigo-500 shadow-xl shadow-indigo-500/20 transition-all uppercase text-xs italic">Authorize Commit</button>
            </form>
        </motion.div>
    );
};

export default TransactionForm;