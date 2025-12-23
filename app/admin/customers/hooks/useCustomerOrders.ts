import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';
import type { CustomerOrderHistory, UseCustomerOrdersReturn } from '../types';

export function useCustomerOrders(customerId: string | null): UseCustomerOrdersReturn {
    const [orders, setOrders] = useState<CustomerOrderHistory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (customerId) {
            fetchOrders();
        } else {
            setOrders([]);
        }
    }, [customerId]);

    const fetchOrders = async () => {
        if (!customerId) return;

        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('orders')
                .select(`
                    id,
                    created_at,
                    status,
                    total_amount,
                    payment_method,
                    order_items (
                        product_name,
                        product_image
                    )
                `)
                .eq('user_id', customerId)
                .order('created_at', { ascending: false })
                .limit(50);

            if (fetchError) throw fetchError;

            // Transform data để flatten order_items
            const transformedOrders: CustomerOrderHistory[] = (data || []).map(order => {
                // Lấy sản phẩm đầu tiên hoặc tất cả sản phẩm
                const items = order.order_items || [];
                const firstItem = items[0];

                // Tạo tên sản phẩm (nếu có nhiều hơn 1, thêm "+ X khác")
                let productName = firstItem?.product_name || 'Không có sản phẩm';
                if (items.length > 1) {
                    productName += ` + ${items.length - 1} khác`;
                }

                return {
                    id: order.id,
                    created_at: order.created_at,
                    status: order.status,
                    total_amount: Number(order.total_amount),
                    payment_method: order.payment_method,
                    product_name: productName,
                    product_image: firstItem?.product_image || null,
                };
            });

            setOrders(transformedOrders);
        } catch (err: any) {
            console.error('Failed to fetch customer orders:', err);
            setError(err.message || 'Lỗi khi tải lịch sử đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    return {
        orders,
        loading,
        error,
    };
}
