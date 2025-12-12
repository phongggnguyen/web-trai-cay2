'use client';

import React from 'react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col items-center py-8 px-4 md:px-10 lg:px-40 w-full max-w-[1440px] mx-auto gap-8">
      {/* Success Hero */}
      <section className="flex flex-col items-center gap-6 w-full max-w-3xl text-center py-8 animate-fade-in-up">
        <div className="relative">
          <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40">
              <span className="material-symbols-outlined text-4xl">check</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-2 rotate-12 bg-white dark:bg-surface-dark px-3 py-1 rounded-full border border-border-color dark:border-border-dark shadow-sm">
            <span className="text-xs font-bold text-primary">Success!</span>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl md:text-4xl font-extrabold text-text-main dark:text-white tracking-tight">Cảm ơn bạn, Minh!</h1>
          <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Đơn hàng <span className="font-bold text-text-main dark:text-white">#TQN-8829</span> của bạn đã được tiếp nhận thành công. 
            <br className="hidden md:block"/>
            <span className="italic text-primary font-medium">"Nghiệp này là nghiệp tốt!"</span> Trái cây tươi ngon sẽ sớm đến tay bạn.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <button className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-black font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/25">
            <span className="material-symbols-outlined mr-2 text-xl">local_shipping</span>
            Theo dõi đơn hàng
          </button>
          <Link 
            href="/products"
            className="flex h-12 items-center justify-center rounded-full bg-background-light dark:bg-surface-dark px-8 text-primary font-bold hover:bg-primary/10 transition-all border border-transparent hover:border-primary/20"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </section>

      {/* Order Status Tracker */}
      <section className="w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-2xl border border-border-color dark:border-border-dark p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-main dark:text-white">Trạng thái đơn hàng</h3>
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Đang xử lý</span>
          </div>
          <div className="relative pt-2">
            {/* Progress Bar Background */}
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[35%] rounded-full shadow-[0_0_10px_rgba(76,223,32,0.6)]"></div>
            </div>
            {/* Milestones */}
            <div className="flex justify-between mt-4 text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
              <div className="text-primary font-bold flex flex-col items-center gap-1 relative">
                <span className="size-2 bg-primary rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2"></span>
                Đã đặt hàng
                <span className="font-normal text-[10px] opacity-80">14:30, 14/10</span>
              </div>
              <div className="text-primary font-bold flex flex-col items-center gap-1 relative">
                <span className="size-2 bg-primary rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2"></span>
                Đang xử lý
              </div>
              <div className="flex flex-col items-center gap-1">
                Đang giao hàng
              </div>
              <div className="flex flex-col items-center gap-1">
                Đã giao hàng
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl mt-2">
            <span className="material-symbols-outlined">schedule</span>
            Dự kiến giao hàng: <span className="font-bold">Thứ Ba, 15/10/2023</span>
          </div>
        </div>
      </section>
    </div>
  );
}