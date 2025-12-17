'use client';

import React, { useState } from 'react';

// Mock Data
const CUSTOMERS = [
    {
        id: 'KH-8823',
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@gmail.com',
        phone: '0909 123 456',
        avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random',
        type: 'VIP Gold',
        joinDate: '3 tháng trước',
        spent: '15.400.000đ',
        spentAmount: 15400000,
        orders: 15,
        avgValue: '~1.020k',
        lastOrder: 'Hôm nay',
        address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        history: [
            { id: '#DH-10239', date: '20/10/2023', product: 'Dưa lưới Hoàng Kim + 3 khác', status: 'Đang xử lý', total: '1.250.000đ' },
            { id: '#DH-09921', date: '15/10/2023', product: 'Nho Mẫu Đơn Hàn Quốc', status: 'Hoàn thành', total: '2.100.000đ' },
            { id: '#DH-08812', date: '01/10/2023', product: 'Táo Envy Mỹ (Size lớn)', status: 'Hoàn thành', total: '850.000đ' },
            { id: '#DH-08100', date: '25/09/2023', product: 'Cam Úc Navel + 2 khác', status: 'Đã hủy', total: '560.000đ' },
        ]
    },
    {
        id: 'KH-8824',
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        phone: '0912 345 678',
        avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=random',
        type: 'Khách mới',
        joinDate: '2 giờ trước',
        spent: '0đ',
        spentAmount: 0,
        orders: 0,
        avgValue: '0đ',
        lastOrder: '-',
        address: '456 Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
        history: []
    },
    {
        id: 'KH-8825',
        name: 'Lê Văn C',
        email: 'levanc@company.com',
        phone: '0987 654 321',
        avatar: 'https://ui-avatars.com/api/?name=Le+Van+C&background=random',
        type: 'Thành viên',
        joinDate: '1 ngày trước',
        spent: '2.500.000đ',
        spentAmount: 2500000,
        orders: 2,
        avgValue: '1.250k',
        lastOrder: 'Hôm qua',
        address: '789 Điện Biên Phủ, Bình Thạnh, TP. Hồ Chí Minh',
        history: [
            { id: '#DH-07554', date: '10/09/2023', product: 'Dâu Tây Hàn Quốc', status: 'Hoàn thành', total: '1.800.000đ' },
        ]
    },
    {
        id: 'KH-8826',
        name: 'Hoàng Thị E',
        email: 'hoangthie@mail.com',
        phone: '0966 555 444',
        avatar: 'https://ui-avatars.com/api/?name=Hoang+Thi+E&background=random',
        type: 'Thân thiết',
        joinDate: '1 tuần trước',
        spent: '5.600.000đ',
        spentAmount: 5600000,
        orders: 5,
        avgValue: '1.120k',
        lastOrder: '3 ngày trước',
        address: '101 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh',
        history: []
    }
];

