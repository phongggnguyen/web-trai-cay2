'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useGlobal } from '../../context/GlobalContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAdmin } = useGlobal();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            router.replace('/login');
            return;
        }
        if (!isAdmin) {
            router.replace('/');
        }
    }, [user, isAdmin, router]);

    if (!user || !isAdmin) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="rounded-2xl border border-border-color dark:border-border-dark bg-white dark:bg-surface-dark px-6 py-4 shadow-sm text-center">
                    <p className="text-sm font-bold text-text-main dark:text-white">Đang kiểm tra quyền truy cập...</p>
                </div>
            </div>
        );
    }

    const menuItems = [
        { name: 'Tổng quan', icon: 'dashboard', path: '/admin' },
        { name: 'Đơn hàng', icon: 'receipt_long', path: '/admin/orders' },
        { name: 'Sản phẩm', icon: 'inventory_2', path: '/admin/products' },
        { name: 'Khách hàng', icon: 'group', path: '/admin/customers' },
        { name: 'Mã giảm giá', icon: 'local_offer', path: '/admin/vouchers' },
        { name: 'Cài đặt', icon: 'settings', path: '/admin/settings' },
    ];

    return (
        <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
            {/* Sidebar */}
            <aside className="fixed left-0 top-[65px] hidden h-[calc(100vh-65px)] w-64 border-r border-border-color bg-surface-light p-4 dark:border-border-dark dark:bg-surface-dark lg:block">
                <div className="mb-8 px-4">
                    <span className="text-xs font-bold uppercase text-gray-400">Quản lý</span>
                </div>
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${isActive
                                        ? 'bg-primary/20 text-primary'
                                        : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    {item.icon}
                                </span>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8 lg:ml-64">
                {children}
            </div>
        </div>
    );
}
