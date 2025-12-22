'use client';

import React, { useState } from 'react';
import { useCategoriesData } from './hooks/useCategoriesData';
import { CategoryForm } from './_components/CategoryForm';
import type { Category, CategoryFormInput } from './types';

export default function AdminCategoriesPage() {
    const { categories, loading, error, createCategory, updateCategory, deleteCategory } = useCategoriesData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    // Filter & Sort Logic
    let filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort
    if (sortBy === 'name') {
        filteredCategories = [...filteredCategories].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'products') {
        filteredCategories = [...filteredCategories].sort((a, b) => (b.product_count || 0) - (a.product_count || 0));
    }

    // Calculate Stats
    const totalCategories = categories.length;
    const totalProducts = categories.reduce((sum, cat) => sum + (cat.product_count || 0), 0);

    const handleFormSubmit = async (data: CategoryFormInput) => {
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, data);
            } else {
                await createCategory(data);
            }
            setIsFormOpen(false);
            setEditingCategory(null);
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsFormOpen(true);
    };

    const handleDelete = async (category: Category) => {
        if (category.product_count && category.product_count > 0) {
            if (!confirm(`Danh mục "${category.name}" có ${category.product_count} sản phẩm.\n\nBạn cần chuyển các sản phẩm này sang danh mục khác trước khi xóa.`)) {
                return;
            }
        } else {
            if (!confirm(`Bạn có chắc muốn xóa danh mục "${category.name}"?`)) {
                return;
            }
        }
        await deleteCategory(category.id);
    };

    const handleAddNew = () => {
        setEditingCategory(null);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingCategory(null);
    };

    return (
        <main className="flex-1 flex flex-col gap-6">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 text-sm">
                <a className="text-text-secondary hover:text-primary transition-colors font-medium" href="/admin">
                    Dashboard
                </a>
                <span className="text-text-secondary font-medium">/</span>
                <span className="text-white font-medium">Danh Mục</span>
            </div>

            {/* Page Heading & Stats */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                        Quản Lý Danh Mục
                    </h1>
                    <p className="text-text-secondary text-base font-normal">
                        Xem, chỉnh sửa và quản lý các loại sản phẩm trong cửa hàng.
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-col items-end px-4 py-2 bg-surface-dark rounded-lg border border-white/5">
                        <span className="text-text-secondary text-xs">Tổng danh mục</span>
                        <span className="text-white text-xl font-bold">{totalCategories}</span>
                    </div>
                    <div className="flex flex-col items-end px-4 py-2 bg-surface-dark rounded-lg border border-white/5">
                        <span className="text-text-secondary text-xs">Tổng sản phẩm</span>
                        <span className="text-white text-xl font-bold">{totalProducts}</span>
                    </div>
                </div>
            </div>

            {/* Toolbar: Search & Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-surface-dark/30 p-4 rounded-xl border border-surface-dark">
                {/* Search */}
                <div className="flex-1 max-w-lg">
                    <label className="flex w-full items-center rounded-lg bg-surface-dark border border-transparent focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all h-12 overflow-hidden">
                        <div className="flex items-center justify-center pl-4 text-text-secondary">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            className="w-full bg-transparent border-none text-white placeholder:text-text-secondary px-4 focus:ring-0 h-full text-base outline-none"
                            placeholder="Tìm kiếm tên danh mục..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </label>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-text-secondary text-sm font-medium">Sắp xếp:</span>
                        <select
                            className="bg-surface-dark text-white text-sm border-none rounded-lg focus:ring-1 focus:ring-primary cursor-pointer py-2 pl-3 pr-8"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="name">Tên A-Z</option>
                            <option value="products">Số lượng SP</option>
                        </select>
                    </div>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-green-400 text-black h-12 px-5 rounded-lg font-bold text-sm tracking-wide transition-all shadow-[0_0_15px_rgba(76,223,32,0.3)] hover:shadow-[0_0_20px_rgba(76,223,32,0.5)]"
                    >
                        <span className="material-symbols-outlined text-[20px] font-bold">add</span>
                        <span>Thêm Danh Mục</span>
                    </button>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="rounded-xl border border-red-800 bg-red-900/20 p-4">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-400">error</span>
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                </div>
            )}

            {/* Data Table */}
            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                </div>
            ) : (
                <div className="flex flex-col rounded-xl border border-surface-dark bg-surface-dark/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-dark border-b border-white/5">
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary w-16 text-center">
                                        ID
                                    </th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary min-w-[200px]">
                                        Tên Danh Mục
                                    </th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">
                                        Slug
                                    </th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary">
                                        Mô Tả
                                    </th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-center">
                                        Số Lượng SP
                                    </th>
                                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-secondary text-right">
                                        Hành Động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredCategories.map((category, index) => (
                                    <tr key={category.id} className="group hover:bg-surface-dark/50 transition-colors">
                                        {/* ID */}
                                        <td className="p-4 text-text-secondary text-sm font-medium text-center">
                                            #{String(index + 1).padStart(3, '0')}
                                        </td>

                                        {/* Name */}
                                        <td className="p-4">
                                            <p className="text-white text-sm font-bold group-hover:text-primary transition-colors">
                                                {category.name}
                                            </p>
                                        </td>

                                        {/* Slug */}
                                        <td className="p-4">
                                            <code className="text-text-secondary text-xs font-mono bg-black/20 px-2 py-1 rounded">
                                                {category.slug}
                                            </code>
                                        </td>

                                        {/* Description */}
                                        <td className="p-4 text-text-secondary text-sm max-w-xs truncate">
                                            {category.description || '—'}
                                        </td>

                                        {/* Product Count */}
                                        <td className="p-4 text-white text-sm font-bold text-center">
                                            {category.product_count || 0}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="p-2 text-text-secondary hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                                    title="Chỉnh sửa"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category)}
                                                    className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Xóa"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredCategories.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-text-secondary">
                                            <div className="flex flex-col items-center gap-3">
                                                <span className="material-symbols-outlined text-[64px] opacity-20">
                                                    category
                                                </span>
                                                <p className="text-base">Không tìm thấy danh mục nào</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {filteredCategories.length > 0 && (
                        <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-surface-dark border-t border-white/5 gap-4">
                            <p className="text-sm text-text-secondary">
                                Hiển thị <span className="text-white font-bold">1-{filteredCategories.length}</span> trên{' '}
                                <span className="text-white font-bold">{totalCategories}</span> danh mục
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
                    <div className="max-w-lg w-full max-h-[90vh] overflow-y-auto bg-surface-dark rounded-2xl shadow-2xl p-6 border border-white/10">
                        <h3 className="text-xl font-black text-white mb-6">
                            {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                        </h3>
                        <CategoryForm
                            category={editingCategory}
                            onSubmit={handleFormSubmit}
                            onCancel={handleCloseForm}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
