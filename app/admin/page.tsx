'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useDashboardData } from './hooks/useDashboardData';
import { StatCard } from './_components/StatCard';
import { RevenueChart } from './_components/RevenueChart';
import { OrderStatusDonut } from './_components/OrderStatusDonut';

export default function AdminDashboardPage() {
  const { loading, error, stats, distribution, chartData } = useDashboardData();

  // Memoize dashboard stats to prevent re-computation
  const dashboardStats = useMemo(() => [
    {
      label: 'Tổng doanh thu',
      value: stats.revenue.toLocaleString('vi-VN') + 'đ',
      change: 'Tổng tích lũy',
      trend: 'up' as const,
      icon: 'payments',
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      label: 'Đơn hàng mới',
      value: stats.newOrders,
      change: 'Hôm nay',
      trend: 'neutral' as const,
      icon: 'shopping_cart',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      label: 'Khách hàng',
      value: stats.customers,
      change: 'Đã mua hàng',
      trend: 'up' as const,
      icon: 'group_add',
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      label: 'Cảnh báo tồn kho',
      value: stats.lowStock,
      change: 'Sản phẩm < 10',
      trend: (stats.lowStock > 0 ? 'down' : 'up') as const,
      icon: 'inventory_2',
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/20',
    },
  ], [stats]);

  const quickActions = [
    { label: 'Thêm sản phẩm', icon: 'add_box', color: 'text-blue-600', link: '/admin/products/new' },
    { label: 'Tạo mã giảm giá', icon: 'local_offer', color: 'text-pink-600', link: '/admin/vouchers' },
    { label: 'Xem đơn hàng', icon: 'receipt_long', color: 'text-orange-600', link: '/admin/orders' },
    { label: 'Cấu hình', icon: 'settings', color: 'text-gray-600', link: '/admin/settings' },
  ];

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-800 dark:bg-red-900/20">
        <span className="material-symbols-outlined text-6xl text-red-500">error</span>
        <h2 className="text-xl font-bold text-red-700 dark:text-red-400">Không thể tải dữ liệu</h2>
        <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-bold text-white transition-colors hover:bg-red-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-main dark:text-white">Tổng quan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Chào mừng trở lại, Admin!</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Hôm nay: {new Date().toLocaleDateString('vi-VN')}
          </span>
          <button className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold shadow-sm ring-1 ring-gray-200 transition-hover hover:bg-gray-50 dark:bg-surface-dark dark:ring-gray-800 dark:hover:bg-white/5">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Tùy chọn
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <RevenueChart data={chartData} />
            <OrderStatusDonut distribution={distribution} totalOrders={stats.totalOrders} />
          </div>
        </>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickActions.map((action, i) => (
          <Link
            key={i}
            href={action.link}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 font-bold text-text-main transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-surface-dark dark:text-white"
          >
            <span className={`material-symbols-outlined ${action.color}`}>{action.icon}</span>
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
