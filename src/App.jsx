import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Analytics from './components/Analytics';
import QuickActions from './components/QuickActions';
import SavingsGoal from './components/SavingsGoal';
import BudgetPulseCard from './components/BudgetPulseCard';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Styles
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [authIsReady, setAuthIsReady] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState('dark');

  // Listen for authentication state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthIsReady(true);
    });
    return () => unsub();
  }, []);

  // System Initialization Screen
  if (!authIsReady) return (
    <div className="h-screen bg-[#05070a] flex flex-col items-center justify-center space-y-4">
      <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-indigo-500 font-black italic tracking-widest uppercase animate-pulse text-xs">
        Initializing Core System...
      </p>
    </div>
  );

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${theme === 'dark'
        ? 'bg-[#05070a] text-white'
        : 'bg-[#f8fafc] text-slate-900'
        }`}
    >
      <BrowserRouter>
        {/* Navbar only visible for logged-in users */}
        {user && (
          <Navbar
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            theme={theme}
            setTheme={setTheme}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              user ? (
                /* ✅ DASHBOARD: Authenticated View */
                <div className="w-full px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-6 py-6 sm:py-10">
                  <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' ? (
                      <motion.div
                        key="dash"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <SummaryCards theme={theme} uid={user.uid} />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8 sm:mt-12 items-start">
                          {/* LEFT SIDEBAR */}
                          <div className="lg:col-span-4 lg:sticky lg:top-32 z-10 space-y-6">
                            <QuickActions theme={theme} />
                            <TransactionForm theme={theme} />
                          </div>

                          {/* RIGHT MAIN FEED */}
                          <div className="lg:col-span-8 space-y-8">
                            <BudgetPulseCard theme={theme} />
                            <SavingsGoal theme={theme} uid={user.uid} />
                            <TransactionList theme={theme} />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      /* INSIGHTS VIEW */
                      <motion.div
                        key="anal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                      >
                        <Analytics theme={theme} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* ✅ LANDING: Unauthenticated View */
                <Landing theme={theme} />
              )
            }
          />

          {/* AUTH ROUTES */}
          <Route
            path="/login"
            element={!user ? <Login theme={theme} /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup theme={theme} /> : <Navigate to="/" />}
          />
        </Routes>

        {/* Footer remains visible on Landing Page and Dashboard */}
        <Footer theme={theme} />
      </BrowserRouter>
    </div>
  );
}

export default App;