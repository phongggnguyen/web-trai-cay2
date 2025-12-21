'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AdminOrderDetailPage() {
    const params = useParams();
    const orderId = params.id as string;

    // Mock Data inspired by the template
    const order = {
        id: orderId || 'ORD-2023-001',
        date: '10:30 AM, 24/10/2023',
        status: 'processing', // placed, confirmed, processing, shipping, delivered
        customer: {
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@gmail.com',
            phone: '+84 909 123 456',
            avatar_color: 'from-green-400 to-blue-500'
        },
        address: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
        payment: {
            method: 'Thẻ tín dụng',
            card_last4: '4242',
            status: 'ĐÃ THANH TOÁN'
        },
        items: [
            {
                id: 1,
                name: 'Táo Envy Mỹ',
                desc: 'Size lớn, giòn ngọt',
                image: 'https://images.unsplash.com/photo-1619546813926-a78faf63030c?q=80&w=250&auto=format&fit=crop',
                price: 250000,
                quantity: 1,
                unit: 'kg'
            },
            {
                id: 2,
                name: 'Nho Mẫu Đơn',
                desc: 'Nhập khẩu Nhật Bản',
                image: 'https://images.unsplash.com/photo-1596363505729-41905a9a12a2?q=80&w=250&auto=format&fit=crop',
                price: 800000,
                quantity: 0.5,
                unit: 'kg'
            },
            {
                id: 3,
                name: 'Cam Vàng Navel',
                desc: 'Úc, không hạt',
                image: 'https://images.unsplash.com/photo-1547514301-ec456e778bd7?q=80&w=250&auto=format&fit=crop',
                price: 100000,
                quantity: 2,
                unit: 'kg'
            }
        ],
        financial: {
            subtotal: 850000,
            shipping: 30000,
            discount: 50000,
            total: 830000
        }
    };

    // Status mapping for timeline
    const timelineSteps = [
        { id: 'placed', label: 'Đặt hàng thành công', time: '10:30 AM, 24/10/2023', icon: 'check' },
        { id: 'confirmed', label: 'Đã xác nhận', time: '14:00 PM, 24/10/2023', icon: 'check' },
        { id: 'processing', label: 'Đang xử lý', time: 'Chúng tôi đang đóng gói...', icon: 'hourglass_top' },
        { id: 'shipping', label: 'Đang vận chuyển', time: 'Dự kiến 25/10/2023', icon: 'local_shipping' },
        { id: 'delivered', label: 'Giao hàng thành công', time: '', icon: 'home' }
    ];

    const currentStepIndex = timelineSteps.findIndex(step => step.id === order.status);

    return (
        <div className="max-w-[1280px] mx-auto pb-10">
            {/* Breadcrumbs & Heading */}
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/admin/orders" className="hover:text-primary transition-colors">Đơn hàng</Link>
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                    <span className="text-text-main dark:text-white font-medium">Chi tiết #{order.id}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text-main dark:text-white mb-1">
                            Chi tiết đơn hàng <span className="text-primary">#{order.id}</span>
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400">Đặt ngày {order.date}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-bold text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-[20px]">print</span>
                            In hóa đơn
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-[20px]">edit_note</span>
                            Cập nhật trạng thái
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Order Items & Summary (2/3) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* Items List */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-text-main dark:text-white">
                                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                                Sản phẩm ({order.items.length})
                            </h3>
                            <span className="px-3 py-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 text-xs font-bold border border-yellow-200 dark:border-yellow-700">
                                {timelineSteps.find(s => s.id === order.status)?.label}
                            </span>
                        </div>

                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 dark:border-border-dark text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
                            <div className="col-span-6">Sản phẩm</div>
                            <div className="col-span-2 text-center">Giá</div>
                            <div className="col-span-2 text-center">Số lượng</div>
                            <div className="col-span-2 text-right">Tổng</div>
                        </div>

                        {/* Items */}
                        <div className="flex flex-col">
                            {order.items.map((item) => (
                                <div key={item.id} className="py-4 border-b border-gray-100 dark:border-border-dark last:border-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    <div className="col-span-1 md:col-span-6 flex gap-4">
                                        <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-gray-700">
                                            <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="font-bold text-text-main dark:text-white">{item.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-2 md:gap-0">
                                        <span className="md:hidden text-gray-500 text-sm">Đơn giá:</span>
                                        <span className="font-medium text-text-main dark:text-white">{item.price.toLocaleString()}đ</span>
                                    </div>

                                    <div className="col-span-1 md:col-span-2 flex md:justify-center items-center gap-2 md:gap-0">
                                        <span className="md:hidden text-gray-500 text-sm">Số lượng:</span>
                                        <span className="font-medium text-text-main dark:text-white">{item.quantity} {item.unit}</span>
                                    </div>

                                    <div className="col-span-1 md:col-span-2 flex md:justify-end items-center gap-2 md:gap-0">
                                        <span className="md:hidden text-gray-500 text-sm">Thành tiền:</span>
                                        <span className="font-bold text-primary">{(item.price * item.quantity).toLocaleString()}đ</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-green-600">receipt_long</span>
                            Tổng kết thanh toán
                        </h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-sm md:text-base">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Tạm tính</span>
                                <span className="font-bold text-text-main dark:text-white">{order.financial.subtotal.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between items-center text-sm md:text-base">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Phí vận chuyển</span>
                                <span className="font-bold text-text-main dark:text-white">{order.financial.shipping.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between items-center text-sm md:text-base">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">Giảm giá (Voucher)</span>
                                <span className="font-bold text-primary">-{order.financial.discount.toLocaleString()}đ</span>
                            </div>
                            <div className="h-px bg-gray-100 dark:bg-border-dark my-2"></div>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-lg text-text-main dark:text-white">Tổng cộng</span>
                                <span className="font-black text-2xl text-primary">{order.financial.total.toLocaleString()}đ</span>
                            </div>
                            <p className="text-right text-xs text-gray-400 italic">Đã bao gồm VAT</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline, Customer, Shipping (1/3) */}
                <div className="flex flex-col gap-6">

                    {/* Order Status Timeline */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-blue-600">pending_actions</span>
                            Tiến độ đơn hàng
                        </h3>
                        {/* Vertical Timeline */}
                        <div className="relative pl-2">
                            {timelineSteps.map((step, index) => {
                                const isCompleted = index <= currentStepIndex; // Assume 'processing' is index 2
                                const isCurrent = index === currentStepIndex;

                                return (
                                    <div key={step.id} className="grid grid-cols-[32px_1fr] gap-x-3 pb-8 last:pb-0 relative">
                                        {/* Line Connector (except last item) */}
                                        {index !== timelineSteps.length - 1 && (
                                            <div className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${isCompleted ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                                        )}

                                        {/* Icon Bubble */}
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${isCompleted
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                            } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                                            <span className="material-symbols-outlined text-[16px] font-bold">{step.icon}</span>
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <p className={`font-bold text-sm leading-tight ${isCompleted ? 'text-text-main dark:text-white' : 'text-gray-400'}`}>
                                                {step.label}
                                            </p>
                                            {step.time && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{step.time}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Customer Info */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-purple-600">person</span>
                            Khách hàng
                        </h3>
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${order.customer.avatar_color} shadow-inner`}></div>
                            <div>
                                <p className="font-bold text-text-main dark:text-white">{order.customer.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{order.customer.email}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{order.customer.phone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-red-600">location_on</span>
                            Địa chỉ giao hàng
                        </h3>
                        <div className="relative rounded-xl overflow-hidden h-32 mb-4 bg-gray-200 dark:bg-gray-800 group cursor-pointer">
                            {/* Placeholder Map Image */}
                            <div className="absolute inset-0 bg-slate-300 dark:bg-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                                <span className="material-symbols-outlined text-4xl text-gray-400">map</span>
                            </div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                        </div>
                        <p className="text-sm text-text-main dark:text-gray-300 leading-relaxed font-medium">
                            {order.address}
                        </p>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-border-dark">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-text-main dark:text-white">
                            <span className="material-symbols-outlined text-orange-600">credit_card</span>
                            Thanh toán
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-14 bg-white rounded border border-gray-200 flex items-center justify-center">
                                <span className="material-symbols-outlined text-gray-600">credit_card</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm text-text-main dark:text-white">{order.payment.method} **** {order.payment.card_last4}</p>
                                <p className="text-[10px] text-green-600 font-black mt-0.5 bg-green-100 px-1.5 py-0.5 rounded w-fit">{order.payment.status}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
