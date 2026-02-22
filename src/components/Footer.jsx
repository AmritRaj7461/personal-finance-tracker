import { motion } from 'framer-motion';
import { ShieldCheck, Github, Linkedin, Mail, Cpu, Globe } from 'lucide-react';

const Footer = ({ theme }) => {
    const currentYear = new Date().getFullYear();
    const isDark = theme === 'dark';

    return (
        <footer className={`mt-10 border-t transition-all duration-500 ${isDark ? 'bg-[#0a0c10]/80 border-white/5' : 'bg-white/80 border-slate-200'
            } backdrop-blur-xl`}>
            <div className="max-w-7xl mx-auto px-6 py-6"> {/* Reduced from py-12 */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                    {/* Brand Section */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <ShieldCheck className="text-white" size={18} />
                        </div>
                        <h2 className={`text-lg font-black italic tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            FINANCE<span className="text-indigo-500">PRO.</span>
                        </h2>
                    </div>

                    {/* System Status - Now in a single horizontal row */}
                    <div className="flex flex-wrap gap-6 items-center">
                        <StatusItem icon={<Cpu size={14} />} label="Engine" value="React 18" theme={theme} />
                        <StatusItem icon={<Globe size={14} />} label="Region" value="Vercel Edge" theme={theme} />
                    </div>

                    {/* Developer Connect - Compact terminal access */}
                    <div className="flex gap-3">
                        <SocialLink href="https://github.com/AmritRaj7461" icon={<Github size={18} />} theme={theme} />
                        <SocialLink href="https://www.linkedin.com/in/amrit-raj7461/" icon={<Linkedin size={18} />} theme={theme} />
                        <SocialLink href="mailto:amritraj7461@gmail.com" icon={<Mail size={18} />} theme={theme} />
                    </div>
                </div>

                {/* Bottom Bar - Ultra Compact */}
                <div className={`mt-6 pt-4 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        © {currentYear} FINANCEPRO SYSTEMS.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            CORE SERVICE OPERATIONAL
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const StatusItem = ({ icon, label, value, theme }) => (
    <div className="flex items-center gap-2">
        <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-400'}>{icon}</span>
        <div className="flex items-baseline gap-1.5">
            <span className={`text-[14px]  uppercase tracking-tighter ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>{label}:</span>
            <span className={`text-[14px] font-bold ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{value}</span>
        </div>
    </div>
);

const SocialLink = ({ href, icon, theme }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -2 }}
        className={`h-9 w-9 rounded-lg flex items-center justify-center border transition-all ${theme === 'dark'
            ? 'bg-white/5 border-white/10 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50'
            : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 shadow-sm'
            }`}
    >
        {icon}
    </motion.a>
);

export default Footer;