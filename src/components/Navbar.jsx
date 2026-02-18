import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, PieChart, Moon, Sun, ShieldCheck } from 'lucide-react';

const Navbar = ({ user, activeTab, setActiveTab, theme, setTheme }) => {
    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="sticky top-6 z-50 mx-auto max-w-6xl px-4">
            <div className={`flex h-20 items-center justify-between rounded-[2.5rem] px-8 border transition-all duration-500 shadow-2xl ${theme === 'dark' ? 'ultra-glass border-white/10' : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-slate-200/50'
                }`}>
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-indigo-500/40 shadow-lg">
                        <ShieldCheck className="text-white" size={24} />
                    </div>
                    <h1 className={`text-2xl font-black tracking-tighter italic ${theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>FINANCE<span className="text-indigo-500">PRO.</span></h1>
                </div>

                <div className={`hidden md:flex gap-2 p-1.5 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200'
                    }`}>
                    <TabBtn active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18} />} label="Live Hub" theme={theme} />
                    <TabBtn active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} icon={<PieChart size={18} />} label="Deep Insights" theme={theme} />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className={`p-3 rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 border-white/5 hover:text-indigo-400' : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-indigo-600'
                            }`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button onClick={() => signOut(auth)} className={`h-12 w-12 flex items-center justify-center rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 border-white/5 hover:text-rose-400' : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-rose-600'
                        }`}>
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

const TabBtn = ({ active, onClick, icon, label, theme }) => (
    <button onClick={onClick} className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all ${active
        ? 'text-white'
        : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
        }`}>
        {active && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20" />}
        <span className="relative z-10 flex items-center gap-2">{icon} {label}</span>
    </button>
);

export default Navbar;