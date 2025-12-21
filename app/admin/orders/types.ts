// Type definitions for Orders module
export interface OrderItem {
    id: string;
    product_name: string;
    product_image: string | null;
    quantity: number;
    price?: number;
}

export interface Order {
    id: string;
    customer_name: string | null;
    customer_email: string | null;
    customer_phone: string | null;
    status: string;
    total_amount: number;
    created_at: string;
    order_items: OrderItem[];
    payment_method: string;
}

export interface OrderFilters {
    status: 'all' | string;
    searchTerm: string;
    page: number;
}

export interface UseOrdersDataReturn {
    orders: Order[];
    loading: boolean;
    error: string | null;
    totalCount: number;
    updateStatus: (orderId: string, newStatus: string) => Promise<void>;
    refetch: () => Promise<void>;
}
