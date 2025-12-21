import React from 'react';
import Link from 'next/link';
import { STATUS_META } from '../../constants';
import OrderActions from './OrderActions';
import type { Order } from '../types';

interface OrderTableProps {
    orders: Order[];
    loading: boolean;
    onStatusUpdate: (orderId: string, newStatus: string) => Promise<void>;
}

export function OrderTable({ orders, loading, onStatusUpdate }: OrderTableProps) {
    if (loading) {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-border-color bg-white dark:border-border-dark dark:bg-surface-dark">
                <span className="material-symbols-outlined text-6xl text-gray-300">shopping_cart</span>
                <p className="mt-4 text-sm text-gray-500">Không có đơn hàng nào</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-border-color bg-white shadow-sm dark:border-border-dark dark:bg-surface-dark">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed">
                    <thead className="border-b border-border-color bg-gray-50 dark:border-border-dark dark:bg-white/5">
                        <tr>
                            <th className="w-[120px] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                Mã đơn
                            </th>
                            <th className="w-[200px] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                Khách hàng
                            </th>
                            <th className="w-[250px] px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                Sản phẩm
                            </th>
                            <th className="w-[130px] px-4 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                Tổng tiền
                            </th>
                            <th className="w-[150px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                Trạng thái
                            </th>
                            <th className="w-[120px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                Ngày tạo
                            </th>
                            <th className="w-[100px] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color dark:divide-border-dark">
                        {orders.map((order) => {
                            const statusMeta = STATUS_META[order.status] || STATUS_META.pending;
                            const firstProduct = order.order_items?.[0];
                            const remainingCount = (order.order_items?.length || 0) - 1;

                            return (
                                <tr
                                    key={order.id}
                                    className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
                                >
                                    <td className="px-4 py-4">
                                        <Link
                                            href={`/admin/orders/${order.id}`}
                                            className="text-sm font-bold text-primary hover:underline"
                                        >
                                            #{order.id.slice(0, 8)}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-500 text-sm font-bold text-white shadow-sm">
                                                {(order.customer_name || 'K').charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="truncate text-sm font-medium text-text-main dark:text-white">
                                                    {order.customer_name || 'Khách vãng lai'}
                                                </div>
                                                <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                                                    {order.customer_email || order.customer_phone}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        {firstProduct ? (
                                            <div className="flex items-center gap-3">
                                                {firstProduct.product_image ? (
                                                    <img
                                                        src={firstProduct.product_image}
                                                        alt={firstProduct.product_name}
                                                        className="h-12 w-12 shrink-0 rounded-lg border border-gray-200 object-cover shadow-sm dark:border-gray-700"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                                                        <span className="material-symbols-outlined text-xl text-gray-400">image</span>
                                                    </div>
                                                )}
                                                <div className="min-w-0 flex-1">
                                                    <div className="truncate text-sm font-medium text-text-main dark:text-white">
                                                        {firstProduct.product_name}
                                                    </div>
                                                    {remainingCount > 0 && (
                                                        <div className="text-xs text-gray-500">
                                                            +{remainingCount} sản phẩm khác
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">Không có sản phẩm</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-right">
                                        <span className="text-sm font-bold text-primary">
                                            {order.total_amount.toLocaleString('vi-VN')}đ
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-center">
                                            <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold ${statusMeta.badge}`}>
                                                <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                                                {statusMeta.label}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(order.created_at).toLocaleDateString('vi-VN', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex justify-center">
                                            <OrderActions
                                                orderId={order.id}
                                                currentStatus={order.status}
                                                onStatusUpdate={onStatusUpdate}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
