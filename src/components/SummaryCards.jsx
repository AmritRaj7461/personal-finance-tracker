import { useCollection } from "../hooks/useCollection";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Zap, Activity } from "lucide-react";

const SummaryCards = ({ theme, uid }) => {

    // GUARD: do not query Firestore until uid exists
    const { documents } = uid
        ? useCollection("transactions", ["uid", "==", uid])
        : { documents: [] };

    const inc = documents
        .filter(t => t.type === "income")
        .reduce((a, b) => a + b.amount, 0);

    const exp = documents
        .filter(t => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0);

    return (
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 my-6 sm:my-10 relative z-0">
            <motion.div
                className={`col-span-12 lg:col-span-7 rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-8 lg:p-12 relative overflow-hidden border transition-all duration-500 ${theme === 'dark'
                    ? 'bg-[#0a0c10] border-white/10 shadow-2xl'
                    : 'bg-white border-slate-200 shadow-xl'
                    }`}
            >
                <div
                    className={`absolute -right-5 top-1/2 -translate-y-1/2 opacity-[0.07] md:opacity-10 pointer-events-none ${theme === 'dark' ? 'text-indigo-500' : 'text-slate-900'
                        }`}
                >
                    <Activity size={220} className="sm:size-[280px] lg:size-[280px]" />
                </div>

                <div className="relative z-10">
                    <span className="flex items-center gap-2 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-indigo-500 mb-4 sm:mb-1">
                        <Zap size={12} className="fill-current" />
                        Network Balance
                    </span>

                    <h2
                        className={`font-black tracking-tighter italic leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                            } text-5xl sm:text-6xl lg:text-8xl mt-4 sm:mt-8`}
                    >
                        ₹{(inc - exp).toLocaleString()}
                    </h2>

                    <div className="hidden lg:block h-10" />
                </div>
            </motion.div>

            <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 sm:gap-6">
                <MiniStat
                    label="Total Inflow"
                    val={inc}
                    color="emerald"
                    theme={theme}
                    icon={<TrendingUp size={22} />}
                />
                <MiniStat
                    label="Total Outflow"
                    val={exp}
                    color="rose"
                    theme={theme}
                    icon={<TrendingDown size={22} />}
                />
            </div>
        </div>
    );
};

const MiniStat = ({ label, val, color, theme, icon }) => {
    const isDark = theme === 'dark';

    const styles = {
        emerald: isDark
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            : 'bg-emerald-50 text-emerald-600 border-emerald-100',
        rose: isDark
            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            : 'bg-rose-50 text-rose-600 border-rose-100'
    };

    return (
        <div
            className={`rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-6 lg:p-8 flex justify-between items-center border transition-all duration-500 ${isDark
                ? 'bg-[#0a0c10] border-white/10 shadow-lg'
                : 'bg-white border-slate-200 shadow-xl'
                }`}
        >
            <div>
                <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-1 sm:mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                    {label}
                </p>
                <h3
                    className={`font-black ${color === 'emerald' ? 'text-emerald-500' : 'text-rose-500'
                        } text-2xl sm:text-3xl lg:text-4xl`}
                >
                    ₹{val.toLocaleString()}
                </h3>
            </div>

            <div className={`p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl transition-all border ${styles[color]}`}>
                {icon}
            </div>
        </div>
    );
};

export default SummaryCards;