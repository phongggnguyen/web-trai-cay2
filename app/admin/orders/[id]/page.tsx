'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useOrderDetail } from './hooks/useOrderDetail';
import { OrderTimeline } from './_components/OrderTimeline';
import { OrderProductList } from './_components/OrderProductList';
import { OrderCustomerInfo } from './_components/OrderCustomerInfo';

export default function AdminOrderDetailPage() {
    const params = useParams();
    const orderId = params.id as string;

    const { order, loading, error } = useOrderDetail(orderId);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-800 dark:bg-red-900/20">
                <span className="material-symbols-outlined text-6xl text-red-500">error</span>
                <h2 className="text-xl font-bold text-red-700 dark:text-red-400">Không tìm thấy đơn hàng</h2>
                <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
                <Link
                    href="/admin/orders"
                    className="mt-4 rounded-lg bg-primary px-4 py-2 font-bold text-white transition-colors hover:bg-primary/90"
                >
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    const subtotal = order.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="max-w-[1280px] mx-auto pb-10">
            {/* Breadcrumbs & Heading */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/admin/orders" className="hover:text-primary transition-colors">Đơn hàng</Link>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <span className="text-text-main dark:text-white font-medium">Chi tiết #{order.id.slice(0, 8)}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text-main dark:text-white mb-1">
                            Chi tiết đơn hàng <span className="text-primary">#{order.id.slice(0, 8)}</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Đặt ngày {new Date(order.created_at).toLocaleString('vi-VN')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order Items & Summary (2/3) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <OrderProductList items={order.order_items} status={order.status} />

                    {/* Financial Summary */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-green-600">receipt_long</span>
                            Tổng kết thanh toán
                        </h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-sm md:text-base">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Tạm tính</span>
                                <span className="font-bold text-text-main dark:text-white">{subtotal.toLocaleString()}đ</span>
                            </div>
                            <div className="h-px bg-gray-100 dark:bg-border-dark my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg text-text-main dark:text-white">Tổng cộng</span>
                                <span className="font-black text-2xl text-primary">{order.total_amount.toLocaleString()}đ</span>
                            </div>
                            <p className="text-right text-xs text-gray-400 italic">Đã bao gồm VAT</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline, Customer, Shipping (1/3) */}
                <div className="flex flex-col gap-6">
                    <OrderTimeline currentStatus={order.status} createdAt={order.created_at} />
                    <OrderCustomerInfo
                        customerName={order.customer_name}
                        customerEmail={order.customer_email}
                        customerPhone={order.customer_phone}
                        paymentMethod={order.payment_method}
                    />
                </div>
            </div>
        </div>
    );
}
