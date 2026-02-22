import { useState } from 'react';
import { useCollection } from "../hooks/useCollection";
import { db } from "../firebase/config";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Trash2, Pencil, Check, X, Database, Filter } from 'lucide-react';

// 1. Full list of categories matching TransactionForm.jsx
const ALL_CATEGORIES = [
    "All",
    // Income Categories
    "Salary", "Freelance", "Investment", "Gift", "Other",
    // Expense Categories
    "Food & Dining", "Shopping", "Grocery", "Rent", "Transport", "Bills", "Entertainment"
];

const TransactionList = ({ theme = 'dark' }) => {
    const { documents } = useCollection("transactions");
    const [query, setQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", amount: 0 });

    // Filter by both Search Query AND Category
    const filtered = documents?.filter(t => {
        const matchesSearch = t.title.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = filterCategory === "All" || t.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleUpdate = async (id) => {
        try {
            await updateDoc(doc(db, "transactions", id), {
                title: editForm.title,
                amount: Number(editForm.amount)
            });
            setEditingId(null);
        } catch (err) {
            console.error("Save error:", err);
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";
        const date = timestamp.toDate();
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div
            className={`rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 transition-all duration-500 border shadow-2xl relative
            ${theme === 'dark' ? 'bg-[#0a0c10]/50 border-white/5' : 'bg-white border-slate-200 shadow-slate-200/50'}`}
        >
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 mb-8 sm:mb-12">
                <div className="flex items-center gap-3">
                    <Database className="text-indigo-400" size={20} sm:size={24} />
                    <h3 className={`text-xl sm:text-2xl font-black tracking-tight italic uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        Transactions
                    </h3>
                </div>

                {/* Filter & Search Container */}
                <div className="flex w-full xl:w-auto items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative flex-1 xl:w-64">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search..."
                            className={`w-full h-10 sm:h-12 pl-12 pr-4 rounded-xl sm:rounded-2xl border outline-none font-bold focus:border-indigo-500 transition-all text-xs sm:text-sm
                            ${theme === 'dark' ? 'bg-[#0a0c10] border-white/5 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        />
                    </div>

                    {/* Category Filter Dropdown */}
                    <div className="relative flex-shrink-0">
                        <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className={`h-10 sm:h-12 pl-10 pr-8 rounded-xl sm:rounded-2xl border outline-none font-bold focus:border-indigo-500 transition-all text-xs sm:text-sm appearance-none cursor-pointer
                            ${theme === 'dark' ? 'bg-[#0a0c10] border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                        >
                            {ALL_CATEGORIES.map((c, idx) => (
                                // 2. Explicitly style the <option> tags to fix the dropdown menu UI
                                <option
                                    key={idx}
                                    value={c}
                                    className={theme === 'dark' ? 'bg-[#0f172a] text-white font-bold' : 'bg-white text-slate-900 font-bold'}
                                >
                                    {c}
                                </option>
                            ))}
                        </select>
                        {/* Custom Dropdown Arrow */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
                <AnimatePresence mode='popLayout'>
                    {filtered?.map((t) => (
                        <motion.div
                            key={t.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border transition-all duration-300 gap-4 sm:gap-0
                            ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]' : 'bg-slate-50/50 border-slate-100 hover:bg-slate-100 shadow-sm'}`}
                        >
                            <div className="flex items-center gap-4 sm:gap-6">
                                <div className={`h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl sm:rounded-2xl border font-black text-lg sm:text-2xl flex-shrink-0
                                ${theme === 'dark' ? 'bg-black/60 border-white/10' : 'bg-white border-slate-200 shadow-sm'
                                    } ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {t.title.charAt(0).toUpperCase()}
                                </div>

                                <div className="min-w-0">
                                    {editingId === t.id ? (
                                        <input
                                            className={`bg-transparent border-b-2 border-indigo-500 outline-none font-black text-sm sm:text-lg italic w-full
                                            ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                                            value={editForm.title}
                                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                            autoFocus
                                        />
                                    ) : (
                                        <p className={`text-sm sm:text-lg font-black tracking-tight italic truncate ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                                            {t.title}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap items-center gap-x-2">
                                        <p className="text-[8px] sm:text-[10px] font-black uppercase text-indigo-500/70 tracking-[0.2em]">
                                            {t.category} • {t.method}
                                        </p>
                                        <p className={`text-[8px] sm:text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-600'}`}>
                                            {t.createdAt ? `• ${formatTimestamp(t.createdAt)}` : ""}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                                <div className="text-right">
                                    {editingId === t.id ? (
                                        <input
                                            type="number"
                                            className={`bg-transparent border-b-2 border-indigo-500 outline-none font-black text-base sm:text-xl italic w-20 sm:w-24 text-right
                                            ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                                            value={editForm.amount}
                                            onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                                        />
                                    ) : (
                                        <p className={`text-lg sm:text-2xl font-black italic tracking-tighter ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString()}
                                        </p>
                                    )}
                                </div>

                                <div className="flex gap-1 sm:gap-2">
                                    {editingId === t.id ? (
                                        <>
                                            <button onClick={() => handleUpdate(t.id)} className="p-1.5 text-emerald-400 hover:scale-110 transition">
                                                <Check size={18} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="p-1.5 text-rose-400 hover:scale-110 transition">
                                                <X size={18} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setEditingId(t.id);
                                                    setEditForm({ title: t.title, amount: t.amount });
                                                }}
                                                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all ${theme === 'dark' ? 'text-indigo-400 hover:bg-white/10' : 'text-indigo-600 hover:bg-indigo-50'}`}
                                            >
                                                <Pencil size={16} sm:size={18} />
                                            </button>
                                            <button
                                                onClick={() => deleteDoc(doc(db, "transactions", t.id))}
                                                className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all ${theme === 'dark' ? 'text-rose-500 hover:bg-rose-500/10' : 'text-rose-600 hover:bg-rose-50'}`}
                                            >
                                                <Trash2 size={16} sm:size={18} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TransactionList;