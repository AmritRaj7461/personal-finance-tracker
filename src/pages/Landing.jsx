import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ShieldCheck, Zap, BarChart3, Fingerprint,
    ArrowRight, LogIn, Activity, Database,
    Layers, MousePointer2
} from 'lucide-react';

const Landing = ({ theme }) => {
    const navigate = useNavigate();
    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen relative font-sans selection:bg-indigo-500/30 overflow-x-hidden ${isDark ? 'bg-[#05070a] text-white' : 'bg-slate-50 text-slate-900'}`}>

            {/* AMBIENT BACKGROUND ENGINE */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute top-0 left-0 w-full h-full opacity-30 ${isDark ? 'bg-[radial-gradient(circle_at_50%_50%,#1e2235,transparent)]' : 'bg-[radial-gradient(circle_at_50%_50%,#e2e8f0,transparent)]'}`} />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute -top-[10%] md:-top-[20%] -right-[10%] w-[80%] md:w-[60%] h-[60%] bg-indigo-600/20 blur-[80px] md:blur-[120px] rounded-full"
                />
            </div>

            {/* MAIN INTERFACE CONTAINER */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-10 pb-20">

                {/* HEADER SYSTEM */}
                <header className="flex justify-between items-center mb-12 md:mb-20">
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="h-8 w-8 md:h-10 md:w-10 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
                            <ShieldCheck className="text-white" size={18} md:size={22} />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg md:text-xl font-black italic tracking-tighter leading-none">
                                FINANCE<span className="text-indigo-500">PRO.</span>
                            </h1>
                            <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500/80">Asset Command v1.0</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/login')}
                            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-black uppercase tracking-widest text-[8px] md:text-[10px] transition-all border ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-white shadow-sm'
                                }`}
                        >
                            <LogIn size={12} md:size={14} /> <span className="hidden xs:inline">System Login</span><span className="xs:hidden">Login</span>
                        </button>
                    </div>
                </header>

                {/* DUAL-PANEL LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* LEFT PANEL: DATA COMMAND */}
                    <div className="space-y-8 md:space-y-10 text-center lg:text-left order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4 md:space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20">
                                <Activity size={12} className="text-indigo-500" />
                                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-indigo-500">Core Network Active</span>
                            </div>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black italic tracking-tighter leading-[0.95] md:leading-[0.9]">
                                YOUR WEALTH, <br />
                                <span className="text-indigo-500">REAL-TIME.</span>
                            </h2>

                            <p className={`text-sm md:text-lg font-bold max-w-md mx-auto lg:mx-0 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                A high-frequency financial cockpit built on the Firebase mesh. Synchronize transactions and command your network balance.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                        >
                            <button
                                onClick={() => navigate('/signup')}
                                className="w-full sm:w-auto group px-8 md:px-10 py-4 md:py-5 bg-indigo-600 text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest italic flex items-center justify-center gap-3 shadow-2xl shadow-indigo-600/40 hover:bg-indigo-500 transition-all"
                            >
                                Register Identity <ArrowRight size={18} md:size={20} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </motion.div>

                        {/* MINI SPECS */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 pt-8 md:pt-10 border-t border-white/5">
                            <SpecItem icon={<Database size={14} />} label="Storage" value="Firestore DB" theme={theme} />
                            <SpecItem icon={<Layers size={14} />} label="Frontend" value="React 18" theme={theme} />
                            <SpecItem icon={<Fingerprint size={14} />} label="Security" value="AES-256" theme={theme} />
                        </div>
                    </div>

                    {/* RIGHT PANEL: SYSTEM PREVIEW */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative group order-1 lg:order-2 px-4 sm:px-0"
                    >
                        {/* Decorative Rings */}
                        <div className="absolute inset-0 bg-indigo-600/20 blur-[60px] md:blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* The "Ultra-Glass" Interface Mockup */}
                        <div className={`relative rounded-[1.5rem] md:rounded-[2.5rem] border p-1 md:p-2 backdrop-blur-3xl ${isDark ? 'cyber-glass border-white/10 shadow-2xl shadow-indigo-500/10' : 'bg-white/50 border-white shadow-2xl'}`}>
                            <div className={`rounded-[1.2rem] md:rounded-[2rem] overflow-hidden ${isDark ? 'bg-[#0a0c10]' : 'bg-slate-100'}`}>
                                {/* Mock Header */}
                                <div className="p-4 md:p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                                    <div className="h-2 md:h-3 w-16 md:w-20 bg-indigo-500/20 rounded-full" />
                                    <div className="flex gap-1 md:gap-2">
                                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-rose-500/50" />
                                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-amber-500/50" />
                                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-500/50" />
                                    </div>
                                </div>
                                {/* Mock Content */}
                                <div className="p-4 md:p-8 space-y-4 md:space-y-6">
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        <div className="h-16 md:h-24 bg-indigo-600/10 border border-indigo-500/10 rounded-xl md:rounded-2xl flex flex-col justify-center px-4 md:px-6 text-left">
                                            <span className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-indigo-500">Balance</span>
                                            <div className="h-3 md:h-4 w-12 md:w-20 bg-white/10 mt-1 md:mt-2 rounded-full" />
                                        </div>
                                        <div className="h-16 md:h-24 bg-emerald-600/10 border border-emerald-500/10 rounded-xl md:rounded-2xl flex flex-col justify-center px-4 md:px-6 text-left">
                                            <span className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-emerald-500">Inflow</span>
                                            <div className="h-3 md:h-4 w-10 md:w-16 bg-white/10 mt-1 md:mt-2 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:space-y-3">
                                        <div className="h-10 md:h-12 bg-white/5 rounded-lg md:rounded-xl flex items-center px-3 md:px-4 justify-between">
                                            <div className="flex gap-2 md:gap-3 items-center">
                                                <div className="h-4 w-4 md:h-6 md:w-6 rounded-md md:rounded-lg bg-indigo-500/20" />
                                                <div className="h-1.5 md:h-2 w-16 md:w-24 bg-white/10 rounded-full" />
                                            </div>
                                            <div className="h-1.5 md:h-2 w-8 md:w-10 bg-emerald-500/20 rounded-full" />
                                        </div>
                                        <div className="h-10 md:h-12 bg-white/5 rounded-lg md:rounded-xl flex items-center px-3 md:px-4 justify-between">
                                            <div className="flex gap-2 md:gap-3 items-center">
                                                <div className="h-4 w-4 md:h-6 md:w-6 rounded-md md:rounded-lg bg-rose-500/20" />
                                                <div className="h-1.5 md:h-2 w-20 md:w-32 bg-white/10 rounded-full" />
                                            </div>
                                            <div className="h-1.5 md:h-2 w-8 md:w-10 bg-rose-500/20 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Cursor Interaction (Hidden on small screens) */}
                        <motion.div
                            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="hidden md:flex absolute -bottom-6 -right-6 h-12 w-12 bg-indigo-600 rounded-2xl items-center justify-center shadow-2xl border border-white/20 z-20"
                        >
                            <MousePointer2 className="text-white" size={20} />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const SpecItem = ({ icon, label, value, theme }) => (
    <div className="flex items-center gap-2 md:gap-3 justify-center lg:justify-start">
        <div className={`h-6 w-6 md:h-8 md:w-8 rounded-md md:rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-white/5 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
            {icon}
        </div>
        <div className="flex flex-col text-left">
            <span className={`text-[7px] md:text-[9px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{label}</span>
            <span className={`text-[8px] md:text-[10px] font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{value}</span>
        </div>
    </div>
);

export default Landing;