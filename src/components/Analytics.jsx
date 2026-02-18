import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useCollection } from '../hooks/useCollection';
import { motion } from 'framer-motion';

const Analytics = ({ theme }) => {
    const { documents: transactions } = useCollection('transactions');

    // Logic to group expenses by category 
    const expenseData = transactions
        ? transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, curr) => {
                const category = curr.category || 'default';
                const existing = acc.find((item) => item.name === category);
                if (existing) {
                    existing.value += curr.amount;
                } else {
                    acc.push({ name: category, value: curr.amount });
                }
                return acc;
            }, [])
        : [];

    // Custom Neon Color Palette for Fintech Feel 
    const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#fbbf24', '#8b5cf6', '#06b6d4'];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-10 rounded-[3rem] border transition-all duration-500 h-full ${theme === 'dark'
                ? 'bg-[#0a0c10]/50 border-white/5 shadow-2xl'
                : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'
                }`}
        >
            <div className="flex items-center justify-between mb-8">
                <h2 className={`text-2xl font-black italic tracking-tighter uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                    Deep Insights.
                </h2>
                <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                    Real-time Analysis
                </div>
            </div>

            {expenseData.length > 0 ? (
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={expenseData}
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {expenseData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                                    borderRadius: '20px',
                                    border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.05)',
                                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    color: theme === 'dark' ? '#fff' : '#000'
                                }}
                                itemStyle={{ color: theme === 'dark' ? '#fff' : '#000' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                                formatter={(value) => (
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                                        }`}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[350px] space-y-4">
                    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${theme === 'dark' ? 'bg-white/5 text-slate-700' : 'bg-slate-50 text-slate-300'
                        }`}>
                        <PieChart size={32} />
                    </div>
                    <p className={`text-sm font-bold italic ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                        Awaiting data stream for visualization...
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default Analytics;