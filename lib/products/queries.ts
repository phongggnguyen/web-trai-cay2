import { supabase } from '@/lib/supabase';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    unit: string;
    category: string;
    stock: number;
    rating?: number;
    reviews?: number;
}

/**
 * Fetch the first/latest product from the database
 * Used for the "Hot Product" widget on the blog page
 */
export async function getLatestProduct(): Promise<Product | null> {

    const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url, description, unit, stock, rating, reviews')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching latest product:', error);
        return null;
    }

    // Map database fields to interface
    return {
        ...data,
        image: data.image_url,
        category: 'Trái Cây' // Default category since it's not in the fetched data
    };
}
