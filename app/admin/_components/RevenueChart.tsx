import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ChartDataPoint } from '../types';

interface RevenueChartProps {
    data: ChartDataPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="rounded-2xl border border-border-color bg-white p-6 shadow-sm dark:border-border-dark dark:bg-surface-dark lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-main dark:text-white">Biểu đồ doanh thu</h3>
                <select className="rounded-lg border-none bg-gray-50 px-3 py-1 text-xs font-bold text-gray-600 outline-none hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300">
                    <option>7 ngày qua</option>
                </select>
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4cdf20" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#4cdf20" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis
                            stroke="#9ca3af"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: number | undefined) => {
                                const safeValue = value ?? 0;
                                return [`${safeValue.toLocaleString()}đ`, 'Doanh thu'];
                            }}
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <Area type="monotone" dataKey="value" stroke="#4cdf20" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
