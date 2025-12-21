import { useState } from 'react';
import { supabase } from '../../../../lib/supabase';
import toast from 'react-hot-toast';

interface UseImageUploadReturn {
    uploading: boolean;
    uploadImage: (file: File) => Promise<string>;
    deleteImage: (imageUrl: string) => Promise<void>;
}

export function useImageUpload(): UseImageUploadReturn {
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (file: File): Promise<string> => {
        try {
            setUploading(true);

            // Validate file type
            if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                throw new Error('Chỉ chấp nhận file JPG, PNG, WEBP');
            }

            // Validate file size (5MB)
            if (file.size > 5000000) {
                throw new Error('Ảnh không được lớn hơn 5MB');
            }

            // Generate unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
            const filePath = `products/${fileName}`;

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('product-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (error: any) {
            console.error('Upload failed:', error);
            toast.error(error.message || 'Không thể upload ảnh');
            throw error;
        } finally {
            setUploading(false);
        }
    };

    const deleteImage = async (imageUrl: string): Promise<void> => {
        try {
            // Extract path from URL
            const urlParts = imageUrl.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const filePath = `products/${fileName}`;

            const { error } = await supabase.storage
                .from('product-images')
                .remove([filePath]);

            if (error) throw error;
        } catch (error: any) {
            console.error('Delete image failed:', error);
            // Don't throw - deletion failure shouldn't block other operations
        }
    };

    return {
        uploading,
        uploadImage,
        deleteImage,
    };
}
