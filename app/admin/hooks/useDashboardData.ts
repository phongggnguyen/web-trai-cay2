import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import type { DashboardStats, ChartDataPoint, StatusDistribution, Order, Product } from '../types';
import { STATUS_META } from '../constants';

interface UseDashboardDataReturn {
    loading: boolean;
    error: string | null;
    stats: DashboardStats;
    distribution: StatusDistribution[];
    chartData: ChartDataPoint[];
}

export function useDashboardData(): UseDashboardDataReturn {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<DashboardStats>({
        revenue: 0,
        newOrders: 0,
        totalOrders: 0,
        customers: 0,
        lowStock: 0,
    });
    const [distribution, setDistribution] = useState<StatusDistribution[]>([]);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                // 1. Fetch Orders
                const { data: orders, error: ordersError } = await supabase
                    .from('orders')
                    .select('id, total_amount, status, created_at, customer_email, customer_phone');

                if (ordersError) throw ordersError;

                // 2. Fetch Products (for Inventory)
                const { data: products, error: productsError } = await supabase
                    .from('products')
                    .select('id, stock');

                // Don't throw on products error - it's optional
                if (productsError) {
                    console.warn('Failed to fetch products:', productsError);
                }

                // Process data
                const processedStats = processStats(orders || [], products || []);
                const processedDistribution = processDistribution(orders || []);
                const processedChartData = processChartData(orders || []);

                setStats(processedStats);
                setDistribution(processedDistribution);
                setChartData(processedChartData);

            } catch (err) {
                console.error('Error loading dashboard data:', err);
                setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { loading, error, stats, distribution, chartData };
}

// Helper: Process Stats
function processStats(orders: Order[], products: Product[]): DashboardStats {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Revenue (Only completed orders)
    const completedOrders = orders.filter(
        o => o.status === 'completed' || o.status === 'delivered'
    );
    const revenue = completedOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

    // New Orders (Created today)
    const newOrders = orders.filter(
        o => new Date(o.created_at) >= startOfDay
    ).length;

    // Unique Customers
    const customers = new Set(
        orders.map(o => o.customer_email).filter(Boolean)
    ).size;

    // Low Stock
    const lowStock = products.filter(
        p => (p.quantity ?? p.stock ?? 0) < 10
    ).length;

    return {
        revenue,
        newOrders,
        totalOrders: orders.length,
        customers,
        lowStock,
    };
}

// Helper: Process Distribution
function processDistribution(orders: Order[]): StatusDistribution[] {
    const statusCounts: Record<string, number> = {};

    orders.forEach(o => {
        statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
    });

    const total = orders.length;

    return Object.entries(STATUS_META)
        .map(([key, meta]) => ({
            label: meta.label,
            count: statusCounts[key] || 0,
            percentage: total > 0 ? Math.round(((statusCounts[key] || 0) / total) * 100) : 0,
            color: meta.color, // ✅ Use color from constants
        }))
        .filter(d => d.count > 0);
}

// Helper: Process Chart Data (Fix 7 days logic)
function processChartData(orders: Order[]): ChartDataPoint[] {
    const baseDate = new Date(); // ✅ Create once
    const last7Days: Record<string, number> = {};

    // Initialize 7 days with proper date handling
    for (let i = 6; i >= 0; i--) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() - i);

        // ✅ Format consistently without locale issues
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const key = `${day}/${month}`;

        last7Days[key] = 0;
    }

    // Aggregate completed orders
    const completedOrders = orders.filter(
        o => o.status === 'completed' || o.status === 'delivered'
    );

    completedOrders.forEach(o => {
        const date = new Date(o.created_at);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const dateKey = `${day}/${month}`;

        if (last7Days[dateKey] !== undefined) {
            last7Days[dateKey] += (o.total_amount || 0);
        }
    });

    return Object.entries(last7Days).map(([date, amount]) => ({
        name: date,
        value: amount,
    }));
}
