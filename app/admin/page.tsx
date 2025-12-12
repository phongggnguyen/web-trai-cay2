import React from 'react';

export default function AdminPage() {
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
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${idx === 0 ? 'bg-primary/20 text-primary' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'}`}
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-black text-text-main dark:text-white">Tổng Quan Hôm Nay</h1>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-text-main shadow-lg shadow-primary/20 hover:bg-primary-dark">
            + Thêm sản phẩm
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Doanh thu', val: '12.5M', change: '+15%', icon: 'payments', color: 'bg-green-500' },
            { label: 'Đơn hàng', val: '48', change: '+5%', icon: 'shopping_bag', color: 'bg-blue-500' },
            { label: 'Khách mới', val: '12', change: '-2%', icon: 'person_add', color: 'bg-purple-500' },
            { label: 'Tồn kho', val: '150kg', change: 'Ổn định', icon: 'inventory', color: 'bg-orange-500' },
          ].map((stat, idx) => (
            <div key={idx} className="rounded-2xl border border-border-color bg-surface-light p-5 dark:border-border-dark dark:bg-surface-dark">
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${stat.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                </div>
                <span className={`text-xs font-bold ${stat.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>{stat.change}</span>
              </div>
              <h3 className="text-2xl font-black text-text-main dark:text-white">{stat.val}</h3>
              <p className="text-xs font-bold text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders Table */}
        <div className="rounded-2xl border border-border-color bg-surface-light p-6 dark:border-border-dark dark:bg-surface-dark overflow-x-auto">
          <h3 className="mb-4 text-lg font-bold text-text-main dark:text-white">Đơn hàng mới nhất</h3>
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-400 dark:border-gray-800">
                <th className="pb-3">Mã đơn</th>
                <th className="pb-3">Khách hàng</th>
                <th className="pb-3">Trạng thái</th>
                <th className="pb-3">Tổng tiền</th>
                <th className="pb-3">Ngày</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: '#ORD-001', customer: 'Nguyễn Văn A', status: 'Đang giao', total: '1.250.000đ', date: '10:30 AM' },
                { id: '#ORD-002', customer: 'Trần Thị B', status: 'Hoàn thành', total: '450.000đ', date: '09:15 AM' },
                { id: '#ORD-003', customer: 'Lê Văn C', status: 'Chờ xử lý', total: '2.100.000đ', date: '09:00 AM' },
                { id: '#ORD-004', customer: 'Phạm Thị D', status: 'Đang giao', total: '850.000đ', date: 'Yesterday' },
              ].map((order, idx) => (
                <tr key={idx} className="group border-b border-gray-50 last:border-0 dark:border-gray-800/50">
                  <td className="py-4 font-bold text-primary">{order.id}</td>
                  <td className="py-4 font-medium text-text-main dark:text-white">{order.customer}</td>
                  <td className="py-4">
                    <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                      order.status === 'Hoàn thành' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                      order.status === 'Đang giao' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-text-main dark:text-white">{order.total}</td>
                  <td className="py-4 text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}