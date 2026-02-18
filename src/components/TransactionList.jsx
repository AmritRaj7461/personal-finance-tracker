import { useState } from 'react';
import { useCollection } from "../hooks/useCollection";
import { db } from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, Pencil, Check, X, Database, Filter } from 'lucide-react';

const TransactionList = ({ theme }) => { // Theme passed as prop
    const { documents } = useCollection("transactions");
    const [query, setQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", amount: 0 });

    const categories = ['All', 'Salary', 'Freelance', 'Investment', 'Food & Dining', 'Shopping', 'Grocery', 'Rent', 'Transport', 'Bills', 'Entertainment'];

    const filtered = documents?.filter(t => {
        const searchStr = query.toLowerCase();
        const matchesSearch = t.title.toLowerCase().includes(searchStr) ||
            t.category.toLowerCase().includes(searchStr);
        const matchesCategory = categoryFilter === "All" || t.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleUpdate = async (id) => {
        try {
            const docRef = doc(db, "transactions", id);
            await updateDoc(docRef, {
                title: editForm.title,
                amount: Number(editForm.amount)
            });
            setEditingId(null);
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    return (
        <div className={`rounded-[3.5rem] p-10 h-auto min-h-[400px] mb-10 transition-all duration-500 border shadow-2xl ${theme === 'dark' ? 'cyber-glass border-white/10' : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}>
            <div className="flex flex-col xl:flex-row justify-between items-center gap-6 mb-12">
                <div className="flex items-center gap-3">
                    <Database className="text-indigo-400" />
                    <h3 className={`text-2xl font-black tracking-tight italic uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>Transactions</h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                    <div className="relative group flex-1 sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            placeholder="Scan Ledger..."
                            onChange={e => setQuery(e.target.value)}
                            className={`w-full h-12 rounded-2xl border pl-12 pr-4 text-xs font-bold outline-none focus:border-indigo-500 transition-all ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                        />
                    </div>
                    <div className="relative flex items-center gap-2">
                        <Filter className="text-slate-400" size={16} />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className={`h-12 border rounded-2xl px-4 text-xs font-bold outline-none cursor-pointer focus:border-indigo-500 transition-all ${theme === 'dark' ? 'bg-black/40 border-white/5 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                        >
                            {categories.map(cat => <option key={cat} value={cat} className={theme === 'dark' ? 'bg-[#030014]' : 'bg-white'}>{cat}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode='popLayout'>
                    {filtered?.map((t) => (
                        <motion.div
                            className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-500 ${theme === 'dark'
                                ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                                : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200'
                                }`}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`h-14 w-14 flex items-center justify-center rounded-2xl border font-black text-2xl ${theme === 'dark' ? 'bg-black/60 border-white/10' : 'bg-slate-50 border-slate-200'
                                    } text-${t.type === 'income' ? 'emerald' : 'rose'}-500`}>
                                    {t.title.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className={`text-lg font-black tracking-tight italic ${theme === 'dark' ? 'text-white' : 'text-slate-800'
                                        }`}>{t.title}</p>
                                    <p className="text-[10px] font-black uppercase text-indigo-500/70 tracking-[0.2em]">
                                        {t.category} • {t.method}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <p className={`text-2xl font-black italic tracking-tighter ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                                    }`}>
                                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                </p>
                                {/* Edit/Delete buttons */}
                            </div>
                        </motion.div>
                    ))}
                    {filtered?.length === 0 && (
                        <p className={`text-center italic py-10 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>No matching records detected.</p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TransactionList;