'use client';

import React, { useState } from 'react';
import { STATUS_META } from '../constants';
import { useOrdersData } from './hooks/useOrdersData';
import { OrderTable } from './_components/OrderTable';
import type { OrderFilters } from './types';

export default function OrdersPage() {
    const [filters, setFilters] = useState<OrderFilters>({
        status: 'all',
        searchTerm: '',
        page: 1,
    });

    const { orders, loading, error, totalCount, updateStatus } = useOrdersData(filters);

    const totalPages = Math.ceil(totalCount / 10);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-black text-text-main dark:text-white">Quản lý đơn hàng</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tổng {totalCount} đơn hàng
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Search */}
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm theo tên, email, số điện thoại..."
                        value={filters.searchTerm}
                        onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value, page: 1 })}
                        className="w-full rounded-xl border border-border-color bg-white py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-surface-dark dark:text-white"
                    />
                </div>

                {/* Status Filter */}
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value as any, page: 1 })}
                    className="rounded-xl border border-border-color bg-white px-4 py-2 text-sm font-medium outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-surface-dark dark:text-white"
                >
                    <option value="all">Tất cả trạng thái</option>
                    {Object.entries(STATUS_META).map(([key, meta]) => (
                        <option key={key} value={key}>
                            {meta.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Error State */}
            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                </div>
            )}

            {/* Table */}
            <OrderTable orders={orders} loading={loading} onStatusUpdate={updateStatus} />

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex items-center justify-between rounded-2xl border border-border-color bg-white p-4 dark:border-border-dark dark:bg-surface-dark">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Trang {filters.page} / {totalPages}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                            disabled={filters.page === 1}
                            className="rounded-lg border border-border-color px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-border-dark dark:hover:bg-white/5"
                        >
                            Trước
                        </button>
                        <button
                            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                            disabled={filters.page === totalPages}
                            className="rounded-lg border border-border-color px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-border-dark dark:hover:bg-white/5"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
