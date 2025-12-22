import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../../../lib/supabase';
import { generateSlug } from '../../products/utils/generateSlug';
import type { Category, CategoryFormData } from '../types';

interface UseCategoriesDataReturn {
    categories: Category[];
    loading: boolean;
    error: string | null;
    createCategory: (data: CategoryFormData) => Promise<void>;
    updateCategory: (id: string, data: CategoryFormData) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
    refetch: () => Promise<void>;
}

export function useCategoriesData(): UseCategoriesDataReturn {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch categories with product count
            const { data, error: fetchError } = await supabase
                .from('categories')
                .select(`
                    *,
                    products:products(count)
                `)
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            // Transform data to include product_count
            const categoriesWithCount = (data || []).map(item => ({
                ...item,
                product_count: item.products?.[0]?.count || 0,
            }));

            setCategories(categoriesWithCount as Category[]);
        } catch (err: any) {
            console.error('Failed to fetch categories:', err);
            setError(err.message || 'Không thể tải danh sách danh mục');
            toast.error('Không thể tải danh sách danh mục');
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (data: CategoryFormData) => {
        try {
            // Generate slug from category name
            const slug = generateSlug(data.name);

            // Insert into database
            const { data: newCategory, error: insertError } = await supabase
                .from('categories')
                .insert({
                    name: data.name,
                    slug: slug,
                    description: data.description || null,
                })
                .select()
                .single();

            if (insertError) throw insertError;

            // Add to state with product_count = 0
            const categoryWithCount = {
                ...newCategory,
                product_count: 0,
            };

            setCategories([categoryWithCount, ...categories]);
            toast.success('Thêm danh mục thành công');
        } catch (err: any) {
            console.error('Failed to create category:', err);

            // Handle duplicate slug error
            if (err.code === '23505') {
                toast.error('Tên danh mục đã tồn tại');
            } else {
                toast.error(err.message || 'Không thể thêm danh mục');
            }
            throw err;
        }
    };

    const updateCategory = async (id: string, data: CategoryFormData) => {
        try {
            // Generate new slug from updated name
            const slug = generateSlug(data.name);

            // Update database
            const { data: updatedCategory, error: updateError } = await supabase
                .from('categories')
                .update({
                    name: data.name,
                    slug: slug,
                    description: data.description || null,
                })
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            // Update UI - merge with existing product_count
            setCategories(categories.map(c =>
                c.id === id
                    ? { ...updatedCategory, product_count: c.product_count }
                    : c
            ));
            toast.success('Cập nhật danh mục thành công');
        } catch (err: any) {
            console.error('Failed to update category:', err);

            if (err.code === '23505') {
                toast.error('Tên danh mục đã tồn tại');
            } else {
                toast.error(err.message || 'Không thể cập nhật danh mục');
            }
            throw err;
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            // Check if category has products
            const category = categories.find(c => c.id === id);
            if (category && category.product_count && category.product_count > 0) {
                toast.error(`Không thể xóa danh mục có ${category.product_count} sản phẩm. Vui lòng chuyển sản phẩm sang danh mục khác trước.`);
                throw new Error('Category has products');
            }

            // Delete from database
            const { error: deleteError } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            // Update UI
            setCategories(categories.filter(c => c.id !== id));
            toast.success('Xóa danh mục thành công');
        } catch (err: any) {
            console.error('Failed to delete category:', err);
            if (err.message !== 'Category has products') {
                toast.error(err.message || 'Không thể xóa danh mục');
            }
            throw err;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
        refetch: fetchCategories,
    };
}
