import { useState, useEffect } from 'react';
import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Trophy, Pencil, Check, X } from 'lucide-react';

const SavingsGoal = ({ theme, uid }) => {
    const { documents } = useCollection("transactions");

    // Fetch ONLY this user's settings to avoid permission errors
    const { documents: userSettings } = useCollection("settings", ["uid", "==", uid]);

    // Map function names to match your useFirestore.js
    const { addTransaction, updateTransaction } = useFirestore("settings");

    const [isEditing, setIsEditing] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [goalName, setGoalName] = useState("MacBook Pro M4");
    const [goalAmount, setGoalAmount] = useState(250000);

    // Sync from Firestore: This keeps data on reload
    useEffect(() => {
        if (userSettings && userSettings.length > 0) {
            setGoalName(userSettings[0].goalName || "MacBook Pro M4");
            setGoalAmount(Number(userSettings[0].goalAmount) || 250000);
        }
    }, [userSettings]);

    const inc = documents?.filter(t => t.type === "income").reduce((a, b) => a + b.amount, 0) || 0;
    const exp = documents?.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0) || 0;
    const balance = inc - exp;

    const rawProgress = goalAmount > 0 ? (balance / goalAmount) * 100 : 0;
    const displayProgress = Math.min(Math.round(rawProgress), 100);

    useEffect(() => {
        if (rawProgress >= 100 && rawProgress > 0) setShowCongrats(true);
    }, [rawProgress]);

    const handleSave = async () => {
        const data = { goalName, goalAmount: Number(goalAmount) };
        try {
            if (userSettings && userSettings.length > 0) {
                await updateTransaction(userSettings[0].id, { ...data, uid });
            } else {
                await addTransaction(data, uid);
            }
            setIsEditing(false);
        } catch (err) {
            console.error("Save failed:", err.message);
        }
    };

    return (
        <div className={`rounded-[2.5rem] p-6 sm:p-8 border transition-all duration-500 h-full relative overflow-hidden ${theme === 'dark' ? 'bg-[#0a0c10] border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'
            }`}>
            {/* 🎉 CELEBRATION MODAL - Responsive Scaling */}
            <AnimatePresence>
                {showCongrats && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-amber-400 p-6 sm:p-8 text-center"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 via-amber-400 to-amber-500 opacity-90" />
                        <button onClick={() => setShowCongrats(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl bg-black/10 text-black/60 hover:bg-black/20 transition-all z-20">
                            <X size={20} strokeWidth={3} />
                        </button>
                        <motion.div initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", damping: 15 }} className="relative z-10 mb-4">
                            <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-amber-200">
                                <Trophy className="text-amber-500" size={28} sm:size={32} fill="currentColor" />
                            </div>
                        </motion.div>
                        <div className="z-10">
                            <h2 className="text-black font-black italic text-2xl sm:text-3xl uppercase tracking-tighter mb-1 leading-none">Goal Achieved! 🎉</h2>
                            <p className="text-amber-900 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-4 sm:mb-6 opacity-80 leading-none">YOU MASTERED YOUR SAVINGS!</p>
                        </div>
                        <button onClick={() => setShowCongrats(false)} className="z-10 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-black text-white font-black uppercase tracking-widest text-[9px] sm:text-[10px] shadow-xl hover:scale-105 transition-all">
                            Start New Goal
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 📊 CARD HEADER */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/10 text-amber-500">
                        <Target size={18} sm:size={20} />
                    </div>
                    <h3 className={`text-xs sm:text-sm font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        Savings Target
                    </h3>
                </div>
                <button onClick={isEditing ? handleSave : () => setIsEditing(true)} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-all">
                    {isEditing ? <Check size={18} className="text-emerald-500" /> : <Pencil size={16} />}
                </button>
            </div>

            {/* 📊 PROGRESS SECTION - Mobile Stacking Fix */}
            <div className="flex flex-col xs:flex-row items-center gap-6 sm:gap-8">
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0">
                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" className={theme === 'dark' ? "stroke-white/5" : "stroke-slate-100"} strokeWidth="3.5" />
                        <motion.circle
                            initial={{ strokeDasharray: "0 100" }}
                            animate={{ strokeDasharray: `${displayProgress >= 100 ? 100.1 : displayProgress} 100` }}
                            transition={{ duration: 2 }}
                            cx="18" cy="18" r="16" fill="none"
                            stroke={displayProgress >= 100 ? "#10b981" : "#f59e0b"}
                            strokeWidth="3.5" strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] sm:text-xs">
                        {Math.round(displayProgress)}%
                    </div>
                </div>

                <div className="flex-1 text-center xs:text-left w-full">
                    {isEditing ? (
                        <div className="space-y-2">
                            <input className="bg-transparent border-b border-indigo-500 text-base sm:text-lg font-black italic outline-none w-full" value={goalName} onChange={(e) => setGoalName(e.target.value)} />
                            <input type="number" className="bg-transparent border-b border-indigo-500 text-[10px] sm:text-xs font-bold outline-none w-full text-slate-500" value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))} />
                        </div>
                    ) : (
                        <>
                            <p className="text-base sm:text-lg font-black italic tracking-tighter truncate">{goalName}</p>
                            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1">₹{balance.toLocaleString()} / ₹{goalAmount.toLocaleString()}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavingsGoal;