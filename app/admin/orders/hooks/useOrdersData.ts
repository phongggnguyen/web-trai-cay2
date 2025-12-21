import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../../../lib/supabase';
import { PAGE_SIZE } from '../../constants';
import type { Order, OrderFilters, UseOrdersDataReturn } from '../types';

export function useOrdersData(filters: OrderFilters): UseOrdersDataReturn {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchOrders();
    }, [filters.status, filters.searchTerm, filters.page]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);

            const start = (filters.page - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE - 1;

            let query = supabase
                .from('orders')
                .select(
                    'id, customer_name, customer_email, customer_phone, status, total_amount, created_at, payment_method, order_items(id, product_name, product_image, quantity)',
                    { count: 'exact' }
                )
                .order('created_at', { ascending: false })
                .range(start, end);

            // Status filter
            if (filters.status !== 'all') {
                query = query.eq('status', filters.status);
            }

            // Search filter
            const term = filters.searchTerm.trim();
            if (term) {
                const sanitized = term.replace(/[%]/g, '').replace(/,/g, '');
                const searchFilters = [
                    `customer_name.ilike.%${sanitized}%`,
                    `customer_email.ilike.%${sanitized}%`,
                    `customer_phone.ilike.%${sanitized}%`,
                ];

                // UUID search
                if (/^[0-9a-fA-F-]{6,}$/.test(sanitized)) {
                    searchFilters.push(`id.eq.${sanitized}`);
                }

                query = query.or(searchFilters.join(','));
            }

            const { data, error: fetchError, count } = await query;

            if (fetchError) throw fetchError;

            setOrders(data || []);
            setTotalCount(count || 0);
        } catch (err: any) {
            console.error('Failed to fetch orders', err);
            setError(err.message || 'Lỗi khi tải đơn hàng');
            toast.error('Không thể tải danh sách đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, newStatus: string) => {
        // Optimistic update
        const previousOrders = [...orders];
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );

        try {
            const { error: updateError } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (updateError) throw updateError;

            toast.success('Cập nhật trạng thái thành công');
        } catch (err: any) {
            // Rollback on error
            setOrders(previousOrders);
            console.error('Failed to update order status', err);
            toast.error(err.message || 'Không thể cập nhật trạng thái');
        }
    };

    const refetch = async () => {
        await fetchOrders();
    };

    return {
        orders,
        loading,
        error,
        totalCount,
        updateStatus,
        refetch,
    };
}
