'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Mock Data for Products
const MOCK_PRODUCTS = [
  {
    id: 'SP-001',
    name: 'Dưa Lưới Hoàng Kim (VietGAP)',
    category: 'Trái cây nội',
    image: 'https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?q=80&w=250&auto=format&fit=crop',
    price: 125000,
    originalPrice: 150000,
    stock: 45,
    status: 'In Stock', // In Stock, Low Stock, Out of Stock
    sold: 120,
  },
  {
    id: 'SP-002',
    name: 'Nho Mẫu Đơn Hàn Quốc (Shine Muscat)',
    category: 'Trái cây ngoại',
    image: 'https://images.unsplash.com/photo-1596363505729-41905a9a12a2?q=80&w=250&auto=format&fit=crop',
    price: 850000,
    originalPrice: 0,
    stock: 12,
    status: 'Low Stock',
    sold: 56,
  },
  {
    id: 'SP-003',
    name: 'Táo Envy Size Lớn',
    category: 'Trái cây ngoại',
    image: 'https://images.unsplash.com/photo-1619546813926-a78faf63030c?q=80&w=250&auto=format&fit=crop',
    price: 220000,
    originalPrice: 250000,
    stock: 0,
    status: 'Out of Stock',
    sold: 340,
  },
  {
    id: 'SP-004',
    name: 'Cam Vàng Navel Úc',
    category: 'Trái cây ngoại',
    image: 'https://images.unsplash.com/photo-1547514301-ec456e778bd7?q=80&w=250&auto=format&fit=crop',
    price: 110000,
    originalPrice: 0,
    stock: 150,
    status: 'In Stock',
    sold: 89,
  },
  {
    id: 'SP-005',
    name: 'Xoài Cát Hòa Lộc',
    category: 'Trái cây nội',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=250&auto=format&fit=crop',
    price: 95000,
    originalPrice: 0,
    stock: 20,
    status: 'Low Stock',
    sold: 210,
  },
  {
    id: 'SP-006',
    name: 'Giỏ Quà Tết Sum Vầy',
    category: 'Quà tặng',
    image: 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?q=80&w=250&auto=format&fit=crop',
    price: 1500000,
    originalPrice: 1800000,
    stock: 5,
    status: 'Low Stock',
    sold: 15,
  }
];

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Filter Logic
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate Stats
  const totalProducts = MOCK_PRODUCTS.length;
  const outOfStock = MOCK_PRODUCTS.filter(p => p.stock === 0).length;
  const lowStock = MOCK_PRODUCTS.filter(p => p.stock > 0 && p.stock < 20).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">Quản lý Sản phẩm</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Danh sách sản phẩm, tồn kho và danh mục</p>
        </div>
        
        <Link 
            href="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all transform hover:scale-105"
        >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Thêm Sản phẩm
        </Link>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-border-dark flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Tổng sản phẩm</p>
                <p className="text-2xl font-black text-text-main dark:text-white">{totalProducts}</p>
            </div>
        </div>
        <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-border-dark flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                <span className="material-symbols-outlined">production_quantity_limits</span>
            </div>
            <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Hết hàng</p>
                <p className="text-2xl font-black text-text-main dark:text-white">{outOfStock}</p>
            </div>
        </div>
        <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-border-dark flex items-center gap-4 shadow-sm">
             <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                <span className="material-symbols-outlined">warning</span>
            </div>
            <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Sắp hết hàng</p>
                <p className="text-2xl font-black text-text-main dark:text-white">{lowStock}</p>
            </div>
        </div>
      </div>

      {/* Controls: Search & Filter */}
      <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-border-dark shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Search */}
        <div className="relative w-full sm:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input 
                type="text" 
                placeholder="Tìm tên sản phẩm, mã SKU..." 
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-white/5 text-text-main dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Filter Categories */}
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Trái cây nội', 'Trái cây ngoại', 'Quà tặng'].map(cat => (
                <button 
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all border ${
                        filterCategory === cat 
                        ? 'bg-text-main text-white border-text-main dark:bg-white dark:text-text-main' 
                        : 'bg-white dark:bg-transparent border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                >
                    {cat === 'All' ? 'Tất cả' : cat}
                </button>
            ))}
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-border-dark text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                        <th className="px-6 py-4 font-bold">Sản phẩm</th>
                        <th className="px-6 py-4 font-bold">Danh mục</th>
                        <th className="px-6 py-4 font-bold">Giá bán</th>
                        <th className="px-6 py-4 font-bold">Tồn kho</th>
                        <th className="px-6 py-4 font-bold">Đã bán</th>
                        <th className="px-6 py-4 font-bold text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-border-dark/50">
                    {filteredProducts.map(product => (
                        <tr key={product.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                            {/* Product Info */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-text-main dark:text-white truncate">{product.name}</p>
                                            {product.originalPrice > product.price && (
                                                <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded">Sale</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-0.5">Mã: {product.id}</p>
                                    </div>
                                </div>
                            </td>
                            
                            {/* Category */}
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold">
                                    {product.category}
                                </span>
                            </td>

                            {/* Price */}
                            <td className="px-6 py-4">
                                <p className="text-sm font-bold text-primary">{product.price.toLocaleString()}đ</p>
                                {product.originalPrice > 0 && (
                                    <p className="text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString()}đ</p>
                                )}
                            </td>

                            {/* Stock Status */}
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${
                                            product.stock === 0 ? 'bg-red-500' : 
                                            product.stock < 20 ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}></span>
                                        <span className={`text-sm font-bold ${
                                            product.stock === 0 ? 'text-red-600' : 
                                            product.stock < 20 ? 'text-yellow-600' : 'text-green-600'
                                        }`}>
                                            {product.stock}
                                        </span>
                                    </div>
                                    {product.stock === 0 ? (
                                        <span className="text-[10px] text-red-400 font-medium">Hết hàng</span>
                                    ) : product.stock < 20 ? (
                                        <span className="text-[10px] text-yellow-500 font-medium">Sắp hết</span>
                                    ) : (
                                        <span className="text-[10px] text-green-500 font-medium">Sẵn hàng</span>
                                    )}
                                </div>
                            </td>

                            {/* Sold */}
                            <td className="px-6 py-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                                {product.sold} đơn vị
                            </td>

                            {/* Actions */}
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all" title="Chỉnh sửa">
                                        <span className="material-symbols-outlined text-[20px]">edit</span>
                                    </button>
                                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all" title="Xóa">
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {filteredProducts.length === 0 && (
                        <tr>
                            <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                <div className="flex flex-col items-center gap-2">
                                     <span className="material-symbols-outlined text-[48px] opacity-20">inventory_2</span>
                                     <p>Không tìm thấy sản phẩm nào</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        {/* Pagination (Placeholder) */}
        <div className="p-4 border-t border-gray-100 dark:border-border-dark flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>Hiển thị 1-6 trong số 24 sản phẩm</span>
            <div className="flex gap-2">
                <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50">Trước</button>
                <button className="px-3 py-1 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5">Sau</button>
            </div>
        </div>
      </div>
    </div>
  );
}
