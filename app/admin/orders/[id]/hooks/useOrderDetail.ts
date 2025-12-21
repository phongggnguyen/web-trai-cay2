import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase';

export interface OrderDetail {
    id: string;
    customer_name: string | null;
    customer_email: string | null;
    customer_phone: string | null;
    status: string;
    total_amount: number;
    payment_method: string;
    created_at: string;
    order_items: Array<{
        id: string;
        product_name: string;
        product_image: string | null;
        quantity: number;
        price: number;
    }>;
}

interface UseOrderDetailReturn {
    order: OrderDetail | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useOrderDetail(orderId: string): UseOrderDetailReturn {
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('orders')
                .select(`
          id,
          customer_name,
          customer_email,
          customer_phone,
          status,
          total_amount,
          payment_method,
          created_at,
          order_items (
            id,
            product_name,
            product_image,
            quantity,
            price
          )
        `)
                .eq('id', orderId)
                .single();

            if (fetchError) {
                throw fetchError;
            }

            if (!data) {
                throw new Error('Không tìm thấy đơn hàng');
            }

            setOrder(data as OrderDetail);
        } catch (err: any) {
            console.error('Failed to fetch order detail:', err);
            setError(err.message || 'Không thể tải chi tiết đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    return {
        order,
        loading,
        error,
        refetch: fetchOrder,
    };
}
