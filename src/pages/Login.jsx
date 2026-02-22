import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ShieldCheck, ArrowRight, Fingerprint, Globe, KeyRound } from 'lucide-react';

const Login = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isDark = theme === 'dark';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError("Access Denied: Invalid Credentials.");
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (err) {
            setError("Google Handshake Failed.");
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError("Enter Email to initialize recovery.");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Recovery protocol sent to inbox.");
        } catch (err) {
            setError("Failed to initialize recovery.");
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 ${isDark ? 'bg-[#05070a]' : 'bg-slate-50'}`}>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                // ✅ RESPONSIVE RECTANGLE: flex-col on mobile, flex-row on desktop
                className={`max-w-4xl w-full flex flex-col md:flex-row rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border transition-all duration-500 ${isDark ? 'cyber-glass border-white/10 shadow-2xl shadow-indigo-500/10'
                    : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'
                    }`}
            >
                {/* LEFT SIDE: BRANDING (Hidden on small mobile screens to save space) */}
                <div className={`hidden md:flex md:w-[40%] p-12 flex-col justify-between border-r ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="space-y-6">
                        <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                            <ShieldCheck className="text-white" size={28} />
                        </div>
                        <div>
                            <h2 className={`text-3xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                FINANCE<span className="text-indigo-500">PRO.</span>
                            </h2>
                            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Secure Access v1.0.2
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[12px] font-black uppercase tracking-widest text-emerald-500 text-xs">Security Active</span>
                        </div>
                        <p className={`text-[13px] font-bold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-400'}`}>
                            Command your wealth data via AES-256 encrypted protocols. Every session is unique and secured by your personal UID.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: FORM CONTAINER */}
                <div className="flex-1 p-8 sm:p-12 md:p-14">
                    {/* Mobile Header (Only visible on small screens) */}
                    <div className="mb-10 md:hidden flex flex-col items-center text-center">
                        <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <h2 className={`text-2xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            FINANCE<span className="text-indigo-500">PRO.</span>
                        </h2>
                    </div>

                    {/* Messages */}
                    <AnimatePresence mode="wait">
                        {(error || message) && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={`overflow-hidden mb-6 p-4 rounded-xl text-center border text-[10px] font-black uppercase tracking-widest ${error ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
                                {error || message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            {/* Email */}
                            <div className="relative group">
                                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-300 group-focus-within:text-indigo-500' : 'text-slate-400'}`} size={18} />
                                <input
                                    type="email"
                                    placeholder="EMAIL"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full h-14 pl-14 pr-6 rounded-2xl border outline-none transition-all text-xs font-black tracking-widest ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-indigo-500/50'
                                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                                        }`}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative group">
                                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-300 group-focus-within:text-indigo-500' : 'text-slate-400'}`} size={18} />
                                <input
                                    type="password"
                                    placeholder="PASSWORD"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full h-14 pl-14 pr-6 rounded-2xl border outline-none transition-all text-xs font-black tracking-widest ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-indigo-500/50'
                                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                                        }`}
                                    required
                                />
                            </div>

                            {/* Forgot Password Link */}
                            <div className="flex justify-end pr-2">
                                <button type="button" onClick={handleResetPassword} className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-500 hover:text-indigo-400 flex items-center gap-2">
                                    <KeyRound size={10} /> Recover Key
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 h-14 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest italic text-[11px] shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-3 transition-colors hover:bg-indigo-500"
                            >
                                {isLoading ? "Synchronizing..." : <>Authorize Session <ArrowRight size={16} /></>}
                            </motion.button>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className={`px-8 h-14 rounded-2xl border flex items-center justify-center transition-all ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                            </button>
                        </div>
                    </form>

                    <div className={`mt-10 pt-6 border-t flex justify-between items-center ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-400'}`}>
                            New Operative? <Link to="/signup" className="text-indigo-500 ml-1">Register Identity</Link>
                        </p>
                        <div className="flex gap-4 opacity-40">
                            <Globe size={22} className={isDark ? 'text-slate-100' : 'text-slate-400'} />
                            <Fingerprint size={22} className={isDark ? 'text-slate-100' : 'text-slate-400'} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;