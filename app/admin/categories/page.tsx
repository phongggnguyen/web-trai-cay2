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

    // Filter Logic
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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
            // Close form
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
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">
                        Quản lý Danh mục
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                        Quản lý danh mục sản phẩm trong hệ thống
                    </p>
                </div>

                <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-xl font-bold shadow-lg shadow-primary/30 transition-all transform hover:scale-105"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Thêm Danh mục
                </button>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-border-dark flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <span className="material-symbols-outlined">category</span>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Tổng danh mục</p>
                        <p className="text-2xl font-black text-text-main dark:text-white">{totalCategories}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-border-dark flex items-center gap-4 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <span className="material-symbols-outlined">inventory_2</span>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Tổng sản phẩm</p>
                        <p className="text-2xl font-black text-text-main dark:text-white">{totalProducts}</p>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-border-dark shadow-sm">
                <div className="relative w-full sm:w-96">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm tên danh mục..."
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-white/5 text-text-main dark:text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
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
                                    <th className="px-6 py-4 font-bold">Tên danh mục</th>
                                    <th className="px-6 py-4 font-bold">Slug</th>
                                    <th className="px-6 py-4 font-bold">Mô tả</th>
                                    <th className="px-6 py-4 font-bold">Số sản phẩm</th>
                                    <th className="px-6 py-4 font-bold text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-border-dark/50">
                                {filteredCategories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                    >
                                        {/* Name */}
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-text-main dark:text-white">
                                                {category.name}
                                            </p>
                                        </td>

                                        {/* Slug */}
                                        <td className="px-6 py-4">
                                            <code className="px-2 py-1 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-mono">
                                                {category.slug}
                                            </code>
                                        </td>

                                        {/* Description */}
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {category.description || '—'}
                                            </p>
                                        </td>

                                        {/* Product Count */}
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold">
                                                {category.product_count || 0} sản phẩm
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                                                    title="Chỉnh sửa"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
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
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="material-symbols-outlined text-[48px] opacity-20">
                                                    category
                                                </span>
                                                <p>Không tìm thấy danh mục nào</p>
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
                    <div className="max-w-lg w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-surface-dark rounded-2xl shadow-2xl p-6">
                        <h3 className="text-xl font-black text-text-main dark:text-white mb-6">
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
        </div>
    );
}