export default function AdminCustomersPage() {
    const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMode, setFilterMode] = useState('all'); // 'all', 'vip', 'spending'
    const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

    // Logic filter & sort based on 'filterMode'
    const filteredCustomers = CUSTOMERS.filter(c => {
        // 1. Text Search
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;

        // 2. Button Filter
        if (filterMode === 'vip') return c.type.includes('VIP');

        return true; // 'all' and 'spending' show all results
    }).sort((a, b) => {
        // 3. Sorting
        if (filterMode === 'spending') {
            return b.spentAmount - a.spentAmount; // Highest spending first
        }
        return 0; // Default: 'all' and 'vip' keep mock data order (presumed newest first)
    });

    const handleCustomerClick = (customer: any) => {
        setSelectedCustomer(customer);
        setIsMobileDetailOpen(true);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            {/* Header & Search */}
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shrink-0 ${isMobileDetailOpen ? 'hidden xl:flex' : 'flex'}`}>
                <div>
                    <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">Quản lý khách hàng</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Danh sách thông tin và lịch sử mua hàng</p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-64 md:w-80">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm khách hàng, SĐT..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-surface-dark text-text-main dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Filter Buttons (Tabs) */}
            <div className={`flex gap-3 flex-wrap mb-6 ${isMobileDetailOpen ? 'hidden xl:flex' : 'flex'}`}>
                {[
                    { id: 'all', label: 'Tất cả (Mới nhất)' },
                    { id: 'vip', label: 'Chỉ khách VIP' },
                    { id: 'spending', label: 'Top Chi tiêu' }
                ].map(mode => (
                    <button
                        key={mode.id}
                        onClick={() => setFilterMode(mode.id)}
                        className={`h-9 px-4 rounded-xl text-sm font-bold border transition-all ${filterMode === mode.id
                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                                : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                            }`}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            {/* Master-Detail Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0 flex-1 overflow-hidden">

                {/* Left Column: Customer List */}
                <div className={`xl:col-span-4 bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark flex-col overflow-hidden h-full shadow-sm ${isMobileDetailOpen ? 'hidden xl:flex' : 'flex'}`}>
                    <div className="p-4 border-b border-gray-100 dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                        <span className="text-sm font-bold text-text-main dark:text-white uppercase tracking-wider">Danh sách ({filteredCustomers.length})</span>
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">group</span>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                        {filteredCustomers.map((customer, idx) => (
                            <div
                                key={customer.id}
                                onClick={() => handleCustomerClick(customer)}
                                className={`p-3 rounded-xl cursor-pointer flex items-center gap-4 group transition-all ${selectedCustomer.id === customer.id
                                        ? 'bg-primary/10 border border-primary/20'
                                        : 'hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent'
                                    }`}
                            >
                                {/* Rank Number for Spending Mode */}
                                {filterMode === 'spending' && (
                                    <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${idx === 0 ? 'bg-yellow-400 text-yellow-900' :
                                            idx === 1 ? 'bg-gray-300 text-gray-800' :
                                                idx === 2 ? 'bg-orange-300 text-orange-900' : 'bg-gray-100 dark:bg-white/10 text-gray-500'
                                        }`}>
                                        {idx + 1}
                                    </div>
                                )}

                                <div className="relative">
                                    <img src={customer.avatar} alt={customer.name} className="w-12 h-12 rounded-full object-cover" />
                                    {selectedCustomer.id === customer.id && (
                                        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-surface-dark rounded-full p-0.5">
                                            <div className="w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-surface-dark"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h4 className={`font-bold text-sm truncate ${selectedCustomer.id === customer.id ? 'text-text-main dark:text-white' : 'text-text-main dark:text-gray-200'}`}>
                                            {customer.name}
                                        </h4>
                                        {filterMode === 'spending' ? (
                                            <span className="text-xs font-bold text-primary">{customer.spent}</span>
                                        ) : (
                                            <span className="text-[10px] text-gray-400 font-medium">{customer.joinDate}</span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{customer.email}</p>
                                </div>
                                <span className="material-symbols-outlined text-gray-300 group-hover:text-primary text-[20px] transition-colors">chevron_right</span>
                            </div>
                        ))}

                        {filteredCustomers.length === 0 && (
                            <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-[40px] opacity-20">search_off</span>
                                <span>Không tìm thấy khách hàng nào</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Detail View */}
                <div className={`xl:col-span-8 flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-1 pb-1 ${isMobileDetailOpen ? 'flex' : 'hidden xl:flex'}`}>

                    {/* Mobile Back Button */}
                    <div className="flex xl:hidden items-center gap-2 mb-2">
                        <button
                            onClick={() => setIsMobileDetailOpen(false)}
                            className="p-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                        </button>
                        <span className="font-bold text-text-main dark:text-white">Quay lại danh sách</span>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="shrink-0">
                                <img
                                    src={selectedCustomer.avatar}
                                    alt={selectedCustomer.name}
                                    className="w-24 h-24 rounded-2xl border-2 border-gray-100 dark:border-border-dark shadow-lg object-cover"
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-start w-full">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-2xl font-black text-text-main dark:text-white">{selectedCustomer.name}</h3>
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${selectedCustomer.type.includes('VIP')
                                                    ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                    : 'bg-green-100 text-green-700 border-green-200'
                                                }`}>
                                                {selectedCustomer.type}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">ID: {selectedCustomer.id}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="w-9 h-9 rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">chat</span>
                                        </button>
                                        <button className="w-9 h-9 rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">mail</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-gray-400 text-xs">Email</p>
                                            <p className="text-text-main dark:text-white text-sm font-medium truncate">{selectedCustomer.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">call</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-gray-400 text-xs">Số điện thoại</p>
                                            <p className="text-text-main dark:text-white text-sm font-medium">{selectedCustomer.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 sm:col-span-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 shrink-0">
                                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-gray-400 text-xs">Địa chỉ</p>
                                            <p className="text-text-main dark:text-white text-sm font-medium">{selectedCustomer.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-border-dark">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">Tổng chi tiêu</p>
                                <p className="text-primary text-xl font-black">{selectedCustomer.spent}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">Số đơn hàng</p>
                                <p className="text-text-main dark:text-white text-xl font-bold">{selectedCustomer.orders} đơn</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">Giá trị TB/Đơn</p>
                                <p className="text-text-main dark:text-white text-xl font-bold">{selectedCustomer.avgValue}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-xs font-bold mb-1">Đơn gần nhất</p>
                                <p className="text-text-main dark:text-white text-xl font-bold">{selectedCustomer.lastOrder}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order History Table */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-200 dark:border-border-dark flex-1 flex flex-col min-h-[400px] shadow-sm">
                        <div className="p-6 pb-2 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-text-main dark:text-white">Lịch sử đơn hàng</h3>
                            <a className="text-sm text-primary font-bold hover:underline cursor-pointer">Xem tất cả</a>
                        </div>
                        <div className="p-4 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-border-dark text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                                        <th className="px-4 py-3 font-bold">Mã đơn</th>
                                        <th className="px-4 py-3 font-bold">Ngày đặt</th>
                                        <th className="px-4 py-3 font-bold hidden sm:table-cell">Sản phẩm</th>
                                        <th className="px-4 py-3 font-bold">Trạng thái</th>
                                        <th className="px-4 py-3 font-bold text-right">Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {selectedCustomer.history.length > 0 ? selectedCustomer.history.map((order, idx) => (
                                        <tr key={idx} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-50 dark:border-border-dark/50 last:border-0">
                                            <td className="px-4 py-4 font-bold text-primary">{order.id}</td>
                                            <td className="px-4 py-4 text-text-main dark:text-gray-400">{order.date}</td>
                                            <td className="px-4 py-4 text-text-main dark:text-white hidden sm:table-cell">{order.product}</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${order.status === 'Hoàn thành' ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                                        order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                                            'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'Hoàn thành' ? 'bg-green-600' :
                                                            order.status === 'Đang xử lý' ? 'bg-yellow-600' :
                                                                'bg-red-600'
                                                        }`}></span>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right font-bold text-text-main dark:text-white">{order.total}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">Chưa có đơn hàng nào</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
