import { useCollection } from "../hooks/useCollection";
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, Zap } from 'lucide-react';

// FIX: Added 'theme' to destructuring to resolve the ReferenceError 
const SummaryCards = ({ theme }) => {
    const { documents } = useCollection("transactions");
    const dailyLimit = 50000;

    // Logic to calculate Income and Expenses [cite: 3, 6]
    const inc = documents?.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0) || 0;
    const exp = documents?.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0) || 0;

    // Calculate today's online payments for the dynamic limit bar [cite: 33]
    const todayOnlineSpent = documents?.filter(t => {
        if (!t.createdAt) return false;
        const date = new Date(t.createdAt.toDate()).toDateString();
        const today = new Date().toDateString();
        return t.type === "expense" && t.method === "Online" && date === today;
    }).reduce((a, b) => a + b.amount, 0) || 0;

    const progressPercentage = Math.min((todayOnlineSpent / dailyLimit) * 100, 100);

    return (
        <div className="grid grid-cols-12 gap-8 my-10">
            {/* Network Balance Card - Adaptive Styling [cite: 32, 34] */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`col-span-12 lg:col-span-7 rounded-[3rem] p-12 relative overflow-hidden border transition-all duration-500 ${theme === 'dark'
                    ? 'bg-[#0a0c10] border-white/10 shadow-2xl'
                    : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                    }`}
            >
                {/* Background Decoration Icon */}
                <div className={`absolute top-0 right-0 p-8 transition-colors ${theme === 'dark' ? 'text-indigo-500/5' : 'text-indigo-500/10'
                    }`}>
                    <Wallet size={200} />
                </div>

                <div className="relative z-10">
                    <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-8">
                        <Zap size={14} /> Network Balance
                    </span>

                    {/* Fixed Text Visibility for Light Mode [cite: 36] */}
                    <h2 className={`text-8xl font-black tracking-tighter italic leading-none transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>
                        ₹{(inc - exp).toLocaleString()}
                    </h2>

                    {/* Dynamic Limit Progress Bar [cite: 33, 35] */}
                    <div className="mt-12 space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <span>Daily Online Limit</span>
                            <span>Spent: ₹{todayOnlineSpent.toLocaleString()} / ₹{dailyLimit.toLocaleString()}</span>
                        </div>
                        <div className={`h-2 w-full rounded-full overflow-hidden border transition-colors ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200'
                            }`}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full ${progressPercentage > 90 ? 'bg-rose-500 shadow-[0_0_20px_#f43f5e]' : 'bg-indigo-500 shadow-[0_0_20px_#6366f1]'
                                    }`}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Inflow and Outflow MiniStats [cite: 6, 14] */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                <MiniStat
                    label="Total Inflow"
                    val={inc}
                    color="emerald"
                    theme={theme}
                    icon={<TrendingUp />}
                />
                <MiniStat
                    label="Total Outflow"
                    val={exp}
                    color="rose"
                    theme={theme}
                    icon={<TrendingDown />}
                />
            </div>
        </div>
    );
};

// Sub-component for individual statistics [cite: 25, 28]
const MiniStat = ({ label, val, color, theme, icon }) => (
    <div className={`rounded-[2.5rem] p-8 flex justify-between items-center border transition-all duration-500 ${theme === 'dark'
        ? 'bg-[#0a0c10] border-white/10'
        : 'bg-white border-slate-200 shadow-lg shadow-slate-200/40'
        }`}>
        <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                {label}
            </p>
            <h3 className={`text-4xl font-black text-${color}-400 text-glow transition-colors`}>
                ₹{val.toLocaleString()}
            </h3>
        </div>
        <div className={`p-5 rounded-2xl transition-all ${theme === 'dark' ? `bg-${color}-500/10 text-${color}-400` : `bg-${color}-50 text-${color}-500`
            }`}>
            {icon}
        </div>
    </div>
);

export default SummaryCards;