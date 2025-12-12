import React from 'react';
import Link from 'next/link';
import { Page } from '../types';

interface FooterProps {
  onNavigate?: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {

  const handleNav = (e: React.MouseEvent, page: Page) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="border-t border-border-color dark:border-border-dark bg-surface-light dark:bg-surface-dark pt-16 pb-8 transition-colors duration-200">
      <div className="mx-auto max-w-[1440px] px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-text-main dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-text-main">
                <span className="material-symbols-outlined text-[20px]">nutrition</span>
              </div>
              <h2 className="text-lg font-bold">Tiệm Quả Nghiệp</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              "Nghiệp tụ vành môi - Ăn vô trôi hết." <br/>
              Chúng tôi cung cấp trái cây tươi ngon, giúp bạn giải nghiệp qua đường ăn uống.
            </p>
            <div className="flex gap-4 mt-2">
              {['FB', 'IG', 'TT'].map(social => (
                <a key={social} href="#" className="h-8 w-8 rounded-full bg-background-light dark:bg-black/20 flex items-center justify-center hover:bg-primary hover:text-text-main transition-colors text-xs font-bold text-text-muted dark:text-gray-400">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="font-bold text-text-main dark:text-white mb-4">Về Tiệm</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/about" onClick={(e) => handleNav(e, Page.ABOUT)} className="hover:text-primary transition-colors">Câu chuyện thương hiệu</Link></li>
              <li><Link href="/admin" onClick={(e) => handleNav(e, Page.ADMIN)} className="hover:text-primary transition-colors">Tuyển dụng (Tìm đồng nghiệp)</Link></li>
              <li><Link href="/blog" onClick={(e) => handleNav(e, Page.BLOG)} className="hover:text-primary transition-colors">Blog sống khỏe</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="font-bold text-text-main dark:text-white mb-4">Hỗ trợ khách hàng</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/terms" onClick={(e) => handleNav(e, Page.TERMS)} className="hover:text-primary transition-colors">Chính sách đổi trả</Link></li>
              <li><Link href="/terms" onClick={(e) => handleNav(e, Page.TERMS)} className="hover:text-primary transition-colors">Chính sách giao hàng</Link></li>
              <li><Link href="/terms" onClick={(e) => handleNav(e, Page.TERMS)} className="hover:text-primary transition-colors">Điều khoản dịch vụ</Link></li>
              <li><Link href="/privacy" onClick={(e) => handleNav(e, Page.PRIVACY)} className="hover:text-primary transition-colors">Bảo mật thông tin</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-text-main dark:text-white mb-4">Đăng ký nhận tin</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Nhận thông tin khuyến mãi và mã giảm giá mới nhất.</p>
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-background-light dark:bg-black/20 border border-border-color dark:border-border-dark rounded-lg text-sm px-4 py-2 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors dark:text-white placeholder-gray-400" 
                placeholder="Email của bạn" 
                type="email"
              />
              <button className="bg-primary text-text-main font-bold px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                Gửi
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border-color dark:border-border-dark pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2024 Tiệm Quả Nghiệp. All rights reserved.</p>
          <div className="flex gap-4 text-gray-300 dark:text-gray-600">
             <span className="material-symbols-outlined text-2xl">payments</span>
             <span className="material-symbols-outlined text-2xl">credit_card</span>
             <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;