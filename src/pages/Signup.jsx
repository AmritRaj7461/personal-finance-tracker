import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ShieldCheck } from 'lucide-react';

const Signup = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Standard Manual Signup Logic [Section 5]
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, { displayName });
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    // Google Auth Logic [Section 5]
    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (err) {
            setError(err.message);
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
                        Create Identity
                    </h2>
                </div>

                {error && <p className="text-rose-500 bg-rose-500/10 p-4 rounded-2xl mb-6 text-xs font-bold text-center border border-rose-500/20">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text" placeholder="Full Name" value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className={`w-full h-14 pl-12 pr-6 rounded-2xl border outline-none focus:border-indigo-500 transition-all font-bold ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="email" placeholder="Email Address" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full h-14 pl-12 pr-6 rounded-2xl border outline-none focus:border-indigo-500 transition-all font-bold ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="password" placeholder="Password" value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full h-14 pl-12 pr-6 rounded-2xl border outline-none focus:border-indigo-500 transition-all font-bold ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="password" placeholder="Confirm Password" value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full h-14 pl-12 pr-6 rounded-2xl border outline-none focus:border-indigo-500 transition-all font-bold ${theme === 'dark' ? 'bg-black/40 border-white/5 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                                }`}
                            required
                        />
                    </div>

                    <button className="w-full h-16 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 italic">
                        Initialize Account
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-500/20"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className={`px-4 font-black tracking-widest ${theme === 'dark' ? 'bg-[#0a0c10] text-slate-500' : 'bg-white text-slate-400'}`}>OR</span></div>
                </div>

                <button
                    type="button" onClick={handleGoogleSignup}
                    className={`w-full h-14 flex items-center justify-center gap-3 rounded-2xl border font-black uppercase tracking-widest transition-all text-xs ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                        }`}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                    Register via Google
                </button>

                <p className={`mt-8 text-center text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Existing Operative? <Link to="/login" className="text-indigo-500">Resume Session</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;