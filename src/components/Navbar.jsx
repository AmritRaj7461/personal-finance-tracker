import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, PieChart, Moon, Sun, ShieldCheck } from 'lucide-react';

const Navbar = ({ user, activeTab, setActiveTab, theme, setTheme }) => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="sticky top-4 md:top-6 z-50 w-full px-2 sm:px-4"
        >
            <div className="mx-auto lg:max-w-6xl">
                <div
                    // Let justify-between naturally handle the spacing without forcing flex-1
                    className={`flex items-center justify-between
                    h-[4.5rem] md:h-20
                    rounded-[2rem] md:rounded-[2.5rem]
                    px-3 sm:px-4 md:px-8
                    border transition-all duration-500 shadow-2xl
                    ${theme === 'dark'
                            ? 'ultra-glass border-white/10'
                            : 'bg-white/80 backdrop-blur-xl border-slate-200 shadow-slate-200/50'
                        }`}
                >
                    {/* LEFT: Logo Section - Naturally hugs the left side */}
                    <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                        <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center flex-shrink-0 rounded-[1rem] md:rounded-2xl bg-indigo-600 shadow-indigo-500/40 shadow-lg">
                            <ShieldCheck className="text-white w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                        </div>
                        <h1
                            className={`text-xl md:text-2xl font-black tracking-tighter italic hidden sm:block ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                        >
                            FINANCE<span className="text-indigo-500">PRO.</span>
                        </h1>
                    </div>

                    {/* CENTER: Navigation Container - Sits safely in the remaining space */}
                    <div className="flex justify-center flex-shrink-0 z-10 px-1">
                        <div
                            className={`flex gap-1 md:gap-2 p-1 rounded-xl md:rounded-2xl border transition-all
                            ${theme === 'dark' ? 'bg-black/40 border-white/5' : 'bg-slate-100 border-slate-200'}`}
                        >
                            <TabBtn
                                active={activeTab === 'dashboard'}
                                onClick={() => setActiveTab('dashboard')}
                                icon={<LayoutDashboard className="w-4 h-4 md:w-[18px] md:h-[18px] flex-shrink-0" />}
                                label="Home"
                                theme={theme}
                            />
                            <TabBtn
                                active={activeTab === 'analysis'}
                                onClick={() => setActiveTab('analysis')}
                                icon={<PieChart className="w-4 h-4 md:w-[18px] md:h-[18px] flex-shrink-0" />}
                                label="Insights"
                                theme={theme}
                            />
                        </div>
                    </div>

                    {/* RIGHT: Controls Section - Naturally hugs the right side without being pushed out */}
                    <div className="flex items-center justify-end gap-1.5 md:gap-4 flex-shrink-0">
                        <div className="hidden lg:flex flex-col text-right mr-2">
                            <p className={`text-[15px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                {user?.displayName || 'AMRIT'}
                            </p>
                            <p className={`text-[10px] font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                                {user?.email}
                            </p>
                        </div>

                        {/* Theme Toggle - Fixed dimensions, flex-shrink-0 on the SVG itself */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`flex-shrink-0 h-10 w-10 md:w-11 md:h-11 flex items-center justify-center rounded-[1rem] md:rounded-xl border transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 border-white/5 hover:text-indigo-400' : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-indigo-600'}`}
                        >
                            {theme === 'dark'
                                ? <Sun className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-current" />
                                : <Moon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-current" />
                            }
                        </button>

                        {/* Sign Out Button - Fixed dimensions, flex-shrink-0 on the SVG itself */}
                        <button
                            onClick={() => signOut(auth)}
                            className={`flex-shrink-0 h-10 w-10 md:w-12 md:h-11 flex items-center justify-center rounded-[1rem] md:rounded-2xl border transition-all ${theme === 'dark' ? 'bg-white/5 text-slate-400 border-white/5 hover:text-rose-400' : 'bg-slate-100 text-slate-500 border-slate-200 hover:text-rose-600'}`}
                        >
                            <LogOut strokeWidth={2.6} className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-current" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

const TabBtn = ({ active, onClick, icon, label, theme }) => (
    <button
        onClick={onClick}
        className={`relative flex items-center justify-center gap-1.5 md:gap-2 px-2.5 md:px-6 py-1.5 md:py-2.5 rounded-[0.6rem] md:rounded-xl text-[10px] md:text-xs font-black transition-all whitespace-nowrap flex-shrink-0 ${active
            ? 'text-white'
            : theme === 'dark' ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
            }`}
    >
        {active && (
            <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-indigo-600 rounded-[0.6rem] md:rounded-xl shadow-lg shadow-indigo-500/20"
            />
        )}
        <span className="relative z-10 flex items-center gap-1 md:gap-2">
            {icon}
            <span className={active ? 'inline' : 'hidden md:inline'}>
                {label === 'Deep Insights' ? 'Insights' : label}
            </span>
        </span>
    </button>
);

export default Navbar;