import React from 'react';
import type { StatusDistribution } from '../types';

interface OrderStatusDonutProps {
    distribution: StatusDistribution[];
    totalOrders: number;
}

export function OrderStatusDonut({ distribution, totalOrders }: OrderStatusDonutProps) {
    // Construct Conic Gradient
    const getConicGradient = () => {
        let currentDeg = 0;
        const gradients = distribution.map(item => {
            const deg = (item.percentage / 100) * 360;
            const segment = `${item.color} ${currentDeg}deg ${currentDeg + deg}deg`;
            currentDeg += deg;
            return segment;
        });

        if (gradients.length === 0) return 'gray 0deg 360deg';
        return `conic-gradient(${gradients.join(', ')})`;
    };

    return (
        <div className="rounded-2xl border border-border-color bg-white p-6 shadow-sm dark:border-border-dark dark:bg-surface-dark">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-text-main dark:text-white">Trạng thái đơn hàng</h3>
            </div>

            <div className="flex flex-col items-center justify-center py-4">
                {/* Dynamic Conic Gradient */}
                <div
                    className="relative flex h-48 w-48 items-center justify-center rounded-full transition-all duration-500"
                    style={{ background: getConicGradient() }}
                >
                    {/* Inner Circle */}
                    <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white dark:bg-surface-dark z-10 shadow-sm">
                        <span className="text-3xl font-black text-text-main dark:text-white">{totalOrders}</span>
                        <span className="text-xs font-medium text-gray-500">Tổng đơn</span>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-8 w-full space-y-3">
                    {distribution.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span
                                    className="h-3 w-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
                            </div>
                            <span className="font-bold text-text-main dark:text-white">
                                {item.percentage}% ({item.count})
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
