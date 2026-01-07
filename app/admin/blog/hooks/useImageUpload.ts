import { useState } from 'react';
import toast from 'react-hot-toast';

interface UseImageUploadReturn {
    uploadImage: (file: File, folder?: string) => Promise<string>;
    deleteImage: (url: string) => Promise<void>;
    uploading: boolean;
}

export function useImageUpload(): UseImageUploadReturn {
    const [uploading, setUploading] = useState(false);

    const uploadImage = async (file: File, folder: string = 'blog-images'): Promise<string> => {
        try {
            setUploading(true);

            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('File phải là định dạng ảnh');
            }

            // Validate file size (5MB)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                throw new Error('Kích thước file không được vượt quá 5MB');
            }

            // Generate unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { supabase } = await import('../../../../lib/supabase');
            const { data, error } = await supabase.storage
                .from(folder)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) throw error;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from(folder)
                .getPublicUrl(data.path);

            return urlData.publicUrl;
        } catch (err: any) {
            console.error('Upload failed:', err);
            toast.error(err.message || 'Không thể upload ảnh');
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const deleteImage = async (url: string): Promise<void> => {
        try {
            if (!url) return;

            // Extract file path from URL
            const urlParts = url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const folder = urlParts[urlParts.length - 2];

            if (!fileName || !folder) return;

            const { supabase } = await import('../../../../lib/supabase');
            const { error } = await supabase.storage
                .from(folder)
                .remove([fileName]);

            if (error) throw error;
        } catch (err: any) {
            console.error('Delete failed:', err);
            // Don't show error toast for delete failures (not critical)
        }
    };

    return {
        uploadImage,
        deleteImage,
        uploading,
    };
}
