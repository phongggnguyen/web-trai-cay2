import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '../../../../lib/supabase';
import { useImageUpload } from './useImageUpload';
import { generateSlug } from '../utils/generateSlug';
import type { Product, ProductFormData } from '../types';

interface UseProductsDataReturn {
    products: Product[];
    loading: boolean;
    error: string | null;
    createProduct: (data: ProductFormData) => Promise<void>;
    updateProduct: (id: string, data: ProductFormData, currentImageUrl?: string | null) => Promise<void>;
    deleteProduct: (id: string, imageUrl?: string | null) => Promise<void>;
    refetch: () => Promise<void>;
}

export function useProductsData(): UseProductsDataReturn {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { uploadImage, deleteImage } = useImageUpload();

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('products')
                .select(`
                    *,
                    categories!inner(name)
                `)
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            // Transform data to include category name
            const productsWithCategory = (data || []).map(item => ({
                ...item,
                category: item.categories?.name || 'Không có danh mục',
            }));

            setProducts(productsWithCategory as Product[]);
        } catch (err: any) {
            console.error('Failed to fetch products:', err);
            setError(err.message || 'Không thể tải danh sách sản phẩm');
            toast.error('Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const createProduct = async (data: ProductFormData) => {
        try {
            let imageUrl: string | null = null;

            // Upload image if provided
            if (data.image) {
                imageUrl = await uploadImage(data.image);
            }

            // Generate slug from product name
            const slug = generateSlug(data.name);

            // Insert into database
            const { data: newProduct, error: insertError } = await supabase
                .from('products')
                .insert({
                    name: data.name,
                    slug: slug,
                    description: data.description || null,
                    price: data.price,
                    stock: data.stock,
                    category_id: data.category_id,
                    image_url: imageUrl,
                })
                .select()
                .single();

            if (insertError) throw insertError;

            // Fetch the complete product with category name
            const { data: completeProduct, error: fetchError } = await supabase
                .from('products')
                .select(`
                    *,
                    categories!inner(name)
                `)
                .eq('id', newProduct.id)
                .single();

            if (fetchError) throw fetchError;

            // Add category name to product
            const productWithCategory = {
                ...completeProduct,
                category: completeProduct.categories?.name || 'Không có danh mục',
            };

            // Optimistic UI update
            setProducts([productWithCategory as Product, ...products]);
            toast.success('Thêm sản phẩm thành công');
        } catch (err: any) {
            console.error('Failed to create product:', err);
            toast.error(err.message || 'Không thể thêm sản phẩm');
            throw err;
        }
    };

    const updateProduct = async (
        id: string,
        data: ProductFormData,
        currentImageUrl?: string | null
    ) => {
        try {
            let imageUrl = currentImageUrl;

            // Upload new image if provided
            if (data.image) {
                // Delete old image first
                if (currentImageUrl) {
                    await deleteImage(currentImageUrl);
                }
                // Upload new image
                imageUrl = await uploadImage(data.image);
            }

            // Generate new slug from updated name
            const slug = generateSlug(data.name);

            // Update database
            const { data: updatedProduct, error: updateError } = await supabase
                .from('products')
                .update({
                    name: data.name,
                    slug: slug,
                    description: data.description || null,
                    price: data.price,
                    stock: data.stock,
                    category_id: data.category_id,
                    image_url: imageUrl,
                })
                .eq('id', id)
                .select()
                .single();

            if (updateError) throw updateError;

            // Update UI
            setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
            toast.success('Cập nhật sản phẩm thành công');
        } catch (err: any) {
            console.error('Failed to update product:', err);
            toast.error(err.message || 'Không thể cập nhật sản phẩm');
            throw err;
        }
    };

    const deleteProduct = async (id: string, imageUrl?: string | null) => {
        try {
            // Delete image first if exists
            if (imageUrl) {
                await deleteImage(imageUrl);
            }

            // Delete from database
            const { error: deleteError } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            // Update UI
            setProducts(products.filter(p => p.id !== id));
            toast.success('Xóa sản phẩm thành công');
        } catch (err: any) {
            console.error('Failed to delete product:', err);
            toast.error(err.message || 'Không thể xóa sản phẩm');
            throw err;
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        products,
        loading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
        refetch: fetchProducts,
    };
}
