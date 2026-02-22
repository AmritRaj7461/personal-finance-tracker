import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useCollection } from '../hooks/useCollection';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, BarChart3, Activity, Zap, CalendarDays, ChevronDown } from 'lucide-react';

// ✅ CUSTOM BAR TOOLTIP (Ensures Uppercase "Amount" and proper theme colors)
const CustomBarTooltip = ({ active, payload, label, theme }) => {
    if (active && payload && payload.length) {
        const isDark = theme === 'dark';
        return (
            <div className={`p-4 rounded-2xl border shadow-2xl transition-all duration-300 ${isDark ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'
                }`}>
                <p className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                    {label}
                </p>
                <p className={`text-xs font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                    <span className="text-indigo-500 font-black uppercase text-[10px]">Amount:</span>
                    ₹{payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

// ✅ CUSTOM PIE TOOLTIP
const CustomPieTooltip = ({ active, payload, theme }) => {
    if (active && payload && payload.length) {
        const isDark = theme === 'dark';
        return (
            <div className={`p-3 rounded-xl border shadow-2xl ${isDark ? 'bg-[#1e293b] border-white/10' : 'bg-white border-slate-200'
                }`}>
                <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                    {payload[0].name}
                </p>
                <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                    ₹{payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

const Analytics = ({ theme }) => {
    const { documents: transactions } = useCollection('transactions');
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const filteredTransactions = transactions?.filter(t => {
        if (!t.createdAt) return false;
        const d = t.createdAt.toDate();
        return d.getMonth() === selectedDate.getMonth() && d.getFullYear() === selectedDate.getFullYear();
    });

    const generateTimeline = () => {
        const days = [];
        const endDay = (selectedDate.getMonth() === new Date().getMonth() && selectedDate.getFullYear() === new Date().getFullYear())
            ? new Date() : new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);

        for (let i = 6; i >= 0; i--) {
            const d = new Date(endDay);
            d.setDate(d.getDate() - i);
            days.push({
                date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
                fullDate: d.toDateString(),
                amount: 0
            });
        }
        return days;
    };

    const timeData = generateTimeline();
    filteredTransactions?.filter(t => t.type === 'expense').forEach(t => {
        const txnDate = t.createdAt.toDate().toDateString();
        const entry = timeData.find(d => d.fullDate === txnDate);
        if (entry) entry.amount += t.amount;
    });

    const expenseData = filteredTransactions ? filteredTransactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => {
            const category = curr.category || 'Other';
            const existing = acc.find((item) => item.name === category);
            if (existing) existing.value += curr.amount;
            else acc.push({ name: category, value: curr.amount });
            return acc;
        }, [])
        .sort((a, b) => b.value - a.value) : [];

    const totalExpense = expenseData.reduce((sum, item) => sum + item.value, 0);
    const topCategory = expenseData[0]?.name || 'N/A';
    const COLORS = theme === 'dark' ? ['#6366f1', '#10b981', '#f43f5e', '#fbbf24', '#8b5cf6', '#06b6d4'] : ['#4f46e5', '#059669', '#e11d48', '#d97706', '#7c3aed', '#0891b2'];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border transition-all duration-500 h-auto relative z-0 ${theme === 'dark' ? 'bg-[#0a0c10]/80 border-white/5 shadow-2xl backdrop-blur-xl' : 'bg-white border-slate-200 shadow-xl'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-50">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">System Intelligence</span>
                    </div>
                    <h2 className={`text-3xl md:text-4xl font-black italic tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>Deep Insights.</h2>
                </div>

                <div className="relative">
                    <button onClick={() => setShowMonthPicker(!showMonthPicker)} className={`w-full md:w-auto px-6 py-3 rounded-2xl border flex items-center justify-between md:justify-start gap-3 transition-all hover:scale-105 active:scale-95 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                        <div className="flex items-center gap-3">
                            <CalendarDays size={18} className="text-indigo-500" />
                            <span className="text-xs font-black uppercase tracking-widest">{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</span>
                        </div>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${showMonthPicker ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {showMonthPicker && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute right-0 mt-3 w-full md:w-48 p-2 rounded-2xl border shadow-2xl z-50 grid grid-cols-2 md:grid-cols-1 gap-1 ${theme === 'dark' ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'}`}>
                                {months.map((m, i) => (
                                    <button key={m} onClick={() => { setSelectedDate(new Date(selectedDate.getFullYear(), i, 1)); setShowMonthPicker(false); }} className={`text-[9px] md:text-[10px] font-black uppercase py-2 px-4 rounded-xl text-left transition-colors ${selectedDate.getMonth() === i ? 'bg-indigo-600 text-white' : theme === 'dark' ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-50 text-slate-600'}`}>{m}</button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {expenseData.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                    <div className="lg:col-span-7 space-y-8 md:space-y-10">
                        <div className="flex items-center gap-2">
                            <Activity size={18} className="text-indigo-500" />
                            <h4 className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Burn Velocity</h4>
                        </div>
                        <div className="h-[280px] md:h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%" minHeight={280}>
                                <BarChart data={timeData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#ffffff05' : '#00000005'} />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: theme === 'dark' ? '#94a3b8' : '#64748b', fontSize: 10, fontWeight: 900 }} dy={10} />
                                    <YAxis hide domain={[0, 'auto']} />
                                    {/* ✅ UPDATED BAR TOOLTIP CALL */}
                                    <Tooltip content={<CustomBarTooltip theme={theme} />} cursor={{ fill: theme === 'dark' ? '#ffffff05' : '#00000005' }} />
                                    <Bar dataKey="amount" fill={theme === 'dark' ? '#6366f1' : '#4f46e5'} radius={[10, 10, 10, 10]} barSize={window.innerWidth < 768 ? 30 : 45} animationDuration={1500} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InsightCard theme={theme} icon={<Target className="text-rose-500" />} label="Primary Sector" value={topCategory} />
                            <InsightCard theme={theme} icon={<Zap className="text-amber-500" />} label="Volatility" value={totalExpense > 50000 ? "High" : "Stable"} />
                        </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/5 pt-12 md:pt-0 lg:pl-10 relative">
                        <div className="mb-6 lg:hidden text-center">
                            <h4 className={`text-[10px] font-black uppercase tracking-[0.3em] ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Sector Distribution</h4>
                        </div>
                        <div className="relative w-full max-w-[320px] md:max-w-none h-[320px] md:h-[400px] flex items-center justify-center overflow-visible">
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Total Burn</span>
                                <span className={`text-2xl md:text-3xl font-black italic leading-none ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>₹{totalExpense.toLocaleString()}</span>
                            </div>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={expenseData} cx="50%" cy="50%" innerRadius={window.innerWidth < 768 ? "60%" : 90} outerRadius={window.innerWidth < 768 ? "85%" : 125} paddingAngle={8} dataKey="value" stroke="none" cornerRadius={8}>
                                        {expenseData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip content={<CustomPieTooltip theme={theme} />} wrapperStyle={{ zIndex: 100 }} />
                                    <Legend verticalAlign="bottom" iconType="circle" formatter={(value) => <span className={`text-[9px] font-black uppercase tracking-widest px-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-50'}`}>{value}</span>} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[300px] md:h-[450px] space-y-6">
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center ${theme === 'dark' ? 'bg-white/5 text-slate-800' : 'bg-slate-50 text-slate-200'}`}><BarChart3 size={32} md:size={40} /></div>
                    <div className="text-center px-4">
                        <p className={`text-base md:text-lg font-black italic tracking-tight ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Zero Data in {months[selectedDate.getMonth()]}</p>
                        <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Select a month with transactions to see insights</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const InsightCard = ({ theme, icon, label, value }) => (
    <div className={`p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border flex items-center gap-4 md:gap-5 transition-all duration-500 ${theme === 'dark' ? 'bg-black/20 border-white/5 hover:border-indigo-500/30' : 'bg-slate-50 border-slate-100 hover:border-indigo-200 shadow-sm'}`}>
        <div className={`p-3 md:p-4 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-white shadow-sm'}`}>{icon}</div>
        <div className="min-w-0">
            <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{label}</p>
            <p className={`text-base md:text-lg font-black italic uppercase tracking-tighter truncate ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{value}</p>
        </div>
    </div>
);

export default Analytics;