import React from 'react';
import { Page } from '../types';

interface ContactProps {
  onNavigate: (page: Page) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex justify-center py-8 px-4 md:px-10">
      <div className="w-full max-w-[1280px] flex flex-col gap-10">
        {/* Page Heading & Slogan */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border-color dark:border-[#2a4025] pb-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <p className="text-primary text-sm font-bold uppercase tracking-wider">Liên hệ với chúng mình</p>
            <h1 className="text-text-main dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
              Giải Nghiệp Ngay
            </h1>
            <p className="text-text-muted dark:text-[#a5d6a7] text-lg font-normal leading-normal">
              Nghiệp tụ vành môi - Ăn vô trôi hết. <br className="hidden md:block"/>
              Thắc mắc? Khiếu nại? Hay chỉ muốn khen ngon? Nhắn ngay cho Tiệm!
            </p>
          </div>
          {/* Decor Image */}
          <div className="hidden md:block w-32 h-32 relative opacity-80">
            <div className="w-full h-full bg-gradient-to-br from-primary/40 to-yellow-300/40 rounded-full blur-2xl absolute"></div>
            <div className="w-full h-full flex items-center justify-center text-6xl rotate-12 select-none">🍋</div>
          </div>
        </div>

        {/* Content Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Contact Info & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-[#d6e6d1] dark:border-[#2a4025] shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <div className="size-12 rounded-full bg-background-light dark:bg-[#2a4025] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-xs text-text-muted dark:text-[#a5d6a7] font-bold uppercase">Hotline giải nghiệp</p>
                  <h3 className="text-text-main dark:text-white text-lg font-bold">09xx.xxx.xxx</h3>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-[#d6e6d1] dark:border-[#2a4025] shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <div className="size-12 rounded-full bg-background-light dark:bg-[#2a4025] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-xs text-text-muted dark:text-[#a5d6a7] font-bold uppercase">Email góp ý</p>
                  <h3 className="text-text-main dark:text-white text-lg font-bold">tiemquanghiep@email.com</h3>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-light dark:bg-surface-dark border border-[#d6e6d1] dark:border-[#2a4025] shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <div className="size-12 rounded-full bg-background-light dark:bg-[#2a4025] flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-xs text-text-muted dark:text-[#a5d6a7] font-bold uppercase">Tổng hành dinh</p>
                  <h3 className="text-text-main dark:text-white text-lg font-bold">Quận 1, TP. Hồ Chí Minh</h3>
                </div>
              </div>
            </div>

            {/* Social Actions */}
            <div className="grid grid-cols-2 gap-4">
              <a className="group flex flex-col items-center justify-center gap-2 bg-background-light dark:bg-[#1e2e1a] border border-border-color dark:border-[#2a4025] py-4 rounded-xl hover:border-primary/50 transition-colors" href="#">
                <div className="rounded-full bg-background-light dark:bg-[#2a4025] p-2.5 group-hover:bg-primary group-hover:text-white transition-colors text-text-main dark:text-white">
                  <span className="material-symbols-outlined">public</span>
                </div>
                <p className="text-text-main dark:text-white text-sm font-bold">Facebook</p>
              </a>
              <a className="group flex flex-col items-center justify-center gap-2 bg-background-light dark:bg-[#1e2e1a] border border-border-color dark:border-[#2a4025] py-4 rounded-xl hover:border-primary/50 transition-colors" href="#">
                <div className="rounded-full bg-background-light dark:bg-[#2a4025] p-2.5 group-hover:bg-primary group-hover:text-white transition-colors text-text-main dark:text-white">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <p className="text-text-main dark:text-white text-sm font-bold">Zalo</p>
              </a>
            </div>

            {/* Map Image Placeholder */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-[#d6e6d1] dark:border-[#2a4025]">
              <img alt="Bản đồ chỉ đường đến Tiệm Quả Nghiệp tại Hồ Chí Minh" className="object-cover w-full h-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy538Nvi8JN8VH9K77vuI2-pCFE7gEWKzq1IgroeaujHj7XnSaPjd29MVxTpLzYRn-X5UCCCjlCVYz50cJAn0Y2NjznyUQtddNLP7Wji_ZCwcpy9Ukl_dkWsOtLq4dB_t7Q04lSzIk2Mxwk7edwQEiHq7KNJBSj1_v9lSipm5XADWxp9GXi141ZXq9GGT5amDFqLH2Oji-lBipr2vH4BpnorWoit34sXuBt9_RUZuAEKlgUOVUSZsheS7mvptqQcOEHmWgyESYWwuZ"/>
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                <button className="bg-white dark:bg-[#1e2e1a] text-text-main dark:text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 pointer-events-auto hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-primary">map</span>
                  Xem bản đồ
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-light dark:bg-surface-dark p-6 md:p-8 rounded-2xl shadow-sm border border-[#d6e6d1] dark:border-[#2a4025] h-full flex flex-col justify-center">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-text-main dark:text-white">Gửi lời nhắn nhủ</h2>
                <p className="text-text-muted dark:text-[#a5d6a7]">Điền thông tin vào form bên dưới, Tiệm sẽ phản hồi sớm nhất có thể!</p>
              </div>
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Tin nhắn đã được gửi đi!"); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-main dark:text-white ml-1">Họ và tên</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                        <span className="material-symbols-outlined text-[20px]">person</span>
                      </div>
                      <input className="w-full pl-10 pr-4 py-3 rounded-xl bg-background-light dark:bg-[#152111] border border-[#d6e6d1] dark:border-[#2a4025] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-[#a0bca0] dark:placeholder-[#4a5f45] text-text-main dark:text-white" placeholder="Nguyễn Văn A" type="text"/>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-main dark:text-white ml-1">Số điện thoại</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                        <span className="material-symbols-outlined text-[20px]">phone_iphone</span>
                      </div>
                      <input className="w-full pl-10 pr-4 py-3 rounded-xl bg-background-light dark:bg-[#152111] border border-[#d6e6d1] dark:border-[#2a4025] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-[#a0bca0] dark:placeholder-[#4a5f45] text-text-main dark:text-white" placeholder="0909..." type="tel"/>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-main dark:text-white ml-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                      <span className="material-symbols-outlined text-[20px]">alternate_email</span>
                    </div>
                    <input className="w-full pl-10 pr-4 py-3 rounded-xl bg-background-light dark:bg-[#152111] border border-[#d6e6d1] dark:border-[#2a4025] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder-[#a0bca0] dark:placeholder-[#4a5f45] text-text-main dark:text-white" placeholder="example@email.com" type="email"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-main dark:text-white ml-1">Lời nhắn</label>
                  <textarea className="w-full px-4 py-3 rounded-xl bg-background-light dark:bg-[#152111] border border-[#d6e6d1] dark:border-[#2a4025] focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none placeholder-[#a0bca0] dark:placeholder-[#4a5f45] text-text-main dark:text-white" placeholder="Tiệm ơi, trái cây hôm nay tươi quá..." rows={5}></textarea>
                </div>
                <div className="pt-2">
                  <button className="w-full bg-primary hover:bg-[#43c51c] text-text-main font-black text-lg py-3.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                    <span>Gửi đi cho nhẹ lòng</span>
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;