'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ todayOrders: 0, todayRevenue: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

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

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-black text-text-main dark:text-white">Tổng quan</h1>
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

      <div className="rounded-2xl border border-border-color bg-white px-6 py-12 text-center dark:border-border-dark dark:bg-surface-dark">
        <p className="text-gray-500">Chào mừng trở lại trang quản trị!</p>
      </div>
    </div>
  );
}
