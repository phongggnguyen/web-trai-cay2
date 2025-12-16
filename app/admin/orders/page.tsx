'use client';

import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast'; // Added toast for feedback
import { supabase } from '../../../lib/supabase';
import { PAGE_SIZE, STATUS_META } from '../constants';
import OrderActions from './_components/OrderActions';

type OrderItem = {
    id: string;
    product_name: string;
    product_image: string | null;
    quantity: number;
};

type Order = {
    id: string;
    customer_name: string | null;
    customer_email: string | null;
    customer_phone: string | null;
    status: string;
    total_amount: number;
    created_at: string;
    order_items: OrderItem[];
    payment_method: string;
};

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [statusFilter, setStatusFilter] = useState<'all' | keyof typeof STATUS_META>('all');
    const [searchTerm, setSearchTerm] = useState('');

    // State for tracking updates
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetchOrders();
    }, [statusFilter, searchTerm, page]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const start = (page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE - 1;

            let query = supabase
                .from('orders')
                .select(
                    'id, customer_name, customer_email, customer_phone, status, total_amount, created_at, payment_method, order_items(id, product_name, product_image, quantity)',
                    { count: 'exact' }
                )
                .order('created_at', { ascending: false })
                .range(start, end);

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            const term = searchTerm.trim();
            if (term) {
                const sanitized = term.replace(/[%]/g, '').replace(/,/g, '');
                const filters = [
                    `customer_name.ilike.%${sanitized}%`,
                    `customer_email.ilike.%${sanitized}%`,
                    `customer_phone.ilike.%${sanitized}%`,
                ];
                // Only attempt id match when input looks like a UUID fragment
                if (/^[0-9a-fA-F-]{6,}$/.test(sanitized)) {
                    filters.push(`id.eq.${sanitized}`);
                }
                query = query.or(filters.join(','));
            }

            const { data, error: fetchError, count } = await query;

            if (fetchError) throw fetchError;

            setOrders(data || []);
            setTotalCount(count || 0);
        } catch (err: any) {
            console.error('Failed to fetch orders', err);
            setError(err.message || 'Lỗi khi tải đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, newStatus: string) => {
        // Optimistic Update: Update UI immediately
        const previousOrders = [...orders];
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );

        try {
            setUpdatingId(orderId);

            // Attempt update and select returned record
            const { data, error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId)
                .select();

            if (error) throw error;

            if (!data || data.length === 0) {
                throw new Error('Không có quyền cập nhật hoặc không tìm thấy đơn hàng (RLS).');
            }

            toast.success(`Đã cập nhật trạng thái đơn #${orderId.slice(0, 8)}`);

        } catch (err: any) {
            console.error('Update failed:', err);
            // Revert if error
            setOrders(previousOrders);
            toast.error(err.message || 'Không thể cập nhật trạng thái - Vui lòng kiểm tra quyền admin');
        } finally {
            setUpdatingId(null);
        }
    };

    const totalPages = useMemo(() => {
        return Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
    }, [totalCount]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-text-main dark:text-white">Đơn hàng</h1>
            </div>

            {/* Filters */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    {(['all', 'pending', 'processing', 'completed', 'cancelled'] as const).map((key) => (
                        <button
                            key={key}
                            onClick={() => {
                                setStatusFilter(key as any);
                                setPage(1);
                            }}
                            className={`rounded-full px-4 py-2 text-sm font-bold border transition-colors ${statusFilter === key
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border-color text-text-main dark:text-white hover:border-primary/50'
                                }`}
                        >
                            {key === 'all' ? 'Tất cả' : STATUS_META[key].label}
                        </button>
                    ))}
                </div>
                <div className="flex w-full md:w-80 items-center rounded-lg h-10 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark px-3 focus-within:border-primary transition-colors">
                    <span className="material-symbols-outlined text-text-muted dark:text-text-secondary text-[20px]">search</span>
                    <input
                        className="w-full bg-transparent border-none focus:ring-0 text-text-main dark:text-white text-sm placeholder:text-text-muted dark:placeholder:text-text-secondary ml-2 outline-none"
                        placeholder="Tìm mã đơn, tên, email, sđt..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="rounded-2xl border border-border-color bg-surface-light p-6 dark:border-border-dark dark:bg-surface-dark overflow-x-auto">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-text-main dark:text-white">Danh sách đơn hàng</h3>
                    <span className="text-xs font-medium text-gray-500">Trang {page}/{totalPages}</span>
                </div>

                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-6 text-red-500 font-bold">{error}</div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-6 text-gray-500">Không có đơn hàng nào.</div>
                ) : (
                    <table className="w-full min-w-[720px] text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 dark:border-gray-800">
                                <th className="pb-3">Mã đơn</th>
                                <th className="pb-3">Khách hàng</th>
                                <th className="pb-3">PHƯƠNG THỨC</th>
                                <th className="pb-3">Tổng tiền</th>
                                <th className="pb-3">Ngày</th>
                                <th className="pb-3 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {orders.map((order) => {
                                const meta = STATUS_META[order.status] || {
                                    label: order.status,
                                    badge: 'bg-gray-100 text-gray-700 border border-gray-200',
                                };
                                const status = STATUS_META[order.status as keyof typeof STATUS_META] || STATUS_META.pending;

                                return (
                                    <tr key={order.id} className="group border-b border-gray-50 last:border-0 dark:border-gray-800/50">
                                        <td className="py-4 font-bold text-primary whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm text-text-main dark:text-white">#{order.id.slice(0, 8)}</span>
                                                <span className={`inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mt-1 ${status.badge}`}>
                                                    {status.label}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 font-medium text-text-main dark:text-white">
                                            {order.customer_name || 'Khách lẻ'}
                                            <div className="text-xs text-gray-400 font-normal mt-0.5">{order.customer_phone}</div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="material-symbols-outlined text-gray-400 text-[18px]">
                                                    {order.payment_method === 'cod' ? 'attach_money' :
                                                        order.payment_method === 'qr' ? 'qr_code_scanner' :
                                                            order.payment_method === 'card' ? 'credit_card' : 'account_balance_wallet'}
                                                </span>
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase">
                                                    {order.payment_method === 'cod' ? 'Tiền mặt' :
                                                        order.payment_method === 'qr' ? 'Chuyển khoản' :
                                                            order.payment_method === 'card' ? 'Thẻ tín dụng' : 'Ví điện tử'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 font-bold text-text-main dark:text-white">{order.total_amount.toLocaleString('vi-VN')}đ</td>
                                        <td className="py-4 text-gray-500">{new Date(order.created_at).toLocaleString('vi-VN')}</td>
                                        <td className="py-4 text-right">
                                            <OrderActions
                                                orderId={order.id}
                                                currentStatus={order.status}
                                                onUpdateStatus={(newStatus) => updateStatus(order.id, newStatus)}
                                                isUpdating={updatingId === order.id}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between text-sm text-text-main dark:text-white">
                    <span>Tổng {totalCount} đơn</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1 || loading}
                            className="px-3 py-1 rounded-lg border border-border-color dark:border-border-dark disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Trước
                        </button>
                        <span className="px-2">Trang {page} / {totalPages}</span>
                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages || loading}
                            className="px-3 py-1 rounded-lg border border-border-color dark:border-border-dark disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sau
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
