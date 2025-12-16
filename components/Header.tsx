'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobal } from '../context/GlobalContext';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const { cartCount, toggleTheme, isDark, user, logout, isAdmin } = useGlobal();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-color dark:border-border-dark bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur-md px-4 py-3 md:px-10 transition-colors duration-200">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
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
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.path)
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
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-black/20 hover:bg-primary/20 hover:text-primary transition-colors text-text-main dark:text-white group"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-surface-dark">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User/Auth */}
          {user ? (
            <div className="relative group ml-1">
              <button className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-3 hover:bg-gray-50 transition-colors dark:border-gray-700 dark:hover:bg-white/5">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary overflow-hidden">
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="User" className="w-full h-full object-cover" />
                  ) : (
                    <span className="material-symbols-outlined text-sm">person</span>
                  )}
                </div>
                <span className="text-sm font-bold text-text-main dark:text-white max-w-[100px] truncate">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 origin-top-right scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="rounded-xl bg-white dark:bg-surface-dark shadow-xl border border-gray-100 dark:border-gray-700 p-1 overflow-hidden">
                  {isAdmin && (
                    <Link href="/admin" className="block px-4 py-2 text-sm font-medium text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg">
                      Admin
                    </Link>
                  )}
                  <Link href="/profile" className="block px-4 py-2 text-sm font-medium text-text-main dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg">
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="ml-2 rounded-full bg-text-main px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-black"
            >
              Đăng Nhập
            </Link>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-background-light dark:bg-black/20 text-text-main dark:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartCount={cartCount}
      />
    </header>
  );
};

export default Header;
