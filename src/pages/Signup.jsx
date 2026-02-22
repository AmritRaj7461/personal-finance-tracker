import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ShieldCheck, ArrowRight, Fingerprint, Globe } from 'lucide-react';

const Signup = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isDark = theme === 'dark';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            return setError("Encryption keys do not match.");
        }

        setIsLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, { displayName });
            navigate('/');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (err) {
            setError("Google Registration Failed.");
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 sm:px-6 ${isDark ? 'bg-[#05070a]' : 'bg-slate-50'}`}>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                // ✅ RECTANGULAR RESPONSIVE: Stacks on mobile, splits on desktop
                className={`max-w-5xl w-full flex flex-col md:flex-row rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border transition-all duration-500 ${isDark ? 'cyber-glass border-white/10 shadow-2xl shadow-indigo-500/10'
                    : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'
                    }`}
            >
                {/* LEFT SIDE: IDENTITY INITIALIZATION INFO */}
                <div className={`hidden md:flex md:w-[35%] p-12 flex-col justify-between border-r ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="space-y-6">
                        <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                            <ShieldCheck className="text-white" size={28} />
                        </div>
                        <div>
                            <h2 className={`text-3xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                FINANCE<span className="text-indigo-500">PRO.</span>
                            </h2>
                            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                Register Operative
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Initialize Identity</span>
                        </div>
                        <p className={`text-[10px] font-bold leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            By registering, you initialize a private vault on the Firebase Mesh, protected by 256-bit AES encryption.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: REGISTRATION FORM */}
                <div className="flex-1 p-8 sm:p-12">
                    {/* Mobile Branding */}
                    <div className="mb-8 md:hidden text-center flex flex-col items-center">
                        <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <h2 className={`text-2xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            FINANCE<span className="text-indigo-500">PRO.</span>
                        </h2>
                    </div>

                    {/* Messages */}
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6 p-4 rounded-xl text-center border border-rose-500/20 bg-rose-500/10 text-rose-500 text-[10px] font-black uppercase tracking-widest">
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div className="relative group">
                                <User className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} size={16} />
                                <input
                                    type="text" placeholder="DISPLAY NAME" value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className={`w-full h-14 pl-14 pr-6 rounded-2xl border outline-none transition-all text-[11px] font-black tracking-widest ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-indigo-500/50'
                                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                                        }`} required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative group">
                                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} size={16} />
                                <input
                                    type="email" placeholder="IDENTITY (EMAIL)" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full h-14 pl-14 pr-6 rounded-2xl border outline-none transition-all text-[11px] font-black tracking-widest ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-indigo-500/50'
                                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                                        }`} required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative group">
                                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} size={16} />
                                <input
                                    type="password" placeholder="ACCESS KEY" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full h-14 pl-14 pr-6 rounded-2xl border outline-none transition-all text-[11px] font-black tracking-widest ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-indigo-500/50'
                                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                                        }`} required
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative group">
                                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} size={16} />
                                <input
                                    type="password" placeholder="CONFIRM KEY" value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className={`w-full h-14 pl-14 pr-6 rounded-2xl border outline-none transition-all text-[11px] font-black tracking-widest ${isDark ? 'bg-black/40 border-white/5 text-white focus:border-indigo-500/50'
                                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                                        }`} required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 h-14 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest italic text-[11px] shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-3 transition-colors hover:bg-indigo-500"
                            >
                                {isLoading ? "Initializing..." : <>Initialize Account <ArrowRight size={16} /></>}
                            </motion.button>

                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className={`px-8 h-14 rounded-2xl border flex items-center justify-center transition-all ${isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                                    }`}
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                            </button>
                        </div>
                    </form>

                    <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                            Existing Operative? <Link to="/login" className="text-indigo-500 ml-1">Resume Session</Link>
                        </p>
                        <div className="flex gap-4 opacity-40">
                            <Globe size={14} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                            <Fingerprint size={14} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;