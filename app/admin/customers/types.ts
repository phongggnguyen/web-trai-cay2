export interface Customer {
    id: string;
    full_name: string | null;
    phone_number: string | null;
    address: string | null;
    avatar_url: string | null;
    email: string | null;
    role: string | null;
    updated_at: string | null;
}

export interface CustomerStats {
    order_count: number;
    total_spent: number;
    last_order_date: string | null;
}

export interface CustomerWithStats extends Customer {
    stats: CustomerStats;
    customer_type: 'VIP Gold' | 'VIP' | 'Thành viên' | 'Thân thiết' | 'Khách mới';
}

export interface CustomerOrderHistory {
    id: string;
    created_at: string;
    status: string;
    total_amount: number;
    payment_method: string;
    product_name: string;
    product_image: string | null;
}

export interface CustomerFilters {
    searchTerm: string;
    filterMode: 'all' | 'vip' | 'spending';
}

export interface UseCustomersDataReturn {
    customers: CustomerWithStats[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export interface UseCustomerOrdersReturn {
    orders: CustomerOrderHistory[];
    loading: boolean;
    error: string | null;
}
