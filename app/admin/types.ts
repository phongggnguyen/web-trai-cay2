// Type definitions for Admin Dashboard
export interface DashboardStats {
    revenue: number;
    newOrders: number;
    totalOrders: number;
    customers: number;
    lowStock: number;
}

export interface ChartDataPoint {
    name: string;
    value: number;
}

export interface StatusDistribution {
    label: string;
    count: number;
    percentage: number;
    color: string;
}

export interface Order {
    id: string;
    total_amount: number;
    status: string;
    created_at: string;
    customer_email: string;
    customer_phone: string;
}

export interface Product {
    id: string;
    stock: number;
    quantity?: number;
}
