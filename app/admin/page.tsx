'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { PAGE_SIZE, STATUS_META } from './constants';
import OrderActions from './_components/OrderActions';

type OrderItem = {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
};

type Order = {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: OrderItem[];
  payment_method: string;
};



const isToday = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

export default function AdminPage() {
  const { user, isAdmin } = useGlobal();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'all' | keyof typeof STATUS_META>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [stats, setStats] = useState({ todayOrders: 0, todayRevenue: 0 });

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return;
    }
    if (!isAdmin) {
      router.replace('/');
    }
  }, [user, isAdmin, router]);

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, searchTerm, page]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const start = (page - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE - 1;

      let query = supabase
        .from('orders')
        .select(
          'id, customer_name, customer_email, customer_phone, status, total_amount, created_at, payment_method, order_items(id, product_name, product_image, quantity)',
          { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range(start, end);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const term = searchTerm.trim();
      if (term) {
        const sanitized = term.replace(/[%]/g, '').replace(/,/g, '');
        const filters = [
          `customer_name.ilike.%${sanitized}%`,
          `customer_email.ilike.%${sanitized}%`,
          `customer_phone.ilike.%${sanitized}%`,
        ];
        // Only attempt id match when input looks like a UUID fragment; use exact eq to avoid cast parse errors
        if (/^[0-9a-fA-F-]{6,}$/.test(sanitized)) {
          filters.push(`id.eq.${sanitized}`);
        }
        query = query.or(filters.join(','));
      }

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      setOrders(data || []);
      setTotalCount(count || 0);
    } catch (err: any) {
      console.error('Failed to fetch orders', err);
      setError(err.message || 'Lỗi khi tải đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('orders')
      .select('total_amount, created_at')
      .gte('created_at', startOfDay.toISOString());

    if (error) {
      console.error('Failed to fetch stats', error);
      return;
    }

    const todayOrders = data?.length || 0;
    const todayRevenue = data?.reduce((acc, o) => acc + (o.total_amount || 0), 0) || 0;
    setStats({ todayOrders, todayRevenue });
  };

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  }, [totalCount]);



  // Removed nextStatusFor and canCancel as we now allow full selection


  // canCancel function is removed as user wants ability to select any status


  const updateStatus = async (orderId: string, newStatus: string) => {
    // Optimistic Update: Update UI immediately
    const previousOrders = [...orders];
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      setUpdatingId(orderId);
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast.success(`Đã cập nhật trạng thái đơn ${orderId.slice(0, 8)}...`);
      await fetchStats();
    } catch (err: any) {
      // Revert if error
      setOrders(previousOrders);
      toast.error(err.message || 'Không thể cập nhật trạng thái');
    } finally {
      setUpdatingId(null);
    }
  };

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="rounded-2xl border border-border-color dark:border-border-dark bg-white dark:bg-surface-dark px-6 py-4 shadow-sm text-center">
          <p className="text-sm font-bold text-text-main dark:text-white">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      {/* Sidebar */}
      <aside className="fixed left-0 top-[65px] hidden h-[calc(100vh-65px)] w-64 border-r border-border-color bg-surface-light p-4 dark:border-border-dark dark:bg-surface-dark lg:block">
        <div className="mb-8 px-4">
          <span className="text-xs font-bold uppercase text-gray-400">Quản lý</span>
        </div>
        <nav className="space-y-1">
          {['Tổng quan', 'Đơn hàng', 'Sản phẩm', 'Khách hàng', 'Mã giảm giá', 'Cài đặt'].map((item, idx) => (
            <button
              key={item}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${idx === 1 ? 'bg-primary/20 text-primary' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'}`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {idx === 0 ? 'dashboard' : idx === 1 ? 'receipt_long' : idx === 2 ? 'inventory_2' : idx === 3 ? 'group' : idx === 4 ? 'local_offer' : 'settings'}
              </span>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 lg:ml-64">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-black text-text-main dark:text-white">Đơn hàng</h1>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">payments</span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs uppercase text-gray-500">Doanh thu hôm nay</span>
                <span className="text-xl font-black text-text-main dark:text-white">{stats.todayRevenue.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
            <div className="h-10 w-px bg-border-color dark:bg-border-dark mx-2 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              <div className="flex flex-col leading-tight">
                <span className="text-xs uppercase text-gray-500">Đơn hôm nay</span>
                <span className="text-xl font-black text-text-main dark:text-white">{stats.todayOrders}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            {(['all', 'pending', 'processing', 'completed', 'cancelled'] as const).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setStatusFilter(key as any);
                  setPage(1);
                }}
                className={`rounded-full px-4 py-2 text-sm font-bold border transition-colors ${statusFilter === key
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border-color text-text-main dark:text-white hover:border-primary/50'
                  }`}
              >
                {key === 'all' ? 'Tất cả' : STATUS_META[key].label}
              </button>
            ))}
          </div>
          <div className="flex w-full md:w-80 items-center rounded-lg h-10 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark px-3 focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-text-muted dark:text-text-secondary text-[20px]">search</span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-text-main dark:text-white text-sm placeholder:text-text-muted dark:placeholder:text-text-secondary ml-2 outline-none"
              placeholder="Tìm mã đơn, tên, email, sđt..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-2xl border border-border-color bg-surface-light p-6 dark:border-border-dark dark:bg-surface-dark overflow-x-auto">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Danh sách đơn hàng</h3>
            <span className="text-xs font-medium text-gray-500">Trang {page}/{totalPages}</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-6 text-red-500 font-bold">{error}</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-6 text-gray-500">Không có đơn hàng nào.</div>
          ) : (
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 dark:border-gray-800">
                  <th className="pb-3">Mã đơn</th>
                  <th className="pb-3">Khách hàng</th>
                  <th className="pb-3">PHƯƠNG THỨC</th>
                  <th className="pb-3">Tổng tiền</th>
                  <th className="pb-3">Ngày</th>
                  <th className="pb-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {orders.map((order) => {
                  const meta = STATUS_META[order.status] || {
                    label: order.status,
                    badge: 'bg-gray-100 text-gray-700 border border-gray-200',
                  };
                  const status = STATUS_META[order.status as keyof typeof STATUS_META] || STATUS_META.pending;

                  return (
                    <tr key={order.id} className="group border-b border-gray-50 last:border-0 dark:border-gray-800/50">
                      <td className="py-4 font-bold text-primary whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-text-main dark:text-white">#{order.id.slice(0, 8)}</span>
                          <span className={`inline-flex w-fit items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mt-1 ${status.badge}`}>
                            {status.label}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 font-medium text-text-main dark:text-white">
                        {order.customer_name || 'Khách lẻ'}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-gray-400 text-[18px]">
                            {order.payment_method === 'cod' ? 'attach_money' :
                              order.payment_method === 'qr' ? 'qr_code_scanner' :
                                order.payment_method === 'card' ? 'credit_card' : 'account_balance_wallet'}
                          </span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase">
                            {order.payment_method === 'cod' ? 'Tiền mặt' :
                              order.payment_method === 'qr' ? 'Chuyển khoản' :
                                order.payment_method === 'card' ? 'Thẻ tín dụng' : 'Ví điện tử'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 font-bold text-text-main dark:text-white">{order.total_amount.toLocaleString('vi-VN')}đ</td>
                      <td className="py-4 text-gray-500">{new Date(order.created_at).toLocaleString('vi-VN')}</td>
                      <td className="py-4 text-right">
                        <OrderActions
                          orderId={order.id}
                          currentStatus={order.status}
                          onUpdateStatus={(newStatus) => updateStatus(order.id, newStatus)}
                          isUpdating={updatingId === order.id}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between text-sm text-text-main dark:text-white">
            <span>Tổng {totalCount} đơn</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="px-3 py-1 rounded-lg border border-border-color dark:border-border-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <span className="px-2">Trang {page} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="px-3 py-1 rounded-lg border border-border-color dark:border-border-dark disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
