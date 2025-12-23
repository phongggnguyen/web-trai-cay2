'use client';

import React, { useState } from 'react';
import { useCustomersData } from './hooks/useCustomersData';
import { useCustomerOrders } from './hooks/useCustomerOrders';
import { CustomerList } from './_components/CustomerList';
import { CustomerDetail } from './_components/CustomerDetail';
import type { CustomerFilters, CustomerWithStats } from './types';

export default function AdminCustomersPage() {
    const [filters, setFilters] = useState<CustomerFilters>({
        searchTerm: '',
        filterMode: 'all',
    });
    const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithStats | null>(null);
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

    // Fetch customers data
    const { customers, loading, error } = useCustomersData(filters);

    // Fetch selected customer's order history
    const { orders: orderHistory, loading: ordersLoading } = useCustomerOrders(
        selectedCustomer?.id || null
    );

    // Auto-select first customer when data loads
    React.useEffect(() => {
        if (customers.length > 0 && !selectedCustomer) {
            setSelectedCustomer(customers[0]);
        }
    }, [customers, selectedCustomer]);

    const handleCustomerClick = (customer: CustomerWithStats) => {
        setSelectedCustomer(customer);
        setIsMobileDetailOpen(true);
    };

    const handleBackToList = () => {
        setIsMobileDetailOpen(false);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col overflow-y-auto custom-scrollbar pr-2">
            {/* Header & Search */}
            <div
                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0 ${isMobileDetailOpen ? 'hidden xl:flex' : 'flex'
                    }`}
            >
                <div>
                    <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">
                        Quản lý khách hàng
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Danh sách thông tin và lịch sử mua hàng
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64 md:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm khách hàng, SĐT..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-surface-dark text-text-main dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all"
                        value={filters.searchTerm}
                        onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                    />
                </div>
            </div>

            {/* Filter Buttons (Tabs) */}
            <div className={`flex gap-3 flex-wrap mb-6 ${isMobileDetailOpen ? 'hidden xl:flex' : 'flex'}`}>
                {[
                    { id: 'all', label: 'Tất cả (Mới nhất)' },
                    { id: 'vip', label: 'Chỉ khách VIP' },
                    { id: 'spending', label: 'Top Chi tiêu' },
                ].map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() =>
                            setFilters({ ...filters, filterMode: mode.id as 'all' | 'vip' | 'spending' })
                        }
                        className={`h-9 px-4 rounded-xl text-sm font-bold border transition-all ${filters.filterMode === mode.id
                            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                            : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                            }`}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                    </div>
                </div>
            )}

            {/* Master-Detail Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0">
                {/* Left Column: Customer List */}
                <div
                    className={`xl:col-span-4 bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark flex-col h-fit shadow-sm ${isMobileDetailOpen ? 'hidden xl:flex' : 'flex'
                        }`}
                >
                    <div className="p-4 border-b border-gray-100 dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                        <span className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider">
                            Danh sách ({customers.length})
                        </span>
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">group</span>
                    </div>

                    <CustomerList
                        customers={customers}
                        selectedId={selectedCustomer?.id || null}
                        onSelect={handleCustomerClick}
                        loading={loading}
                        filterMode={filters.filterMode}
                    />
                </div>

                {/* Right Column: Detail View */}
                <div
                    className={`xl:col-span-8 h-fit ${isMobileDetailOpen ? 'flex' : 'hidden xl:flex'
                        }`}
                >
                    <CustomerDetail
                        customer={selectedCustomer}
                        orderHistory={orderHistory}
                        loading={ordersLoading}
                        onBack={handleBackToList}
                    />
                </div>
            </div>
        </div>
    );
}
