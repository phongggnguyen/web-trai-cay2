import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
    unit: string;
}

interface OrderData {
    id: string;
    total_amount: number;
    shipping_fee: number;
    payment_method: string;
    created_at: string;
    order_items: OrderItem[];
}

interface UseOrderReturn {
    orderData: OrderData | null;
    isLoading: boolean;
    error: string | null;
}

export function useOrder(orderId: string | null): UseOrderReturn {
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderData = async () => {
            if (!orderId) {
                setError('Không tìm thấy mã đơn hàng');
                setIsLoading(false);
                return;
            }

            try {
                // Fetch order
                const { data: order, error: orderError } = await supabase
                    .from('orders')
                    .select(`
            id,
            total_amount,
            shipping_fee,
            payment_method,
            created_at
          `)
                    .eq('id', orderId)
                    .single();

                if (orderError) throw orderError;
                if (!order) throw new Error('Không tìm thấy đơn hàng');

                // Fetch order items
                const { data: items, error: itemsError } = await supabase
                    .from('order_items')
                    .select('product_name, quantity, price, unit')
                    .eq('order_id', orderId);

                if (itemsError) throw itemsError;

                setOrderData({
                    ...order,
                    order_items: items || []
                });
            } catch (err: any) {
                console.error('Error fetching order:', err);
                setError(err.message || 'Có lỗi xảy ra khi tải đơn hàng');
                toast.error('Không thể tải thông tin đơn hàng');
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId]);

    return { orderData, isLoading, error };
}
