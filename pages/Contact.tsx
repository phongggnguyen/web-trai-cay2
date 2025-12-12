import React from 'react';
import { Page } from '../types';

interface ContactProps {
  onNavigate: (page: Page) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-text-main dark:text-white md:text-5xl">Liên Hệ Chúng Tôi</h1>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">Bạn có thắc mắc hoặc muốn đặt hàng số lượng lớn? <br className="hidden md:block"/> Đừng ngần ngại "alo" cho Tiệm nhé!</p>
      </div>

      <div className="grid overflow-hidden rounded-3xl border border-border-color bg-surface-light shadow-xl dark:border-border-dark dark:bg-surface-dark lg:grid-cols-2">
        {/* Contact Info */}
        <div className="flex flex-col justify-between bg-primary p-8 text-text-main md:p-12">
          <div>
            <h3 className="mb-6 text-2xl font-black">Thông Tin Liên Lạc</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold">Địa chỉ cửa hàng</h4>
                  <p className="mt-1 text-sm font-medium opacity-80">123 Đường Vành Đai, Phường Giải Nghiệp, Quận 1, TP.HCM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <h4 className="font-bold">Hotline</h4>
                  <p className="mt-1 text-sm font-medium opacity-80">1900 6789 - 0909 123 456</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="mt-1 text-sm font-medium opacity-80">hello@tiemquanghiep.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h4 className="mb-4 font-bold">Theo dõi chúng tôi</h4>
            <div className="flex gap-3">
              {['facebook', 'instagram', 'tiktok', 'youtube'].map((social) => (
                <button key={social} className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 transition-colors hover:bg-white hover:text-primary">
                  <img src={`https://www.svgrepo.com/show/4756${social === 'facebook' ? '47/facebook-color' : social === 'instagram' ? '54/instagram-color' : '89/tiktok-color'}.svg`} className="h-5 w-5" alt={social} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 md:p-12">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Đã gửi tin nhắn!"); }}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main dark:text-gray-300">Họ và tên</label>
                <input type="text" className="w-full rounded-xl border border-gray-200 bg-background-light px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-black/20 dark:text-white" placeholder="Nguyễn Văn A" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main dark:text-gray-300">Số điện thoại</label>
                <input type="tel" className="w-full rounded-xl border border-gray-200 bg-background-light px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-black/20 dark:text-white" placeholder="0909xxxxxx" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main dark:text-gray-300">Email</label>
              <input type="email" className="w-full rounded-xl border border-gray-200 bg-background-light px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-black/20 dark:text-white" placeholder="email@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-text-main dark:text-gray-300">Nội dung nhắn gửi</label>
              <textarea rows={4} className="w-full rounded-xl border border-gray-200 bg-background-light px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-black/20 dark:text-white" placeholder="Tôi muốn hỏi về..."></textarea>
            </div>

            <button className="w-full rounded-xl bg-text-main py-4 font-bold text-white transition-all hover:bg-black dark:bg-primary dark:text-text-main hover:shadow-lg">
              Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;