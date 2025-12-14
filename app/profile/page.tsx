'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useGlobal } from '../../context/GlobalContext';
import Link from 'next/link';

export default function ProfilePage() {
    const { user } = useGlobal();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*)')
                .eq('user_id', user!.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-bold">Vui lòng đăng nhập</h2>
                <Link href="/login" className="text-primary hover:underline">Đăng nhập để xem lịch sử mua hàng</Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1280px] mx-auto px-4 py-8">
            <h1 className="text-3xl font-black mb-8 text-text-main dark:text-white">Lịch sử đơn hàng</h1>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                </div>
            ) : orders.length === 0 ? (
                <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-border-color dark:border-border-dark shadow-sm">
                            <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-bold text-lg text-primary">#{order.id.slice(0, 8)}</span>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">Đặt ngày: {new Date(order.created_at).toLocaleDateString('vi-VN')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Tổng tiền</p>
                                    <p className="text-xl font-black text-text-main dark:text-white">{order.total_amount.toLocaleString('vi-VN')}đ</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {order.order_items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="size-16 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                            <img src={item.product_image || 'https://placehold.co/100'} alt={item.product_name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-text-main dark:text-white text-sm">{item.product_name}</h4>
                                            <p className="text-xs text-gray-500">{item.quantity} x {item.price.toLocaleString('vi-VN')}đ</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
