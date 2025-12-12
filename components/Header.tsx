'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobal } from '../context/GlobalContext';
import { Page } from '../types';

interface HeaderProps {
  cartCount?: number;
  onNavigate?: (page: Page) => void;
  activePage?: Page;
  toggleTheme?: () => void;
  isDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount: propCartCount, 
  onNavigate, 
  activePage, 
  toggleTheme: propToggleTheme, 
  isDark: propIsDark 
}) => {
  const global = useGlobal();
  const pathname = usePathname();

  const cartCount = propCartCount ?? global.cartCount;
  const toggleTheme = propToggleTheme ?? global.toggleTheme;
  const isDark = propIsDark ?? global.isDark;

  const getPageFromPath = (path: string): Page => {
    switch(path) {
      case '/': return Page.HOME;
      case '/products': return Page.PRODUCT_LIST;
      case '/about': return Page.ABOUT;
      case '/blog': return Page.BLOG;
      case '/contact': return Page.CONTACT;
      case '/cart': return Page.CART;
      case '/login': return Page.LOGIN;
      default: return Page.HOME;
    }
  };

  const isActive = (path: string) => {
    if (activePage) {
      return activePage === getPageFromPath(path);
    }
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const handleNav = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(getPageFromPath(path));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-color dark:border-border-dark bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md px-4 py-3 md:px-10 transition-colors duration-200">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        {/* Logo */}
        <Link 
          href="/" 
          onClick={(e) => handleNav(e, '/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary group-hover:bg-primary group-hover:text-text-main transition-colors">
            <span className="material-symbols-outlined text-[28px]">nutrition</span>
          </div>
          <div className="hidden md:flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight text-text-main dark:text-white">Tiệm Quả Nghiệp</h1>
            <span className="text-[10px] font-bold text-text-muted dark:text-primary uppercase tracking-wider">Nghiệp tụ vành môi</span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { label: 'Trang chủ', path: '/' },
            { label: 'Sản phẩm', path: '/products' },
            { label: 'Về chúng tôi', path: '/about' },
            { label: 'Blog', path: '/blog' },
            { label: 'Liên hệ', path: '/contact' },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={(e) => handleNav(e, item.path)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.path) 
                  ? 'text-primary font-bold' 
                  : 'text-text-main dark:text-gray-300'
              }`}
            >
              {item.label}
            </Link>
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
          <Link 
            href="/cart"
            onClick={(e) => handleNav(e, '/cart')}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-black/20 hover:bg-primary/20 hover:text-primary transition-colors text-text-main dark:text-white group"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-surface-dark">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User */}
          <Link 
            href="/login"
            onClick={(e) => handleNav(e, '/login')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-black/20 hover:bg-primary/20 hover:text-primary transition-colors text-text-main dark:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </Link>
          
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