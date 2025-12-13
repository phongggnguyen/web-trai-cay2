'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useGlobal();
  const router = useRouter();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-4 py-12 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="size-24 bg-gray-100 dark:bg-surface-dark rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-6xl text-gray-300">shopping_cart_off</span>
        </div>
        <h2 className="text-2xl font-bold text-text-main dark:text-white mb-2">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">Có vẻ như bạn chưa chọn được loại quả "giải nghiệp" nào. Hãy dạo một vòng cửa hàng nhé!</p>
        <Link
          href="/products"
          className="bg-primary text-text-main font-bold px-8 py-3 rounded-full hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-text-main dark:text-white">Giỏ hàng của bạn</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Bạn có <span className="text-primary font-bold">{cartItems.length} sản phẩm</span> trong giỏ hàng
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Tiếp tục mua sắm
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Cart Items List (Left Column) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Table Header (Desktop only) */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-border-color dark:border-border-dark text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <div className="col-span-6 pl-4">Sản phẩm</div>
            <div className="col-span-2 text-center">Đơn giá</div>
            <div className="col-span-2 text-center">Số lượng</div>
            <div className="col-span-2 text-right pr-4">Tạm tính</div>
          </div>

          {cartItems.map((item) => (
            <div key={item.id} className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 items-center bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-transparent hover:border-primary/20 transition-all">
              {/* Product Info */}
              <div className="col-span-6 w-full flex items-center gap-4">
                <div className="relative size-20 md:size-24 rounded-xl overflow-hidden flex-shrink-0 bg-background-light dark:bg-background-dark">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider w-fit">Đang có hàng</span>
                  <h3 className="font-bold text-lg leading-tight text-text-main dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{item.unit}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="md:hidden text-xs text-red-500 font-bold mt-2 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">delete</span> Xóa
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center font-semibold text-gray-500 dark:text-gray-400 hidden md:block">
                {item.price.toLocaleString('vi-VN')}đ
              </div>

              {/* Quantity Control */}
              <div className="col-span-2 w-full flex justify-center">
                <div className="flex items-center bg-background-light dark:bg-background-dark rounded-full p-1 border border-border-color dark:border-border-dark">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="size-8 flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-surface-light hover:shadow-sm transition-all text-gray-600 dark:text-gray-300"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <input
                    className="w-10 bg-transparent border-none text-center font-bold text-sm focus:ring-0 p-0 text-text-main dark:text-white"
                    type="number"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="size-8 flex items-center justify-center rounded-full hover:bg-primary hover:text-text-main transition-all text-gray-600 dark:text-gray-300"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>

              {/* Total & Remove */}
              <div className="col-span-2 w-full flex items-center justify-between md:justify-end gap-4 pl-4 md:pl-0 pr-4">
                <span className="md:hidden text-sm font-medium text-gray-500">Tổng:</span>
                <span className="font-bold text-primary text-lg">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="hidden md:flex size-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  title="Xóa sản phẩm"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary (Right Column) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-lg border border-border-color dark:border-border-dark">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-border-color dark:border-border-dark text-text-main dark:text-white">Cộng giỏ hàng</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tạm tính</span>
                  <span className="font-bold text-lg text-text-main dark:text-white">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Phí giao hàng</span>
                  <span className="text-primary font-medium italic">Tính lúc thanh toán</span>
                </div>
                {/* Coupon Input */}
                <div className="pt-4">
                  <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Mã giảm giá</label>
                  <div className="flex gap-2">
                    <input
                      className="w-full bg-background-light dark:bg-background-dark border border-border-color dark:border-border-dark rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all text-text-main dark:text-white"
                      placeholder="Nhập mã..."
                      type="text"
                    />
                    <button className="bg-text-main dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap">Áp dụng</button>
                  </div>
                </div>
              </div>
              <div className="border-t border-border-color dark:border-border-dark pt-6 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-text-main dark:text-white">Tổng cộng</span>
                  <span className="font-black text-3xl text-primary">{subtotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <p className="text-xs text-gray-400 text-right mt-1">(Đã bao gồm thuế nếu có)</p>
              </div>
              <Link
                href="/checkout"
                className="w-full bg-primary hover:bg-primary-dark text-text-main font-bold text-lg py-4 rounded-full shadow-lg shadow-primary/30 transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Tiến hành thanh toán
                <span className="material-symbols-outlined font-bold">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}