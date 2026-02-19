import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ShieldCheck, KeyRound } from 'lucide-react';

const Login = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null); // Added state for success messages
    const navigate = useNavigate();

    // Standard Email/Password Login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError("Invalid login credentials. Please try again.");
        }
    };

    // Google Auth Login
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    // Password Reset Logic
    const handleResetPassword = async () => {
        setError(null);
        setMessage(null);

        if (!email) {
            setError("Please enter your registered Email ID first.");
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage("Recovery transmission sent! Check your inbox.");
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setError("No operative found with this Email ID.");
            } else {
                setError("Failed to send recovery protocol. Try again later.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`max-w-md w-full p-10 rounded-[3rem] border transition-all duration-500 ${theme === 'dark' ? 'cyber-glass border-white/10' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'
                    }`}
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/40">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                    <h2 className={`text-3xl font-black italic tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Authorized Access
                    </h2>
                    <p className="text-slate-500 font-bold text-xs mt-2 uppercase tracking-widest">FinancePro Secure Gateway</p>
                </div>

                {/* Error & Success Messages */}
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-rose-500 bg-rose-500/10 p-4 rounded-2xl mb-6 text-xs font-black uppercase tracking-widest text-center border border-rose-500/20">
                            {error}
                        </motion.p>
                    )}
                    {message && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-emerald-500 bg-emerald-500/10 p-4 rounded-2xl mb-6 text-xs font-black uppercase tracking-widest text-center border border-emerald-500/20">
                            {message}
                        </motion.p>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="email"
                            placeholder="Email ID"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full h-14 pl-12 pr-6 rounded-2xl border outline-none focus:border-indigo-500 transition-all font-bold ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                            required
                        />
                    </div>

                    {/* Password Input & Forgot Password Link */}
                    <div className="space-y-2">
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full h-14 pl-12 pr-6 rounded-2xl border outline-none focus:border-indigo-500 transition-all font-bold ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                    }`}
                            />
                        </div>

                        {/* Forgot Password Trigger */}
                        <div className="flex justify-end px-2">
                            <button
                                type="button"
                                onClick={handleResetPassword}
                                className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors hover:text-indigo-500 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}
                            >
                                <KeyRound size={10} /> Recover Password
                            </button>
                        </div>
                    </div>

                    <button className="w-full h-14 mt-2 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 italic">
                        Login
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-500/20"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className={`px-4 font-black tracking-widest ${theme === 'dark' ? 'bg-[#0a0c10] text-slate-500' : 'bg-white text-slate-400'}`}>OR</span></div>
                </div>

                {/* Google Auth Button */}
                <button
                    onClick={handleGoogleLogin}
                    className={`w-full h-14 flex items-center justify-center gap-3 rounded-2xl border font-black uppercase tracking-widest transition-all text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                        }`}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                    Connect via Google
                </button>

                <p className={`mt-8 text-center text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                    New Operative? <Link to="/signup" className="text-indigo-500">Register Identity</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;