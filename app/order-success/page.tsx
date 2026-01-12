'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useOrder } from '../../hooks/useOrder';
import { Receipt } from './_components/Receipt';
import { ActionButtons } from './_components/ActionButtons';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  const { orderData, isLoading, error } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <span className="material-symbols-outlined text-6xl text-red-500">error</span>
          <h2 className="text-2xl font-bold text-text-main dark:text-white">Có lỗi xảy ra</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
          <Link href="/" className="mt-4 px-6 py-3 bg-primary text-black font-bold rounded-full hover:brightness-110 transition">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full overflow-hidden font-display">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90"
        style={{ backgroundImage: "url('/images/img-checkout.png')" }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] p-4 transform scale-90 md:scale-75 origin-center">

        {/* Main Title Group */}
        <div className="flex flex-col items-center text-center gap-6 mt-4 animate-fade-in-up">
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
          <div className="bg-white border-[3px] border-black px-6 py-3 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <span className="text-sm md:text-lg font-bold text-gray-800">
              Mã đơn hàng của bạn là: <span className="font-extrabold">#{orderId?.slice(0, 8) || 'N/A'}</span>
            </span>
          </div>
        </div>

        {/* Receipt Bubble */}
        <Receipt orderData={orderData} />

        {/* Action Buttons & Social Icons */}
        <ActionButtons />

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
