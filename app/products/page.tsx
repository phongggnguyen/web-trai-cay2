'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '../../constants';

export default function ProductListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(2000000);

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category || 'Khác')))];

  const filteredProducts = PRODUCTS.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchPrice = product.price <= priceRange;
    return matchCategory && matchPrice;
  });

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-10">
      {/* Header & Breadcrumb */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-text-main dark:text-white">Cửa Hàng Trái Cây</h1>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/" className="hover:text-primary hover:underline">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span className="text-text-main dark:text-primary font-bold">Tất cả sản phẩm</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sắp xếp:</span>
          <select className="rounded-lg border-gray-200 bg-transparent text-sm font-bold text-text-main focus:border-primary focus:ring-0 dark:border-gray-700 dark:text-white">
            <option>Mới nhất</option>
            <option>Giá tăng dần</option>
            <option>Giá giảm dần</option>
            <option>Bán chạy</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8 rounded-2xl border border-border-color bg-surface-light p-6 dark:border-border-dark dark:bg-surface-dark">
            {/* Categories */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-text-main dark:text-white">Danh Mục</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        selectedCategory === cat 
                          ? 'bg-primary text-text-main font-bold' 
                          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5'
                      }`}
                    >
                      {cat}
                      {cat === 'All' && <span className="text-xs opacity-60">{PRODUCTS.length}</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-text-main dark:text-white">Khoảng Giá</h3>
              <input 
                type="range" 
                min="0" 
                max="2000000" 
                step="50000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary dark:bg-gray-700"
              />
              <div className="mt-2 flex justify-between text-xs font-bold text-gray-500">
                <span>0đ</span>
                <span>{priceRange.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            {/* Banner */}
            <div className="mt-6 rounded-xl bg-primary p-4 text-center text-text-main">
              <span className="material-symbols-outlined mb-2 text-3xl">local_shipping</span>
              <p className="font-bold">Freeship đơn từ 500k</p>
              <p className="text-xs opacity-80">Chỉ áp dụng nội thành</p>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map(product => (
                <Link 
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-color bg-surface-light transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 dark:border-border-dark dark:bg-surface-dark cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/20">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {product.tag && (
                      <div className={`absolute left-3 top-3 rounded-md px-2 py-1 text-[10px] font-bold text-white shadow-sm ${
                        product.tagColor === 'red' ? 'bg-red-500' : product.tagColor === 'orange' ? 'bg-orange-500' : 'bg-primary text-black'
                      }`}>
                        {product.tag}
                      </div>
                    )}
                    <button className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-12 items-center justify-center rounded-full bg-primary text-text-main shadow-lg transition-all duration-300 group-hover:translate-y-0 hover:bg-white hover:text-primary">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-1 text-xs font-bold text-text-muted">{product.category}</div>
                    <h3 className="mb-2 text-base font-bold text-text-main line-clamp-2 dark:text-white">{product.name}</h3>
                    <div className="mt-auto flex items-end justify-between">
                      <div className="flex flex-col">
                        {product.originalPrice && <span className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString('vi-VN')}đ</span>}
                        <span className="text-lg font-bold text-primary">{product.price.toLocaleString('vi-VN')}đ</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                        <span className="material-symbols-outlined text-[16px] text-yellow-400 fill-current">star</span>
                        {product.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-300">search_off</span>
              <h3 className="mt-4 text-xl font-bold text-gray-600 dark:text-gray-400">Không tìm thấy sản phẩm</h3>
              <p className="text-gray-500">Thử thay đổi bộ lọc hoặc tìm từ khóa khác nhé.</p>
              <button onClick={() => {setSelectedCategory('All'); setPriceRange(2000000);}} className="mt-4 text-primary font-bold hover:underline">Xóa bộ lọc</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}