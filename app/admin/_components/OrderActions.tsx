'use client';

import React, { useState, useEffect, useRef } from 'react';
import { STATUS_META } from '../constants';

type OrderActionsProps = {
    orderId: string;
    currentStatus: string;
    onUpdateStatus: (newStatus: string) => void;
    isUpdating: boolean;
};

export default function OrderActions({
    orderId,
    currentStatus,
    onUpdateStatus,
    isUpdating,
}: OrderActionsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="flex justify-end gap-3 items-center">
            <a
                href={`/order-success?id=${orderId}`}
                className="p-2 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
                title="Xem chi tiết"
            >
                <span className="material-symbols-outlined text-[20px]">visibility</span>
            </a>

            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isUpdating}
                    className={`h-9 w-9 flex items-center justify-center rounded-full transition-all shadow-sm ${isOpen
                        ? 'bg-primary text-white ring-2 ring-primary/30'
                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                        } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Cập nhật trạng thái"
                >
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                </button>

                {isOpen && (
                    <div className="absolute right-auto left-auto -translate-x-[calc(100%-2.25rem)] top-full mt-2 z-50 w-52 rounded-2xl border border-gray-100 bg-white/95 backdrop-blur-xl p-2 shadow-xl dark:border-gray-800 dark:bg-[#1a1c1e]/95 animate-in fade-in zoom-in-95 duration-200">
                        <div className="mb-2 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-gray-400">
                            Chọn trạng thái
                        </div>
                        <div className="flex flex-col gap-1">
                            {Object.entries(STATUS_META).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        onUpdateStatus(key);
                                        setIsOpen(false);
                                    }}
                                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${currentStatus === key
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5'
                                        }`}
                                >
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#1a1c1e] transition-colors ${currentStatus === key ? 'bg-primary ring-primary/30' : 'bg-gray-300 ring-transparent'
                                            }`}
                                    />
                                    {value.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
