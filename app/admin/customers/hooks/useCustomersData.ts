import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../../../lib/supabase';
import { getCustomerType } from '../utils/customerUtils';
import type { CustomerWithStats, CustomerFilters, UseCustomersDataReturn } from '../types';

export function useCustomersData(filters: CustomerFilters): UseCustomersDataReturn {
    const [customers, setCustomers] = useState<CustomerWithStats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, [filters.searchTerm, filters.filterMode]);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch profiles với email từ auth.users
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('id, full_name, phone_number, address, avatar_url, role, updated_at')
                .order('updated_at', { ascending: false });

            if (profilesError) throw profilesError;

            if (!profilesData || profilesData.length === 0) {
                setCustomers([]);
                return;
            }

            // Fetch tất cả orders để tính stats
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select('user_id, total_amount, created_at, status')
                .in('user_id', profilesData.map(p => p.id));

            if (ordersError) throw ordersError;

            // Fetch emails từ auth.users metadata (nếu có RLS cho phép)
            // Vì không truy cập trực tiếp auth.users, ta sẽ lấy email từ orders.customer_email
            const { data: orderEmailsData } = await supabase
                .from('orders')
                .select('user_id, customer_email')
                .in('user_id', profilesData.map(p => p.id));

            // Tạo map email từ orders
            const emailMap = new Map<string, string>();
            orderEmailsData?.forEach(order => {
                if (order.user_id && order.customer_email && !emailMap.has(order.user_id)) {
                    emailMap.set(order.user_id, order.customer_email);
                }
            });

            // Tính stats cho mỗi customer
            const customersWithStats: CustomerWithStats[] = profilesData.map(profile => {
                const userOrders = ordersData?.filter(o => o.user_id === profile.id) || [];
                const totalSpent = userOrders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0);
                const orderCount = userOrders.length;

                // Tìm đơn hàng gần nhất
                const sortedOrders = userOrders.sort((a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                );
                const lastOrderDate = sortedOrders[0]?.created_at || null;

                return {
                    ...profile,
                    email: emailMap.get(profile.id) || null,
                    stats: {
                        order_count: orderCount,
                        total_spent: totalSpent,
                        last_order_date: lastOrderDate,
                    },
                    customer_type: getCustomerType(totalSpent),
                };
            });

            // Apply filters
            let filteredCustomers = customersWithStats;

            // Search filter
            const searchTerm = filters.searchTerm.toLowerCase().trim();
            if (searchTerm) {
                filteredCustomers = filteredCustomers.filter(c =>
                    c.full_name?.toLowerCase().includes(searchTerm) ||
                    c.phone_number?.includes(searchTerm) ||
                    c.email?.toLowerCase().includes(searchTerm)
                );
            }

            // Filter mode
            if (filters.filterMode === 'vip') {
                filteredCustomers = filteredCustomers.filter(c =>
                    c.customer_type.includes('VIP')
                );
            }

            // Sorting
            if (filters.filterMode === 'spending') {
                filteredCustomers.sort((a, b) => b.stats.total_spent - a.stats.total_spent);
            }

            setCustomers(filteredCustomers);
        } catch (err: any) {
            console.error('Failed to fetch customers:', err);
            setError(err.message || 'Lỗi khi tải danh sách khách hàng');
            toast.error('Không thể tải danh sách khách hàng');
        } finally {
            setLoading(false);
        }
    };

    return {
        customers,
        loading,
        error,
        refetch: fetchCustomers,
    };
}
