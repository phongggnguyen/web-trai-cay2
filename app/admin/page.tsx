'use client';

import React from 'react';
import Link from 'next/link';

// Mock Data
const STATS = [
  {
    label: 'Tổng doanh thu',
    value: '15.200.000đ',
    change: '+12.5%',
    trend: 'up',
    icon: 'payments',
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    label: 'Đơn hàng mới',
    value: '24',
    change: '+4',
    trend: 'up',
    icon: 'shopping_cart',
    color: 'text-blue-600',
    bg: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    label: 'Khách hàng mới',
    value: '12',
    change: '-2',
    trend: 'down',
    icon: 'group_add',
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    label: 'Cảnh báo tồn kho',
    value: '3',
    change: 'Sắp hết',
    trend: 'neutral',
    icon: 'inventory_2',
    color: 'text-orange-600',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
  },
];

const ORDER_STATUS_DISTRIBUTION = [
  { label: 'Chờ xác nhận', count: 10, color: '#f59e0b', percentage: 20 }, // amber-500
  { label: 'Đang xử lý', count: 5, color: '#3b82f6', percentage: 15 }, // blue-500
  { label: 'Đã giao hàng', count: 25, color: '#22c55e', percentage: 55 }, // green-500
  { label: 'Đã hủy', count: 5, color: '#ef4444', percentage: 10 }, // red-500
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-text-main dark:text-white">Tổng quan</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Chào mừng trở lại, Admin!</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Hôm nay: {new Date().toLocaleDateString('vi-VN')}</span>
          <button className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-bold shadow-sm ring-1 ring-gray-200 transition-hover hover:bg-gray-50 dark:bg-surface-dark dark:ring-gray-800 dark:hover:bg-white/5">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            Tùy chọn
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-2xl border border-border-color bg-white p-6 transition-all hover:shadow-lg dark:border-border-dark dark:bg-surface-dark">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
                <h3 className="mt-2 text-2xl font-black text-text-main dark:text-white">{stat.value}</h3>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold">
              <span className={`flex items-center gap-0.5 ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-orange-500'}`}>
                <span className="material-symbols-outlined text-[14px]">
                  {stat.trend === 'up' ? 'trending_up' : stat.trend === 'down' ? 'trending_down' : 'remove'}
                </span>
                {stat.change}
              </span>
              <span className="text-gray-400 font-normal">so với hôm qua</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart Section (Placeholder) */}
        <div className="rounded-2xl border border-border-color bg-white p-6 shadow-sm dark:border-border-dark dark:bg-surface-dark lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Biểu đồ doanh thu</h3>
            <select className="rounded-lg border-none bg-gray-50 px-3 py-1 text-xs font-bold text-gray-600 outline-none hover:bg-gray-100 dark:bg-white/5 dark:text-gray-300">
              <option>7 ngày qua</option>
              <option>Tháng này</option>
              <option>Năm nay</option>
            </select>
          </div>
          {/* Chart Placeholder Area */}
          <div className="flex h-64 items-end justify-between gap-2 px-2">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="group relative w-full rounded-t-xl bg-primary/10 transition-all hover:bg-primary/20">
                <div
                  className="absolute bottom-0 w-full rounded-t-xl bg-primary transition-all duration-500 group-hover:opacity-80"
                  style={{ height: `${h}%` }}
                />
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-400">
                  T{i + 2}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution (Donut Chart) */}
        <div className="rounded-2xl border border-border-color bg-white p-6 shadow-sm dark:border-border-dark dark:bg-surface-dark">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Trạng thái đơn hàng</h3>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            {/* CSS Conic Gradient Donut Chart */}
            <div
              className="relative flex h-48 w-48 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(
                  ${ORDER_STATUS_DISTRIBUTION[0].color} 0% 20%, 
                  ${ORDER_STATUS_DISTRIBUTION[1].color} 20% 35%, 
                  ${ORDER_STATUS_DISTRIBUTION[2].color} 35% 90%, 
                  ${ORDER_STATUS_DISTRIBUTION[3].color} 90% 100%
                )`
              }}
            >
              {/* Inner Circle covering center to make it a donut */}
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white dark:bg-surface-dark">
                <span className="text-3xl font-black text-text-main dark:text-white">45</span>
                <span className="text-xs font-medium text-gray-500">Tổng đơn</span>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 w-full space-y-3">
              {ORDER_STATUS_DISTRIBUTION.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
                  </div>
                  <span className="font-bold text-text-main dark:text-white">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions (Optional) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Thêm sản phẩm', icon: 'add_box', color: 'text-blue-600', link: '/admin/products/new' },
          { label: 'Tạo mã giảm giá', icon: 'local_offer', color: 'text-pink-600', link: '/admin/vouchers' },
          { label: 'Xem đơn hàng', icon: 'receipt_long', color: 'text-orange-600', link: '/admin/orders' },
          { label: 'Cấu hình', icon: 'settings', color: 'text-gray-600', link: '/admin/settings' },
        ].map((action, i) => (
          <Link key={i} href={action.link} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 font-bold text-text-main transition-all hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-surface-dark dark:text-white">
            <span className={`material-symbols-outlined ${action.color}`}>{action.icon}</span>
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
