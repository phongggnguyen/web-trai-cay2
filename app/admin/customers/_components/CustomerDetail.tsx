import React from 'react';
import { getAvatarUrl, formatCurrency, formatDate } from '../utils/customerUtils';
import { CustomerStatsDisplay } from './CustomerStats';
import type { CustomerWithStats, CustomerOrderHistory } from '../types';

interface CustomerDetailProps {
    customer: CustomerWithStats | null;
    orderHistory: CustomerOrderHistory[];
    loading: boolean;
    onBack?: () => void;
}

export function CustomerDetail({ customer, orderHistory, loading, onBack }: CustomerDetailProps) {
    if (!customer) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center text-gray-400">
                    <span className="material-symbols-outlined text-[60px] opacity-20">person</span>
                    <p className="mt-2 text-sm">Chọn khách hàng để xem chi tiết</p>
                </div>
            </div>
        );
    }

    const avatarUrl = getAvatarUrl(customer.full_name, customer.avatar_url);
    const displayName = customer.full_name || 'Không có tên';
    const displayEmail = customer.email || 'Chưa có email';
    const displayPhone = customer.phone_number || 'Chưa có SĐT';
    const displayAddress = customer.address || 'Chưa có địa chỉ';

    // Determine customer type badge color
    const isVIP = customer.customer_type.includes('VIP');
    const badgeClass = isVIP
        ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
        : 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400';

    // Status mapping
    const getStatusBadge = (status: string) => {
        const statusMap: Record<string, { label: string; class: string; dotClass: string }> = {
            completed: {
                label: 'Hoàn thành',
                class: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
                dotClass: 'bg-green-600',
            },
            pending: {
                label: 'Đang xử lý',
                class: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
                dotClass: 'bg-yellow-600',
            },
            cancelled: {
                label: 'Đã hủy',
                class: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
                dotClass: 'bg-red-600',
            },
            processing: {
                label: 'Đang xử lý',
                class: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
                dotClass: 'bg-yellow-600',
            },
            shipping: {
                label: 'Đang giao',
                class: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
                dotClass: 'bg-blue-600',
            },
        };

        return statusMap[status] || statusMap.pending;
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Mobile Back Button */}
            {onBack && (
                <div className="flex xl:hidden items-center gap-2">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </button>
                    <span className="font-bold text-text-main dark:text-white">Quay lại danh sách</span>
                </div>
            )}

            {/* Profile Card */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="shrink-0">
                        <img
                            src={avatarUrl}
                            alt={displayName}
                            className="w-24 h-24 rounded-2xl border-2 border-gray-100 dark:border-border-dark shadow-lg object-cover"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-start w-full">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-black text-text-main dark:text-white">
                                        {displayName}
                                    </h3>
                                    <span
                                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${badgeClass}`}
                                    >
                                        {customer.customer_type}
                                    </span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                    ID: {customer.id.slice(0, 8)}...
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-9 h-9 rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">chat</span>
                                </button>
                                <button className="w-9 h-9 rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">mail</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-gray-400 text-xs">Email</p>
                                    <p className="text-text-main dark:text-white text-sm font-medium truncate">
                                        {displayEmail}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">call</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-gray-400 text-xs">Số điện thoại</p>
                                    <p className="text-text-main dark:text-white text-sm font-medium">
                                        {displayPhone}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 sm:col-span-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 shrink-0">
                                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-gray-400 text-xs">Địa chỉ</p>
                                    <p className="text-text-main dark:text-white text-sm font-medium">
                                        {displayAddress}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <CustomerStatsDisplay stats={customer.stats} />
                    </div>
                </div>
            </div>

            {/* Order History Table */}
            <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark flex-1 flex flex-col min-h-[400px] shadow-sm">
                <div className="p-6 pb-2 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-main dark:text-white">Lịch sử đơn hàng</h3>
                    <a className="text-sm text-primary font-bold hover:underline cursor-pointer">
                        Xem tất cả
                    </a>
                </div>
                <div className="p-4 overflow-x-auto">
                    {loading ? (
                        <div className="py-8 text-center text-gray-400">
                            <span className="material-symbols-outlined animate-spin text-[30px]">
                                progress_activity
                            </span>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-white dark:bg-surface-dark z-10">
                                <tr className="border-b border-gray-100 dark:border-border-dark text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="px-4 py-3 font-bold">Mã đơn</th>
                                    <th className="px-4 py-3 font-bold">Ngày đặt</th>
                                    <th className="px-4 py-3 font-bold hidden sm:table-cell">Sản phẩm</th>
                                    <th className="px-4 py-3 font-bold">Trạng thái</th>
                                    <th className="px-4 py-3 font-bold text-right">Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {orderHistory.length > 0 ? (
                                    orderHistory.map((order) => {
                                        const statusInfo = getStatusBadge(order.status);
                                        return (
                                            <tr
                                                key={order.id}
                                                className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-50 dark:border-border-dark/50 last:border-0"
                                            >
                                                <td className="px-4 py-4 font-bold text-primary">
                                                    #{order.id.slice(0, 8)}
                                                </td>
                                                <td className="px-4 py-4 text-text-main dark:text-gray-400">
                                                    {formatDate(order.created_at)}
                                                </td>
                                                <td className="px-4 py-4 text-text-main dark:text-white hidden sm:table-cell">
                                                    {order.product_name}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${statusInfo.class}`}
                                                    >
                                                        <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotClass}`}></span>
                                                        {statusInfo.label}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-right font-bold text-text-main dark:text-white">
                                                    {formatCurrency(order.total_amount)}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                            Chưa có đơn hàng nào
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
