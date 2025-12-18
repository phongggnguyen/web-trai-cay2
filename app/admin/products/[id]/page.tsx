'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function AdminProductForm() {
    const params = useParams();
    const router = useRouter();
    const isNew = params.id === 'new';
    const id = params.id;

    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        stock: '',
        sku: '',
        category: 'Trái cây nội',
        status: 'In Stock',
        image: '',
    });

    // Mock Load Data if Edit Mode
    useEffect(() => {
        if (!isNew) {
            // Simulate fetching data
            setFormData({
                name: 'Dưa Lưới Hoàng Kim (VietGAP)',
                description: 'Dưa lưới Hoàng Kim có vỏ vàng tươi, vân lưới trắng đẹp mắt. Ruột màu cam, vị ngọt đậm đà, thơm mát.',
                price: '125000',
                originalPrice: '150000',
                stock: '45',
                sku: 'SP-001',
                category: 'Trái cây nội',
                status: 'In Stock',
                image: 'https://images.unsplash.com/photo-1598155523122-38423bb4d6c1?q=80&w=250&auto=format&fit=crop',
            });
        }
    }, [isNew]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            router.push('/admin/products');
        }, 1000);
    };

    return (
        <div className="max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/products"
                        className="w-10 h-10 rounded-xl border border-gray-200 dark:border-border-dark flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-black text-text-main dark:text-white tracking-tight">
                            {isNew ? 'Thêm Sản phẩm mới' : 'Chỉnh sửa Sản phẩm'}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            {isNew ? 'Tạo mới sản phẩm và thêm vào kho hàng' : `Cập nhật thông tin cho sản phẩm #${id}`}
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/products')}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-border-dark font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        disabled={isLoading}
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-transform active:scale-95 flex items-center gap-2"
                        disabled={isLoading}
                    >
                        {isLoading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                        {isNew ? 'Tạo Sản phẩm' : 'Lưu Thay đổi'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* General Info */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">description</span>
                            Thông tin chung
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Tên sản phẩm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="VD: Dưa Lưới Hoàng Kim"
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Mô tả sản phẩm
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Mô tả chi tiết về sản phẩm..."
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                ></textarea>
                                <p className="text-right text-xs text-gray-400 mt-1">0/2000 ký tự</p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Panel */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-green-600">payments</span>
                            Giá cả
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Giá bán (VNĐ) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="block w-full pl-4 pr-12 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">VNĐ</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Giá gốc (Tùy chọn)
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="originalPrice"
                                        value={formData.originalPrice}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="block w-full pl-4 pr-12 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">VNĐ</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Nhập giá cao hơn giá bán để hiển thị giảm giá.</p>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Panel */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-blue-600">inventory</span>
                            Kho hàng
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Mã SKU <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    placeholder="VD: SP-001"
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all uppercase tracking-wider font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Số lượng tồn kho <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="space-y-8">
                    {/* Media Upload */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">Hình ảnh</h3>

                        <div className="aspect-square w-full rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group overflow-hidden relative">
                            {formData.image ? (
                                <>
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover absolute inset-0" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white font-bold">Thay đổi ảnh</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">add_a_photo</span>
                                    </div>
                                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 group-hover:text-primary">Tải ảnh lên</p>
                                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP (Max 5MB)</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark p-6 shadow-sm">
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-6">Phân loại</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Danh mục
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-white/5 text-text-main dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                >
                                    <option value="Trái cây nội">Trái cây nội</option>
                                    <option value="Trái cây ngoại">Trái cây ngoại</option>
                                    <option value="Quà tặng">Quà tặng</option>
                                    <option value="Rau củ">Rau củ</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                    Trạng thái
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className={`block w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl font-bold transition-all focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary ${formData.status === 'In Stock' ? 'text-green-600 bg-green-50 dark:bg-green-900/10' :
                                            formData.status === 'Low Stock' ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/10' :
                                                'text-red-600 bg-red-50 dark:bg-red-900/10'
                                        }`}
                                >
                                    <option value="In Stock">In Stock (Còn hàng)</option>
                                    <option value="Low Stock">Low Stock (Sắp hết)</option>
                                    <option value="Out of Stock">Out of Stock (Hết hàng)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
