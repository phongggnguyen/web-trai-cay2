'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    cartCount: number;
}

export default function MobileMenu({ isOpen, onClose, cartCount }: MobileMenuProps) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname?.startsWith(path);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed top-0 right-0 bottom-0 w-[280px] bg-surface-light dark:bg-surface-dark z-50 shadow-2xl lg:hidden animate-slide-in-right">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border-color dark:border-border-dark">
                        <h2 className="text-lg font-bold text-text-main dark:text-white">Menu</h2>
                        <button
                            onClick={onClose}
                            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {[
                                { label: 'Trang chủ', path: '/', icon: 'home' },
                                { label: 'Sản phẩm', path: '/products', icon: 'shopping_bag' },
                                { label: 'Về chúng tôi', path: '/about', icon: 'info' },
                                { label: 'Blog', path: '/blog', icon: 'article' },
                                { label: 'Liên hệ', path: '/contact', icon: 'mail' },
                            ].map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive(item.path)
                                            ? 'bg-primary text-text-main font-bold'
                                            : 'text-text-main dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="my-4 h-px bg-border-color dark:bg-border-dark"></div>

                        {/* Additional Links */}
                        <div className="space-y-2">
                            <Link
                                href="/cart"
                                onClick={onClose}
                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                                    <span className="font-medium text-text-main dark:text-white">Giỏ hàng</span>
                                </div>
                                {cartCount > 0 && (
                                    <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            <Link
                                href="/login"
                                onClick={onClose}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                                <span className="font-medium text-text-main dark:text-white">Tài khoản</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
