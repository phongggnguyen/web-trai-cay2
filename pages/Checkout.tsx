import React, { useState } from 'react';
import { Page, CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onNavigate: (page: Page) => void;
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onNavigate, onClearCart }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [shippingMethod, setShippingMethod] = useState('express');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = shippingMethod === 'express' ? 35000 : 15000;
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      onClearCart();
      // alert("Đơn hàng đã được ghi nhận! Nghiệp đã được gánh!");
      onNavigate(Page.ORDER_SUCCESS);
    }, 1500);
  };

  if (items.length === 0) {
    onNavigate(Page.CART);
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* LEFT COLUMN: Input Forms */}
        <div className="flex-1 space-y-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm font-medium text-gray-500 mb-6">
            <button onClick={() => onNavigate(Page.CART)} className="hover:text-primary transition-colors">Giỏ hàng</button>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-text-main dark:text-white font-bold">Thanh toán</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-400">Hoàn tất</span>
          </nav>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight text-text-main dark:text-white sm:text-4xl">Thanh Toán</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Điền thông tin để chúng mình ship "nghiệp" tới tận nhà nhé!</p>
          </div>

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Form Section: Contact & Shipping */}
            <section className="rounded-2xl bg-surface-light dark:bg-surface-dark p-6 shadow-sm ring-1 ring-border-color dark:ring-white/10">
              <div className="flex items-center gap-3 border-b border-border-color dark:border-white/10 pb-4 mb-6">
                <span className="material-symbols-outlined text-primary">local_shipping</span>
                <h3 className="text-xl font-bold text-text-main dark:text-white">Thông tin giao hàng</h3>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="flex flex-col md:col-span-2">
                  <span className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Họ và tên</span>
                  <input required className="h-12 w-full rounded-xl border-border-color bg-background-light dark:bg-black/20 dark:border-white/10 px-4 text-base focus:border-primary focus:ring-primary dark:text-white placeholder:text-gray-400 focus:ring-1 outline-none border transition-all" placeholder="Nguyễn Văn A" type="text"/>
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Số điện thoại</span>
                  <input required className="h-12 w-full rounded-xl border-border-color bg-background-light dark:bg-black/20 dark:border-white/10 px-4 text-base focus:border-primary focus:ring-primary dark:text-white placeholder:text-gray-400 focus:ring-1 outline-none border transition-all" placeholder="0901234567" type="tel"/>
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Email (Không bắt buộc)</span>
                  <input className="h-12 w-full rounded-xl border-border-color bg-background-light dark:bg-black/20 dark:border-white/10 px-4 text-base focus:border-primary focus:ring-primary dark:text-white placeholder:text-gray-400 focus:ring-1 outline-none border transition-all" placeholder="email@vidu.com" type="email"/>
                </label>
                <label className="flex flex-col md:col-span-2">
                  <span className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Địa chỉ nhận hàng</span>
                  <input required className="h-12 w-full rounded-xl border-border-color bg-background-light dark:bg-black/20 dark:border-white/10 px-4 text-base focus:border-primary focus:ring-primary dark:text-white placeholder:text-gray-400 focus:ring-1 outline-none border transition-all" placeholder="Số nhà, tên đường, phường/xã..." type="text"/>
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Tỉnh / Thành phố</span>
                  <div className="relative">
                    <select className="h-12 w-full appearance-none rounded-xl border-border-color bg-background-light dark:bg-black/20 dark:border-white/10 px-4 pr-8 text-base focus:border-primary focus:ring-primary dark:text-white outline-none border transition-all">
                      <option>Hồ Chí Minh</option>
                      <option>Hà Nội</option>
                      <option>Đà Nẵng</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">expand_more</span>
                  </div>
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-sm font-semibold text-text-main dark:text-gray-200">Quận / Huyện</span>
                  <div className="relative">
                    <select className="h-12 w-full appearance-none rounded-xl border-border-color bg-background-light dark:bg-black/20 dark:border-white/10 px-4 pr-8 text-base focus:border-primary focus:ring-primary dark:text-white outline-none border transition-all">
                      <option>Quận 1</option>
                      <option>Quận 3</option>
                      <option>Thủ Đức</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-500">expand_more</span>
                  </div>
                </label>
              </div>
            </section>

            {/* Shipping Method */}
            <section className="rounded-2xl bg-surface-light dark:bg-surface-dark p-6 shadow-sm ring-1 ring-border-color dark:ring-white/10">
              <div className="flex items-center gap-3 border-b border-border-color dark:border-white/10 pb-4 mb-6">
                <span className="material-symbols-outlined text-primary">rocket_launch</span>
                <h3 className="text-xl font-bold text-text-main dark:text-white">Phương thức vận chuyển</h3>
              </div>
              <div className="space-y-3">
                <label className={`group relative flex cursor-pointer items-center rounded-xl border p-4 transition-all ${shippingMethod === 'express' ? 'border-primary bg-primary/5' : 'border-border-color dark:border-white/10 hover:border-primary hover:bg-background-light dark:hover:bg-white/5'}`}>
                  <input 
                    type="radio" 
                    name="shipping" 
                    className="h-5 w-5 border-gray-300 text-primary focus:ring-primary"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                  />
                  <div className="ml-4 flex flex-1 flex-col">
                    <span className="font-bold text-text-main dark:text-white">Giao hàng hỏa tốc (2H)</span>
                    <span className="text-sm text-gray-500">Nhận hàng ngay trong ngày</span>
                  </div>
                  <span className="font-bold text-primary">35.000₫</span>
                </label>
                
                <label className={`group relative flex cursor-pointer items-center rounded-xl border p-4 transition-all ${shippingMethod === 'standard' ? 'border-primary bg-primary/5' : 'border-border-color dark:border-white/10 hover:border-primary hover:bg-background-light dark:hover:bg-white/5'}`}>
                  <input 
                    type="radio" 
                    name="shipping" 
                    className="h-5 w-5 border-gray-300 text-primary focus:ring-primary"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                  />
                  <div className="ml-4 flex flex-1 flex-col">
                    <span className="font-bold text-text-main dark:text-white">Giao hàng tiêu chuẩn</span>
                    <span className="text-sm text-gray-500">Dự kiến giao: 2 - 3 ngày</span>
                  </div>
                  <span className="font-bold text-text-main dark:text-white">15.000₫</span>
                </label>
              </div>
            </section>

            {/* Payment Method */}
            <section className="rounded-2xl bg-surface-light dark:bg-surface-dark p-6 shadow-sm ring-1 ring-border-color dark:ring-white/10">
              <div className="flex items-center gap-3 border-b border-border-color dark:border-white/10 pb-4 mb-6">
                <span className="material-symbols-outlined text-primary">payments</span>
                <h3 className="text-xl font-bold text-text-main dark:text-white">Phương thức thanh toán</h3>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { id: 'cod', label: 'Tiền mặt (COD)', icon: 'attach_money' },
                  { id: 'qr', label: 'Chuyển khoản QR', icon: 'qr_code_scanner' },
                  { id: 'card', label: 'Thẻ tín dụng', icon: 'credit_card' },
                  { id: 'wallet', label: 'Ví điện tử', icon: 'account_balance_wallet' },
                ].map((method) => (
                  <label key={method.id} className="group relative cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment" 
                      className="peer sr-only"
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                    />
                    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-border-color dark:border-white/10 p-6 text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary hover:bg-background-light dark:hover:bg-white/5">
                      <span className={`material-symbols-outlined text-3xl ${paymentMethod === method.id ? 'text-primary' : 'text-gray-400'}`}>{method.icon}</span>
                      <span className="font-bold text-text-main dark:text-white">{method.label}</span>
                    </div>
                    {paymentMethod === method.id && (
                      <div className="absolute right-3 top-3 text-primary">
                        <span className="material-symbols-outlined">check_circle</span>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </section>
          </form>
        </div>

        {/* RIGHT COLUMN: Sticky Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="sticky top-24 flex flex-col gap-6">
            {/* Cart Summary Card */}
            <div className="rounded-2xl bg-surface-light dark:bg-surface-dark p-6 shadow-xl ring-1 ring-black/5 dark:ring-white/10 border border-border-color dark:border-border-dark">
              <h3 className="mb-6 text-xl font-bold text-text-main dark:text-white">Đơn hàng của bạn</h3>
              
              {/* Items List */}
              <div className="mb-6 flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-black/20 border border-gray-100 dark:border-gray-700">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      <span className="absolute right-0 top-0 flex h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-black shadow-sm">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h4 className="font-bold text-text-main dark:text-white line-clamp-2 text-sm">{item.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.quantity} x {item.unit}</p>
                    </div>
                    <span className="font-bold text-text-main dark:text-white text-sm">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="mb-6 flex gap-2">
                <input className="h-10 w-full rounded-lg border-border-color bg-background-light dark:bg-black/20 dark:border-white/10 px-3 text-sm focus:border-primary focus:ring-primary dark:text-white outline-none border" placeholder="Mã giảm giá" type="text"/>
                <button className="shrink-0 rounded-lg bg-text-main dark:bg-white dark:text-black px-4 text-sm font-bold text-white transition hover:opacity-90">Áp dụng</button>
              </div>

              <div className="mb-6 h-px w-full bg-border-color dark:bg-white/10"></div>

              {/* Totals */}
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Tạm tính</span>
                  <span className="font-medium text-text-main dark:text-white">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Phí vận chuyển</span>
                  <span className="font-medium text-text-main dark:text-white">{shippingFee.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between text-primary">
                  <span>Giảm giá</span>
                  <span className="font-medium">-0₫</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-border-color dark:border-white/10 pt-4">
                  <span className="text-lg font-bold text-text-main dark:text-white">Tổng cộng</span>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-primary">{total.toLocaleString('vi-VN')}đ</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">(Đã bao gồm VAT)</span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <button 
                form="checkout-form"
                disabled={isProcessing}
                className="mt-8 w-full rounded-full bg-primary py-4 text-center text-lg font-bold text-[#0d160b] shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:shadow-primary/50 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Đang xử lý...</span>
                ) : (
                  "Đặt hàng ngay"
                )}
              </button>
              
              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined align-middle text-sm" style={{ fontSize: '14px' }}>lock</span> 
                Thông tin của bạn được bảo mật tuyệt đối
              </p>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 p-4 text-center border border-primary/20">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span className="text-sm font-semibold text-text-main dark:text-white">Cam kết trái cây tươi 100% trong ngày</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;