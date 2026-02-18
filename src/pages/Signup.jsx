import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, { displayName });
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
                {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-sm">{error}</p>}

                <div className="space-y-4">
                    <input type="text" placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500" required />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">Sign Up</button>
                </div>
                <p className="mt-6 text-center text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 font-medium">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;