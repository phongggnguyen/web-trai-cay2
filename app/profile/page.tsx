'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useGlobal } from '../../context/GlobalContext';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { user, logout } = useGlobal();
    const [activeTab, setActiveTab] = useState<'info' | 'orders'>('orders');
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Profile Form State
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (user) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchOrders(), fetchProfile()]);
        setLoading(false);
    };

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*, order_items(*)')
                .eq('user_id', user!.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const fetchProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user!.id)
                .single();

            if (error && error.code !== 'PGRST116') { // Ignore not found error
                console.error('Error fetching profile:', error);
            }

            if (data) {
                setProfile(data);
                setFullName(data.full_name || '');
                setPhone(data.phone_number || '');
                setAddress(data.address || '');
            } else {
                setFullName(user?.user_metadata?.full_name || '');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const updates = {
                id: user!.id,
                full_name: fullName,
                phone_number: phone,
                address: address,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);
            if (error) throw error;

            toast.success('Cập nhật thông tin thành công!');
            setProfile(updates);
        } catch (error: any) {
            toast.error('Lỗi cập nhật: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h2 className="text-2xl font-bold">Vui lòng đăng nhập</h2>
                <Link href="/login" className="text-primary hover:underline">Đăng nhập để xem thông tin</Link>
            </div>
        );
    }

    return (
        <div className="layout-container flex h-full grow flex-col bg-background-light dark:bg-background-dark min-h-screen transition-colors duration-200">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
                {/* Side Navigation (Left Sidebar) */}
                <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
                    <div className="flex gap-4 items-center p-4 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-border-dark shadow-sm">
                        <div className="size-14 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                            {user.user_metadata?.avatar_url ? (
                                <img src={user.user_metadata.avatar_url} alt="Ava" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                                    {fullName?.[0] || user.email?.[0]}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <h1 className="text-text-main dark:text-white text-base font-bold truncate">{fullName || 'Khách hàng'}</h1>
                            <p className="text-text-muted dark:text-text-secondary text-sm font-normal truncate">{user.email}</p>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group text-left ${activeTab === 'info' ? 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-border-dark shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-border-dark'}`}
                        >
                            <span className={`material-symbols-outlined ${activeTab === 'info' ? 'text-primary' : 'text-gray-500 dark:text-text-secondary group-hover:text-primary'}`}>person</span>
                            <p className={`text-sm font-medium ${activeTab === 'info' ? 'font-bold text-primary' : 'text-text-main dark:text-white'}`}>Hồ sơ cá nhân</p>
                        </button>

                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group text-left ${activeTab === 'orders' ? 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-border-dark shadow-sm' : 'hover:bg-gray-100 dark:hover:bg-border-dark'}`}
                        >
                            <span className={`material-symbols-outlined ${activeTab === 'orders' ? 'text-primary' : 'text-gray-500 dark:text-text-secondary group-hover:text-primary'}`}>receipt_long</span>
                            <p className={`text-sm font-medium ${activeTab === 'orders' ? 'font-bold text-primary' : 'text-text-main dark:text-white'}`}>Lịch sử đơn hàng</p>
                        </button>

                        <button
                            onClick={logout}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group mt-4 border-t border-gray-200 dark:border-border-dark pt-6 w-full text-left"
                        >
                            <span className="material-symbols-outlined text-red-500">logout</span>
                            <p className="text-sm font-medium text-red-500">Đăng xuất</p>
                        </button>
                    </nav>
                </aside>

                {/* Main Content (Right Side) */}
                <main className="flex-1 flex flex-col gap-6 min-w-0">

                    {/* INFO TAB */}
                    {activeTab === 'info' && (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Hồ sơ cá nhân</h1>
                                <p className="text-text-muted dark:text-text-secondary text-base font-normal">Quản lý thông tin tài khoản và địa chỉ giao hàng.</p>
                            </div>

                            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-border-dark p-6 md:p-8">
                                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-2xl">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">Họ và tên</label>
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full h-12 rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-background-dark px-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                                                placeholder="Nhập họ tên"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">Số điện thoại</label>
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full h-12 rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-background-dark px-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                                                placeholder="Nhập số điện thoại"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-sm font-bold text-text-main dark:text-white">Địa chỉ giao hàng mặc định</label>
                                            <textarea
                                                rows={3}
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="w-full rounded-lg border border-gray-200 dark:border-border-dark bg-gray-50 dark:bg-background-dark p-4 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all dark:text-white"
                                                placeholder="Nhập địa chỉ đầy đủ (Số nhà, đường, phường/xã...)"
                                            />
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className="px-8 py-3 bg-primary text-[#0d160b] font-bold rounded-lg shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="flex flex-col gap-6">
                            {/* Page Heading */}
                            <div className="flex flex-col gap-2">
                                <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Lịch sử đơn hàng</h1>
                                <p className="text-text-muted dark:text-text-secondary text-base font-normal">Nghiệp tụ vành môi - Ăn vô trôi hết.</p>
                            </div>

                            {/* Filter Chips */}
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-background-dark font-bold px-5 transition-transform hover:scale-105 shadow-lg shadow-primary/25">
                                    Tất cả
                                </button>
                                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-text-main dark:text-white hover:border-primary hover:text-primary font-medium px-5 transition-all">
                                    Đang xử lý
                                </button>
                                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-text-main dark:text-white hover:border-primary hover:text-primary font-medium px-5 transition-all">
                                    Đang giao
                                </button>
                                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark text-text-main dark:text-white hover:border-primary hover:text-primary font-medium px-5 transition-all">
                                    Đã hoàn thành
                                </button>
                            </div>

                            {/* Search */}
                            <div className="flex w-full md:w-2/3 lg:w-1/2">
                                <div className="flex w-full items-center rounded-lg h-10 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark px-3 focus-within:border-primary transition-colors">
                                    <span className="material-symbols-outlined text-text-muted dark:text-text-secondary text-[20px]">filter_list</span>
                                    <input className="w-full bg-transparent border-none focus:ring-0 text-text-main dark:text-white text-sm placeholder:text-text-muted dark:placeholder:text-text-secondary ml-2 outline-none" placeholder="Tìm theo mã đơn hàng..." />
                                </div>
                            </div>

                            {/* Order List */}
                            <div className="flex flex-col gap-4 mt-2">
                                {loading && (
                                    <div className="flex justify-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
                                    </div>
                                )}

                                {!loading && orders.length === 0 && (
                                    <div className="text-center py-12 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark">
                                        <p className="text-gray-500 mb-4">Bạn chưa có đơn hàng nào.</p>
                                        <Link href="/products" className="text-primary font-bold hover:underline">Đặt hàng ngay</Link>
                                    </div>
                                )}

                                {orders.map((order) => (
                                    <div key={order.id} className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark p-5 transition-colors hover:border-primary/50 group shadow-sm">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-border-dark pb-4 border-dashed">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-primary/10 p-1.5 rounded text-primary flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                                                    </div>
                                                    <span className="text-text-main dark:text-white text-lg font-bold tracking-tight">#{order.id.slice(0, 8).toUpperCase()}</span>
                                                </div>
                                                <span className="text-text-muted dark:text-text-secondary text-sm pl-10">{new Date(order.created_at).toLocaleString('vi-VN')}</span>
                                            </div>
                                            <div className="flex items-center gap-2 md:self-center self-start pl-10 md:pl-0">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide flex items-center gap-1 ${order.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                                            'bg-gray-100 text-gray-700 border-gray-200'
                                                    }`}>
                                                    {order.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>}
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
                                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                                {/* Show up to 2 images */}
                                                {order.order_items.slice(0, 2).map((item: any) => (
                                                    <div key={item.id} className="size-16 rounded-lg bg-cover bg-center border border-gray-200 dark:border-border-dark shrink-0" style={{ backgroundImage: `url(${item.product_image || 'https://placehold.co/100'})` }}></div>
                                                ))}
                                                {order.order_items.length > 2 && (
                                                    <div className="flex items-center justify-center size-16 rounded-lg bg-gray-50 dark:bg-border-dark text-text-main dark:text-white text-xs font-bold shrink-0 border border-gray-200 dark:border-border-dark/50">
                                                        +{order.order_items.length - 2}
                                                    </div>
                                                )}

                                                <div className="flex flex-col justify-center">
                                                    <p className="text-text-main dark:text-white text-sm font-medium line-clamp-1">{order.order_items[0]?.product_name} {order.order_items.length > 1 && '...'}</p>
                                                    <p className="text-text-muted dark:text-text-secondary text-xs">{order.order_items.length} sản phẩm</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-row sm:flex-col justify-between sm:justify-center w-full sm:w-auto items-center sm:items-end gap-1">
                                                <span className="text-text-muted dark:text-text-secondary text-xs font-medium uppercase tracking-wider">Tổng tiền</span>
                                                <span className="text-primary text-xl font-bold">{order.total_amount.toLocaleString('vi-VN')}đ</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-end gap-3 pt-2">
                                            <Link href={`/order-success?id=${order.id}`} className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-gray-200 dark:border-border-dark text-text-main dark:text-white text-sm font-bold hover:bg-gray-50 dark:hover:bg-border-dark transition-colors flex items-center justify-center gap-2">
                                                Chi tiết
                                            </Link>
                                            <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-primary text-[#0d160b] text-sm font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(76,223,32,0.2)]">
                                                <span className="material-symbols-outlined text-[18px]">replay</span>
                                                Mua lại
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
