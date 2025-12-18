'use client';

import React, { useState } from 'react';

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [isLoading, setIsLoading] = useState(false);

    // Mock State for Settings
    const [generalSettings, setGeneralSettings] = useState({
        storeName: 'Fresh Fruit Market',
        slogan: 'Trái cây tươi ngon mỗi ngày',
        email: 'contact@freshfruit.com',
        phone: '0909 123 456',
        address: '123 Đường Lê Lợi, Quận 1, TP.HCM'
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        newOrder: true,
        lowStock: true,
        marketing: false
    });

    const handleSave = () => {
        setIsLoading(true);
        // Mock API Call
        setTimeout(() => {
            setIsLoading(false);
            // Show success message (In a real app, use toast)
            alert('Đã lưu cài đặt thành công!');
        }, 1000);
    };

    const tabs = [
        { id: 'general', label: 'Chung', icon: 'store' },
        { id: 'account', label: 'Tài khoản', icon: 'person' },
        { id: 'notifications', label: 'Thông báo', icon: 'notifications' },
        { id: 'appearance', label: 'Giao diện', icon: 'palette' },
    ];

    return (
        <div className="max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">Cài đặt hệ thống</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Quản lý cấu hình cửa hàng và tài khoản của bạn</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                    {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                        <span className="material-symbols-outlined text-[20px]">save</span>
                    )}
                    Lưu thay đổi
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-2 shadow-sm sticky top-24">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all mb-1 ${activeTab === tab.id
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-text-main dark:hover:text-white'
                                    }`}
                            >
                                <span className="material-symbols-outlined">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Tab: General */}
                    {activeTab === 'general' && (
                        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm animate-fade-in">
                            <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">Thông tin cửa hàng</h3>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex items-center gap-6 pb-6 border-b border-gray-100 dark:border-border-dark">
                                    <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                                        <span className="material-symbols-outlined text-gray-400 text-[32px]">storefront</span>
                                        <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs font-bold">
                                            Upload
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-main dark:text-white">Logo cửa hàng</h4>
                                        <p className="text-sm text-gray-400 mt-1">Khuyên dùng ảnh vuông, tối đa 2MB</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tên cửa hàng</label>
                                    <input
                                        type="text"
                                        value={generalSettings.storeName}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, storeName: e.target.value })}
                                        className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Slogan</label>
                                    <input
                                        type="text"
                                        value={generalSettings.slogan}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, slogan: e.target.value })}
                                        className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email liên hệ</label>
                                        <input
                                            type="email"
                                            value={generalSettings.email}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                                            className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Hotline</label>
                                        <input
                                            type="text"
                                            value={generalSettings.phone}
                                            onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                                            className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Địa chỉ kho hàng</label>
                                    <input
                                        type="text"
                                        value={generalSettings.address}
                                        onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                                        className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab: Account */}
                    {activeTab === 'account' && (
                        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm animate-fade-in">
                            <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">Hồ sơ của tôi</h3>

                            <div className="flex items-start gap-6 mb-8">
                                <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-white/5 border-2 border-white dark:border-gray-700 shadow-lg overflow-hidden shrink-0">
                                    <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff" alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div className="pt-2">
                                    <h4 className="text-xl font-bold text-text-main dark:text-white">Admin User</h4>
                                    <p className="text-gray-500 dark:text-gray-400">Super Administrator</p>
                                    <button className="mt-2 text-sm text-primary font-bold hover:underline">Thay đổi Avatar</button>
                                </div>
                            </div>

                            <div className="space-y-6 max-w-lg">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-border-dark pb-2">Đổi mật khẩu</h4>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mật khẩu hiện tại</label>
                                    <input type="password" placeholder="••••••••" className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Mật khẩu mới</label>
                                    <input type="password" placeholder="••••••••" className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nhập lại mật khẩu mới</label>
                                    <input type="password" placeholder="••••••••" className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab: Notifications */}
                    {activeTab === 'notifications' && (
                        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm animate-fade-in">
                            <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">Cấu hình thông báo</h3>

                            <div className="space-y-6">
                                {[
                                    { key: 'emailAlerts', label: 'Thông báo qua Email', desc: 'Nhận email tổng hợp báo cáo hàng ngày' },
                                    { key: 'newOrder', label: 'Đơn hàng mới', desc: 'Thông báo ngay lập tức khi có khách đặt hàng' },
                                    { key: 'lowStock', label: 'Cảnh báo kho hàng', desc: 'Thông báo khi sản phẩm sắp hết hàng (< 10)' },
                                    { key: 'marketing', label: 'Tin tức & Cập nhật', desc: 'Nhận thông tin về tính năng mới từ hệ thống' },
                                ].map((item: any) => (
                                    <div key={item.key} className="flex justify-between items-center py-2">
                                        <div>
                                            <h4 className="font-bold text-text-main dark:text-white">{item.label}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={(notifications as any)[item.key]}
                                                onChange={() => setNotifications({ ...notifications, [item.key]: !(notifications as any)[item.key] })}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tab: Appearance */}
                    {activeTab === 'appearance' && (
                        <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm animate-fade-in">
                            <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">Giao diện</h3>

                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-bold text-text-main dark:text-white mb-4">Chủ đề (Theme)</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['light', 'dark', 'system'].map(theme => (
                                            <div key={theme} className="cursor-pointer group">
                                                <div className="aspect-video rounded-xl bg-gray-100 dark:bg-white/5 border-2 border-transparent group-hover:border-primary transition-all relative overflow-hidden">
                                                    {/* Fake UI Preview */}
                                                    <div className="absolute top-2 left-2 right-2 h-2 bg-gray-300 dark:bg-gray-600 rounded opacity-50"></div>
                                                    <div className="absolute top-6 left-2 w-1/4 h-20 bg-gray-300 dark:bg-gray-600 rounded opacity-50"></div>
                                                    <div className="absolute top-6 right-2 w-2/3 h-20 bg-gray-300 dark:bg-gray-600 rounded opacity-50"></div>
                                                </div>
                                                <p className="text-center text-sm font-bold mt-2 capitalize text-gray-600 dark:text-gray-400 group-hover:text-primary">{theme}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Ngôn ngữ</label>
                                    <select className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                                        <option>Tiếng Việt</option>
                                        <option>English</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
