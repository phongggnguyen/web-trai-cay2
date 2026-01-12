'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || 'TQN123456';

  // Mock data for the receipt bubble visualization
  const receiptItems = [
    { name: 'Sầu riêng', price: '30.000đ' },
    { name: 'Dâu tây', price: '10.000đ' },
    { name: 'Nho xanh', price: '10.000đ' },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden font-display">
      {/* Background Image - Adjusted background size to contain or cover better */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90"
        style={{ backgroundImage: "url('/images/img-checkout.png')" }}
      />

      {/* Content Overlay - Added scale transform for the '75%' effect requested */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] p-4 transform scale-90 md:scale-75 origin-center">

        {/* Main Title Group - Reduced text sizes */}
        <div className="flex flex-col items-center text-center gap-6 mt-4 animate-fade-in-up">
          {/* Title with heavy stroke/shadow effect to match cartoon style */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#4CDF20] tracking-wider drop-shadow-[0_3px_0_rgba(0,0,0,1)] uppercase leading-relaxed"
            style={{ WebkitTextStroke: '1.5px black' }}>
            Cảm ơn bạn <br className="hidden md:block" />
            đã tin chọn
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#FFA500] tracking-wider drop-shadow-[0_3px_0_rgba(0,0,0,1)] uppercase rotate-[-2deg] mt-1"
            style={{ WebkitTextStroke: '1.5px black' }}>
            Tiệm Quả Nghiệp!
          </h2>
        </div>

        {/* Order ID Banner */}
        <div className="mt-6 relative max-w-xl w-full flex justify-center animate-scale-in delay-100">
          {/* Ribbon-like background shape */}
          <div className="bg-white border-[3px] border-black px-6 py-3 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <span className="text-sm md:text-lg font-bold text-gray-800">
              Mã đơn hàng của bạn là: <span className="font-extrabold">#{orderId}</span>
            </span>
          </div>
        </div>

        {/* Receipt Bubble (Right Side absolute on desktop, relative on mobile) */}
        <div className="mt-6 md:mt-0 md:absolute md:right-[5%] md:top-[30%] w-64 bg-white p-5 rounded-xl border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] rotate-3 animate-float hidden lg:block">
          <div className="absolute -top-5 -right-5 text-3xl">🍓</div>
          <div className="absolute -bottom-3 -left-3 text-3xl">🍇</div>

          <h3 className="font-bold text-base border-b-2 border-dashed border-gray-300 pb-2 mb-2">Hóa đơn</h3>
          <div className="flex flex-col gap-1.5 text-xs">
            {receiptItems.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-bold">{item.price}</span>
              </div>
            ))}
            <div className="flex justify-between text-gray-500">
              <span>Giao hàng</span>
              <span>Tặng</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Thanh toán</span>
              <span>3.000đ</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t-2 border-black pt-2 mt-1">
              <span>Tổng cộng</span>
              <span>60.000đ</span>
            </div>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute top-1/2 -left-3 w-5 h-5 bg-white border-l-[3px] border-b-[3px] border-black transform rotate-45"></div>
        </div>

        {/* Buttons Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 md:mt-12 w-full max-w-2xl">

          {/* Home Button */}
          <Link href="/" className="group relative flex items-center justify-center min-w-[200px]">
            <div className="absolute inset-0 bg-yellow-600 rounded-full translate-y-1.5 group-hover:translate-y-2.5 transition-transform"></div>
            <div className="relative bg-[#FF9900] border-[3px] border-black px-6 py-3 rounded-full flex items-center gap-2 w-full justify-center group-hover:-translate-y-1 transition-transform group-active:translate-y-1">
              <span className="text-2xl filter drop-shadow">🏠</span>
              <div className="flex flex-col items-start leading-none text-white drop-shadow-sm">
                <span className="font-bold text-base uppercase">TRANG CHỦ</span>
                <span className="font-bold text-xs">Về Cửa Hàng</span>
              </div>
            </div>
          </Link>

          {/* View Details Button */}
          <Link href="/profile" className="group relative flex items-center justify-center min-w-[200px]">
            <div className="absolute inset-0 bg-green-700 rounded-full translate-y-1.5 group-hover:translate-y-2.5 transition-transform"></div>
            <div className="relative bg-[#76E032] border-[3px] border-black px-6 py-3 rounded-full flex items-center gap-2 w-full justify-center group-hover:-translate-y-1 transition-transform group-active:translate-y-1">
              <span className="text-2xl filter drop-shadow">📄</span>
              <div className="flex flex-col items-start leading-none text-white drop-shadow-sm">
                <span className="font-bold text-base uppercase">XEM CHI TIẾT</span>
                <span className="font-bold text-xs">Đơn Hàng</span>
              </div>
            </div>
          </Link>

        </div>

        {/* Social Icons */}
        <div className="flex gap-3 mt-6">
          <button className="bg-black text-white p-1.5 rounded-full hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-xl">facebook</span>
          </button>
          <button className="bg-black text-white p-1.5 rounded-full hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-xl">photo_camera</span>
          </button>
          <button className="bg-black text-white p-1.5 rounded-full hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-xl">smart_display</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
