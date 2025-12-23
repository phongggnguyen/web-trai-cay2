import React from 'react';
import { getAvatarUrl } from '../utils/customerUtils';
import type { CustomerWithStats } from '../types';

interface CustomerListProps {
    customers: CustomerWithStats[];
    selectedId: string | null;
    onSelect: (customer: CustomerWithStats) => void;
    loading: boolean;
    filterMode: 'all' | 'vip' | 'spending';
}

export function CustomerList({
    customers,
    selectedId,
    onSelect,
    loading,
    filterMode
}: CustomerListProps) {
    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="flex flex-col items-center gap-3 text-gray-400">
                    <span className="material-symbols-outlined animate-spin text-[40px]">progress_activity</span>
                    <span className="text-sm">Đang tải...</span>
                </div>
            </div>
        );
    }

    if (customers.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-[40px] opacity-20">search_off</span>
                    <span>Không tìm thấy khách hàng nào</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 space-y-1">
            {customers.map((customer, idx) => {
                const isSelected = selectedId === customer.id;
                const avatarUrl = getAvatarUrl(customer.full_name, customer.avatar_url);
                const displayName = customer.full_name || 'Không có tên';
                const displayEmail = customer.email || 'Chưa có email';

                return (
                    <div
                        key={customer.id}
                        onClick={() => onSelect(customer)}
                        className={`p-3 rounded-xl cursor-pointer flex items-center gap-4 group transition-all ${isSelected
                            ? 'bg-primary/10 border border-primary/20'
                            : 'hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        {/* Rank Number for Spending Mode */}
                        {filterMode === 'spending' && (
                            <div
                                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${idx === 0
                                    ? 'bg-yellow-400 text-yellow-900'
                                    : idx === 1
                                        ? 'bg-gray-300 text-gray-800'
                                        : idx === 2
                                            ? 'bg-orange-300 text-orange-900'
                                            : 'bg-gray-100 dark:bg-white/10 text-gray-500'
                                    }`}
                            >
                                {idx + 1}
                            </div>
                        )}

                        <div className="relative">
                            <img
                                src={avatarUrl}
                                alt={displayName}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            {isSelected && (
                                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-surface-dark rounded-full p-0.5">
                                    <div className="w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-surface-dark"></div>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h4
                                    className={`font-bold text-sm truncate ${isSelected
                                        ? 'text-text-main dark:text-white'
                                        : 'text-text-main dark:text-gray-200'
                                        }`}
                                >
                                    {displayName}
                                </h4>
                                {filterMode === 'spending' ? (
                                    <span className="text-xs font-bold text-primary whitespace-nowrap ml-2">
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(customer.stats.total_spent)}
                                    </span>
                                ) : (
                                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                                        {customer.stats.order_count} đơn
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-xs truncate">
                                {displayEmail}
                            </p>
                        </div>

                        <span className="material-symbols-outlined text-gray-300 group-hover:text-primary text-[20px] transition-colors">
                            chevron_right
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
