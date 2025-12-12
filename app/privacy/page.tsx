'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap gap-2 mb-8 text-sm">
        <Link 
          href="/" 
          className="text-text-muted dark:text-gray-400 hover:text-primary transition-colors"
        >
          Trang chủ
        </Link>
        <span className="text-text-muted dark:text-gray-400">/</span>
        <span className="text-text-main dark:text-white font-medium">Chính Sách Bảo Mật</span>
      </nav>

      {/* Page Header */}
      <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#eaf3e8] to-[#f9fbf8] dark:from-white/5 dark:to-white/0 p-8 lg:p-12 border border-border-color dark:border-border-dark">
        {/* Decorative Background Image */}
        <div 
          className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none hidden md:block" 
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBR0KiPCuo3VexziVkb5e0QN1D9irbhb_x6XVUhiQhoCatd1czRmKw-y9P5FRdtx7av10wHQw75IEUQUy51EK-6GDRzC6ePMj1CyrUAU3NhlLI12dqY5HsJApJklVIYwf9tA8TegsiCzTLbDVdAG_JE9yI5DO8V4W5gFJ3iE21JoG_5Y2MgDljbokyPMsLjJiUI_yBIqD7D5z-JQbzmxYQ3KU5-rVbrmmma3BRENC71DVOWhe5L00CnwCuC-xr3zL0qWXr_xxjiCDKy')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'linear-gradient(to left, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to left, black, transparent)'
          }}
        >
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-text-main dark:text-white">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-text-muted dark:text-gray-300 text-lg leading-relaxed mb-2">
            Cam kết bảo vệ sự riêng tư tươi mới như trái cây của chúng tôi.
          </p>
          <div className="flex items-center gap-2 text-sm text-text-muted dark:text-gray-400">
            <span className="material-symbols-outlined text-[18px]">update</span>
            <span>Cập nhật lần cuối: 24/05/2024</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar Navigation (Sticky) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 space-y-6">
            <div>
              <h3 className="text-text-main dark:text-white text-lg font-bold mb-1">Nội dung chính</h3>
              <p className="text-text-muted dark:text-gray-400 text-sm">Điều hướng nhanh</p>
            </div>
            <nav className="flex flex-col gap-2">
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-all border-l-4 border-primary" href="#intro">
                <span className="material-symbols-outlined text-[20px]">info</span>
                Giới thiệu
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-text-main dark:text-gray-300 font-medium transition-all border-l-4 border-transparent hover:border-gray-200" href="#collection">
                <span className="material-symbols-outlined text-[20px]">database</span>
                1. Dữ liệu thu thập
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-text-main dark:text-gray-300 font-medium transition-all border-l-4 border-transparent hover:border-gray-200" href="#usage">
                <span className="material-symbols-outlined text-[20px]">target</span>
                2. Mục đích sử dụng
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-text-main dark:text-gray-300 font-medium transition-all border-l-4 border-transparent hover:border-gray-200" href="#security">
                <span className="material-symbols-outlined text-[20px]">security</span>
                3. Bảo mật thông tin
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-text-main dark:text-gray-300 font-medium transition-all border-l-4 border-transparent hover:border-gray-200" href="#sharing">
                <span className="material-symbols-outlined text-[20px]">share</span>
                4. Chia sẻ dữ liệu
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-text-main dark:text-gray-300 font-medium transition-all border-l-4 border-transparent hover:border-gray-200" href="#rights">
                <span className="material-symbols-outlined text-[20px]">gavel</span>
                5. Quyền lợi
              </a>
              <a className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-text-main dark:text-gray-300 font-medium transition-all border-l-4 border-transparent hover:border-gray-200" href="#cookies">
                <span className="material-symbols-outlined text-[20px]">cookie</span>
                6. Cookies
              </a>
            </nav>
            {/* Mini CTA Sidebar */}
            <div className="bg-[#eaf3e8] dark:bg-white/5 rounded-2xl p-5 mt-6 border border-border-color dark:border-border-dark">
              <div className="flex items-center gap-3 mb-3 text-primary">
                <span className="material-symbols-outlined">support_agent</span>
                <span className="font-bold">Cần hỗ trợ?</span>
              </div>
              <p className="text-sm text-text-muted dark:text-gray-400 mb-4">Mọi thắc mắc về bảo mật vui lòng liên hệ hotline.</p>
              <button className="w-full bg-primary hover:bg-primary-dark text-text-main font-bold py-2 rounded-lg text-sm transition-colors shadow-sm">Gọi ngay 1900 1234</button>
            </div>
          </div>
        </aside>

        {/* Main Text Content */}
        <div className="lg:col-span-9 space-y-12">
          {/* Introduction */}
          <section className="scroll-mt-32" id="intro">
            <p className="text-lg text-text-main dark:text-gray-200 leading-relaxed">
              Chào mừng bạn đến với <strong>Tiệm Quả Nghiệp</strong>. Với slogan <span className="text-primary font-bold italic">"Nghiệp tụ vành môi - Ăn vô trôi hết"</span>, chúng tôi không chỉ cam kết mang đến những loại trái cây tươi ngon nhất mà còn đảm bảo sự an tâm tuyệt đối cho khách hàng khi mua sắm trực tuyến. Chính sách bảo mật này giải thích chi tiết cách chúng tôi tiếp nhận, sử dụng và (quan trọng nhất) bảo vệ thông tin cá nhân của bạn.
            </p>
          </section>

          <hr className="border-border-color dark:border-border-dark"/>

          {/* 1. Dữ liệu thu thập */}
          <section className="scroll-mt-32" id="collection">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">database</span>
              </div>
              <h2 className="text-2xl font-bold text-text-main dark:text-white pt-1">1. Dữ liệu chúng tôi thu thập</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4 text-text-muted dark:text-gray-300 leading-relaxed">
              <p>Để xử lý đơn hàng "nhanh như cách người yêu cũ trở mặt", chúng tôi cần thu thập một số thông tin cơ bản:</p>
              <ul className="list-disc list-inside space-y-2 marker:text-primary">
                <li><strong>Thông tin định danh:</strong> Họ tên, ngày sinh, giới tính.</li>
                <li><strong>Thông tin liên lạc:</strong> Số điện thoại, địa chỉ nhận hàng, địa chỉ email.</li>
                <li><strong>Thông tin giao dịch:</strong> Lịch sử mua hàng, phương thức thanh toán, chi tiết đơn hàng trái cây đã đặt.</li>
                <li><strong>Dữ liệu kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, thời gian truy cập (thu thập tự động qua Cookies).</li>
              </ul>
            </div>
          </section>

          {/* 2. Mục đích sử dụng */}
          <section className="scroll-mt-32" id="usage">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">target</span>
              </div>
              <h2 className="text-2xl font-bold text-text-main dark:text-white pt-1">2. Mục đích sử dụng</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4 text-text-muted dark:text-gray-300 leading-relaxed">
              <p>Chúng tôi không thu thập dữ liệu để "soi mói", mà để phục vụ bạn tốt hơn:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-border-color dark:border-white/10">
                  <h4 className="font-bold text-text-main dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">local_shipping</span> Xử lý đơn hàng
                  </h4>
                  <p className="text-sm">Xác nhận, đóng gói và giao trái cây đến tận tay bạn.</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-border-color dark:border-white/10">
                  <h4 className="font-bold text-text-main dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">support_agent</span> Chăm sóc khách hàng
                  </h4>
                  <p className="text-sm">Hỗ trợ đổi trả, giải quyết khiếu nại nếu trái cây bị dập nát.</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-border-color dark:border-white/10">
                  <h4 className="font-bold text-text-main dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">campaign</span> Marketing
                  </h4>
                  <p className="text-sm">Gửi thông tin khuyến mãi, voucher (chỉ khi bạn đồng ý nhận tin).</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-border-color dark:border-white/10">
                  <h4 className="font-bold text-text-main dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">shield</span> Ngăn chặn gian lận
                  </h4>
                  <p className="text-sm">Phát hiện và ngăn chặn các hành vi giả mạo hoặc tấn công hệ thống.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Bảo mật thông tin */}
          <section className="scroll-mt-32" id="security">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">security</span>
              </div>
              <h2 className="text-2xl font-bold text-text-main dark:text-white pt-1">3. Bảo mật thông tin</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4 text-text-muted dark:text-gray-300 leading-relaxed">
              <p>
                Tiệm Quả Nghiệp áp dụng các biện pháp kỹ thuật và an ninh tiên tiến nhất (SSL/TLS) để bảo vệ dữ liệu của bạn khỏi truy cập trái phép, mất mát hoặc tiêu hủy.
              </p>
              <div className="bg-[#eaf3e8] dark:bg-white/5 p-4 rounded-xl flex gap-4 items-center border border-border-color dark:border-white/10">
                <span className="material-symbols-outlined text-primary text-[32px]">lock</span>
                <div>
                  <p className="font-bold text-text-main dark:text-white">Cam kết không mua bán dữ liệu</p>
                  <p className="text-sm text-text-muted dark:text-gray-400">Chúng tôi cam kết không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào vì mục đích thương mại.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Chia sẻ dữ liệu */}
          <section className="scroll-mt-32" id="sharing">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">share</span>
              </div>
              <h2 className="text-2xl font-bold text-text-main dark:text-white pt-1">4. Chia sẻ với bên thứ ba</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4 text-text-muted dark:text-gray-300 leading-relaxed">
              <p>Thông tin của bạn có thể được chia sẻ với các đối tác tin cậy để hoàn tất dịch vụ:</p>
              <ul className="list-disc list-inside space-y-2 marker:text-primary">
                <li><strong>Đơn vị vận chuyển:</strong> (Grab, Ahamove, GHN...) để giao hàng tận nơi.</li>
                <li><strong>Cổng thanh toán:</strong> (Momo, VNPAY, Ngân hàng) để xử lý giao dịch an toàn.</li>
                <li><strong>Cơ quan pháp luật:</strong> Chỉ khi có yêu cầu bắt buộc từ cơ quan nhà nước có thẩm quyền.</li>
              </ul>
            </div>
          </section>

          {/* 5. Quyền lợi */}
          <section className="scroll-mt-32" id="rights">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">gavel</span>
              </div>
              <h2 className="text-2xl font-bold text-text-main dark:text-white pt-1">5. Quyền lợi của bạn</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4 text-text-muted dark:text-gray-300 leading-relaxed">
              <p>Bạn là chủ sở hữu dữ liệu của mình, vì vậy bạn có quyền:</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Yêu cầu truy cập và xem lại thông tin cá nhân.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Yêu cầu chỉnh sửa nếu thông tin sai lệch.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Yêu cầu xóa dữ liệu (trừ trường hợp pháp luật quy định phải lưu trữ).</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>Từ chối nhận email/tin nhắn quảng cáo bất cứ lúc nào.</span>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Cookies */}
          <section className="scroll-mt-32" id="cookies">
            <div className="flex items-start gap-4 mb-4">
              <div className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined">cookie</span>
              </div>
              <h2 className="text-2xl font-bold text-text-main dark:text-white pt-1">6. Chính sách Cookies</h2>
            </div>
            <div className="pl-0 md:pl-14 space-y-4 text-text-muted dark:text-gray-300 leading-relaxed">
              <p>
                Website sử dụng Cookies để ghi nhớ trạng thái đăng nhập, giỏ hàng và cải thiện trải nghiệm người dùng. Bạn có thể tắt Cookies trong cài đặt trình duyệt, nhưng điều này có thể làm ảnh hưởng đến một số tính năng mua sắm.
              </p>
            </div>
          </section>

          {/* Contact Support Banner */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary/20 via-background-light to-primary/10 dark:from-primary/10 dark:to-background-dark p-8 border border-primary/20 text-center relative overflow-hidden">
            {/* Decorative fruit pattern */}
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
              <span className="material-symbols-outlined text-[150px] text-primary">nutrition</span>
            </div>
            <div className="absolute -left-10 -top-10 opacity-10 -rotate-12">
              <span className="material-symbols-outlined text-[150px] text-primary">spa</span>
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-text-main dark:text-white mb-3">Bạn còn thắc mắc về bảo mật?</h3>
              <p className="text-text-muted dark:text-gray-300 mb-6">Đội ngũ Tiệm Quả Nghiệp luôn sẵn sàng lắng nghe và giải đáp mọi lo lắng của bạn. Đừng ngần ngại liên hệ với chúng tôi.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-text-main font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined">mail</span>
                  Gửi Email hỗ trợ
                </Link>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/10 text-text-main dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-white/20 transition-all border border-[#eaf3e8] dark:border-white/10">
                  <span className="material-symbols-outlined">call</span>
                  1900 1234
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}