import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError("Invalid login credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
                {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4 text-sm">{error}</p>}

                <div className="space-y-4">
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500" required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500" required />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">Login</button>
                </div>
                <p className="mt-6 text-center text-gray-600">New here? <Link to="/signup" className="text-blue-600 font-medium">Create account</Link></p>
            </form>
        </div>
    );
};

export default Login;