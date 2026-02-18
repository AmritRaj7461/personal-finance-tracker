import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Analytics from './components/Analytics';

// Import your Login and Signup components
import Login from './pages/Login';
import Signup from './pages/Signup';

import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [authIsReady, setAuthIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthIsReady(true);
    });
    return () => unsub();
  }, []);

  if (!authIsReady) return (
    <div className="h-screen bg-[#030014] flex items-center justify-center text-indigo-500 font-black">
      INITIALIZING...
    </div>
  );

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-[#05070a] text-white' : 'bg-[#f8fafc] text-slate-900'
      }`}>
      <BrowserRouter>
        {/* Only show Navbar if user is logged in [cite: 5] */}
        {user && <Navbar user={user} activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} setTheme={setTheme} />}

        <Routes>
          {/* Main Dashboard Route [cite: 11] */}
          <Route path="/" element={
            user ? (
              <div className="max-w-7xl mx-auto px-6 py-10">
                <AnimatePresence mode="wait">
                  {activeTab === 'dashboard' ? (
                    <motion.div key="dash" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                      <SummaryCards theme={theme} />
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">
                        <div className="lg:col-span-4 sticky top-32"><TransactionForm theme={theme} /></div>
                        <div className="lg:col-span-8"><TransactionList theme={theme} /></div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="anal" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <Analytics theme={theme} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : <Navigate to="/login" />
          } />

          {/* FIX: Defined Login Route */}
          <Route
            path="/login"
            element={!user ? <Login theme={theme} /> : <Navigate to="/" />}
          />

          {/* FIX: Defined Signup Route */}
          <Route
            path="/signup"
            element={!user ? <Signup theme={theme} /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;