import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: string;
    color: string;
    bg: string;
}

export function StatCard({ label, value, change, trend, icon, color, bg }: StatCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-border-color bg-white p-6 transition-all hover:shadow-lg dark:border-border-dark dark:bg-surface-dark">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                    <h3 className="mt-2 text-2xl font-black text-text-main dark:text-white">{value}</h3>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${color}`}>
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold">
                <span
                    className={`flex items-center gap-0.5 ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-orange-500'
                        }`}
                >
                    {change}
                </span>
            </div>
        </div>
    );
}
