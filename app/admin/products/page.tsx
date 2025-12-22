'use client';

import React, { useState } from 'react';
import { useProductsData } from './hooks/useProductsData';
import { useCategoriesData } from './hooks/useCategoriesData';
import { ProductForm } from './_components/ProductForm';
import type { Product } from './types';

export default function AdminProductsPage() {
    const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProductsData();
    const { categories } = useCategoriesData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toString().toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
            filterCategory === 'all' || product.category_id === filterCategory;

        return matchesSearch && matchesCategory;
    });

    // Calculate Stats
    const totalProducts = products.length;
    const outOfStock = products.filter(p => p.stock === 0).length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length;

    const handleFormSubmit = async (data: any, imageFile?: File | null, currentImageUrl?: string | null) => {
        const formData = {
            ...data,
            image: imageFile,
        };

        if (editingProduct) {
            await updateProduct(editingProduct.id, formData, currentImageUrl);
        } else {
            await createProduct(formData);
        }

        // Close form
        setIsFormOpen(false);
        setEditingProduct(null);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleDelete = async (product: Product) => {
        if (confirm(`Bạn có chắc muốn xóa "${product.name}"?`)) {
            await deleteProduct(product.id, product.image_url);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">
                        Quản lý Sản phẩm
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Danh sách sản phẩm, tồn kho và danh mục
                    </p>
                </div>

                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all transform hover:scale-105"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Thêm Sản phẩm
                </button>
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
                        placeholder="Tìm tên sản phẩm..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-white/5 text-text-main dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filter Categories */}
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-surface-dark text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-medium"
                >
                    <option value="all">Tất cả danh mục</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product Table */}
            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
            ) : error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-900/20">
                    <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-border-dark text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-bold">Sản phẩm</th>
                                    <th className="px-6 py-4 font-bold">Danh mục</th>
                                    <th className="px-6 py-4 font-bold">Giá bán</th>
                                    <th className="px-6 py-4 font-bold">Tồn kho</th>
                                    <th className="px-6 py-4 font-bold text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-border-dark/50">
                                {filteredProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        {/* Product Info */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                {product.image_url ? (
                                                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                                        <span className="material-symbols-outlined text-gray-400">image</span>
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-text-main dark:text-white truncate">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-0.5">ID: #{product.id.toString().slice(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-bold capitalize">
                                                {product.category}
                                            </span>
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-primary">
                                                {product.price.toLocaleString()}đ
                                            </p>
                                        </td>

                                        {/* Stock Status */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`w-2 h-2 rounded-full ${product.stock === 0
                                                            ? 'bg-red-500'
                                                            : product.stock < 10
                                                                ? 'bg-yellow-500'
                                                                : 'bg-green-500'
                                                            }`}
                                                    ></span>
                                                    <span
                                                        className={`text-sm font-bold ${product.stock === 0
                                                            ? 'text-red-600'
                                                            : product.stock < 10
                                                                ? 'text-yellow-600'
                                                                : 'text-green-600'
                                                            }`}
                                                    >
                                                        {product.stock}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                                                    title="Chỉnh sửa"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                                                    title="Xóa"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="material-symbols-outlined text-[48px] opacity-20">
                                                    inventory_2
                                                </span>
                                                <p>Không tìm thấy sản phẩm nào</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-surface-dark rounded-2xl shadow-2xl p-6">
                        <h3 className="text-xl font-black text-text-main dark:text-white mb-6">
                            {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                        </h3>
                        <ProductForm
                            product={editingProduct}
                            onSubmit={handleFormSubmit}
                            onCancel={() => {
                                setIsFormOpen(false);
                                setEditingProduct(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
