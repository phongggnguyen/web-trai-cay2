import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  cartCount: number;
  onNavigate: (page: Page) => void;
  activePage: Page;
  toggleTheme: () => void;
  isDark: boolean;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onNavigate, activePage, toggleTheme, isDark }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-color dark:border-border-dark bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md px-4 py-3 md:px-10 transition-colors duration-200">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate(Page.HOME)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-text-main transition-colors">
            <span className="material-symbols-outlined text-[28px]">nutrition</span>
          </div>
          <div className="hidden md:flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-text-main dark:text-white">Tiệm Quả Nghiệp</h1>
            <span className="text-[10px] font-bold text-text-muted dark:text-primary uppercase tracking-wider">Nghiệp tụ vành môi</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { label: 'Trang chủ', page: Page.HOME },
            { label: 'Sản phẩm', page: Page.PRODUCT_LIST },
            { label: 'Về chúng tôi', page: Page.ABOUT },
            { label: 'Blog', page: Page.BLOG },
            { label: 'Liên hệ', page: Page.CONTACT },
          ].map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activePage === item.page 
                  ? 'text-primary font-bold' 
                  : 'text-text-main dark:text-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 flex-1 md:flex-none justify-end">
          {/* Search */}
          <div className="hidden md:flex group relative w-full max-w-[240px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-text-muted">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              className="block w-full rounded-full border-none bg-background-light dark:bg-black/20 py-2.5 pl-10 pr-4 text-sm text-text-main dark:text-white placeholder-text-muted/60 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-black/40 transition-all"
              placeholder="Tìm kiếm..."
              type="text"
            />
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-black/20 hover:bg-primary/20 hover:text-primary transition-colors text-text-main dark:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">{isDark ? 'light_mode' : 'dark_mode'}</span>
          </button>

          {/* Cart */}
          <button 
            onClick={() => onNavigate(Page.CART)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-black/20 hover:bg-primary/20 hover:text-primary transition-colors text-text-main dark:text-white group"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-surface-dark">
                {cartCount}
              </span>
            )}
          </button>

          {/* User */}
          <button 
            onClick={() => onNavigate(Page.LOGIN)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-black/20 hover:bg-primary/20 hover:text-primary transition-colors text-text-main dark:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </button>
          
          {/* Mobile Menu */}
          <button className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-black/20 text-text-main dark:text-white">
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;