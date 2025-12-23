import React from 'react';
import { formatCurrency, calculateAvgOrderValue, getRelativeTime } from '../utils/customerUtils';
import type { CustomerStats } from '../types';

interface CustomerStatsProps {
    stats: CustomerStats;
}

export function CustomerStatsDisplay({ stats }: CustomerStatsProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-border-dark">
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">
                    Tổng chi tiêu
                </p>
                <p className="text-primary text-xl font-black">
                    {formatCurrency(stats.total_spent)}
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">
                    Số đơn hàng
                </p>
                <p className="text-text-main dark:text-white text-xl font-bold">
                    {stats.order_count} đơn
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">
                    Giá trị TB/Đơn
                </p>
                <p className="text-text-main dark:text-white text-xl font-bold">
                    {calculateAvgOrderValue(stats.total_spent, stats.order_count)}
                </p>
            </div>
            <div>
                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">
                    Đơn gần nhất
                </p>
                <p className="text-text-main dark:text-white text-xl font-bold">
                    {getRelativeTime(stats.last_order_date)}
                </p>
            </div>
        </div>
    );
}
