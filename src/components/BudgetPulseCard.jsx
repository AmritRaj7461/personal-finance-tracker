import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, Pencil, Check } from 'lucide-react';
import { useCollection } from "../hooks/useCollection";

const BudgetPulseCard = ({ theme }) => {
    const { documents } = useCollection("transactions");

    // State for Dynamic Limits
    const [isEditing, setIsEditing] = useState(false);
    const [dailyLimit, setDailyLimit] = useState(50000);
    const [monthlyLimit, setMonthlyLimit] = useState(150000);

    // Real-time Data Logic
    const todayOnlineSpent = documents?.filter(t => {
        if (!t.createdAt) return false;
        const date = new Date(t.createdAt.toDate()).toDateString();
        return t.type === "expense" && t.method === "Online" && date === new Date().toDateString();
    }).reduce((a, b) => a + b.amount, 0) || 0;

    const totalMonthlySpent = documents?.filter(t => {
        if (!t.createdAt) return false;
        const d = t.createdAt.toDate();
        const now = new Date();
        return t.type === 'expense' && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).reduce((a, b) => a + b.amount, 0) || 0;

    const dailyProgress = (todayOnlineSpent / dailyLimit) * 100;
    const monthlyProgress = (totalMonthlySpent / monthlyLimit) * 100;

    const getBarColor = (pct) => {
        if (pct < 70) return 'bg-emerald-500 shadow-[0_0_15px_#10b981]';
        if (pct >= 70 && pct < 90) return 'bg-yellow-500 shadow-[0_0_15px_#f59e0b]';
        if (pct >= 90 && pct <= 100) return 'bg-rose-500 shadow-[0_0_15px_#f43f5e]';
        return 'bg-purple-600 shadow-[0_0_20px_#9333ea]';
    };

    return (
        <div className={`rounded-[2.5rem] p-10 border transition-all duration-500 relative ${theme === 'dark' ? 'bg-[#0a0c10] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-lg'
            }`}>
            {/* Header with Edit Toggle */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                        <Activity size={24} />
                    </div>
                    <h3 className={`text-lg font-black uppercase italic tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        Budget Pulse
                    </h3>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-all"
                >
                    {isEditing ? <Check size={18} className="text-emerald-500" /> : <Pencil size={16} />}
                </button>
            </div>

            <div className="space-y-12">
                {/* DAILY LIMIT SECTION */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                            {dailyProgress > 100 && (
                                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-[17px] font-black text-rose-500 uppercase tracking-tighter flex items-center gap-1.5">
                                    <AlertTriangle size={17} className="text-yellow-500" /> Critical Threshold Violated
                                </motion.span>
                            )}
                            <span className="text-[10px] font-black uppercase text-slate-500">Daily Online Limit</span>
                        </div>
                        {isEditing ? (
                            <input
                                type="number"
                                className="bg-transparent border-b border-indigo-500 text-right font-black text-indigo-400 outline-none w-24"
                                value={dailyLimit}
                                onChange={(e) => setDailyLimit(Number(e.target.value))}
                            />
                        ) : (
                            <span className={`text-[12px] font-black ${dailyProgress > 90 ? 'text-rose-500' : 'text-slate-500'}`}>
                                ₹{todayOnlineSpent.toLocaleString()} / ₹{dailyLimit.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <div className={`h-3 w-full rounded-full overflow-hidden border ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        <motion.div animate={{ width: `${Math.min(dailyProgress, 100)}%` }} className={`h-full ${getBarColor(dailyProgress)}`} />
                    </div>
                </div>

                {/* MONTHLY LIMIT SECTION */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase text-slate-500">Global Monthly Pulse</span>
                        {isEditing ? (
                            <input
                                type="number"
                                className="bg-transparent border-b border-purple-500 text-right font-black text-purple-400 outline-none w-24"
                                value={monthlyLimit}
                                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                            />
                        ) : (
                            <span className={`text-[10px] font-black ${monthlyProgress > 90 ? 'text-rose-500' : 'text-slate-500'}`}>
                                {monthlyProgress.toFixed(1)}% Velocity
                            </span>
                        )}
                    </div>
                    <div className={`h-3 w-full rounded-full overflow-hidden border ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        <motion.div animate={{ width: `${Math.min(monthlyProgress, 100)}%` }} className={`h-full ${getBarColor(monthlyProgress)}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetPulseCard;