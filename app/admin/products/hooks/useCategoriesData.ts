import { useState, useEffect } from 'react';
import { supabase } from '../../../../lib/supabase';

interface Category {
    id: string;
    name: string;
}

interface UseCategoriesDataReturn {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

export function useCategoriesData(): UseCategoriesDataReturn {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from('categories')
                .select('id, name')
                .order('name');

            if (fetchError) throw fetchError;

            setCategories(data || []);
        } catch (err: any) {
            console.error('Failed to fetch categories:', err);
            setError(err.message || 'Không thể tải danh mục');
        } finally {
            setLoading(false);
        }
    };

    return { categories, loading, error };
}
