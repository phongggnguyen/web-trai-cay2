import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    original_price: number | null;
    image_url: string;
    unit: string;
    stock: number;
    is_best_seller: boolean;
    tags: string[] | null;
    category_id: number | null;
    category?: {
        name: string;
    };
}

interface UseProductRecommendationsReturn {
    recommendations: any[];
    isLoading: boolean;
    error: string | null;
}

export function useProductRecommendations(userId: string | null): UseProductRecommendationsReturn {
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            // Nếu user chưa đăng nhập, không fetch
            if (!userId) {
                setRecommendations([]);
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                // Bước 1: Lấy tất cả order_id của user
                const { data: orders, error: ordersError } = await supabase
                    .from('orders')
                    .select('id')
                    .eq('user_id', userId);

                if (ordersError) throw ordersError;

                // Nếu user chưa có đơn hàng nào
                if (!orders || orders.length === 0) {
                    setRecommendations([]);
                    setIsLoading(false);
                    return;
                }

                const orderIds = orders.map(o => o.id);

                // Bước 2: Lấy tất cả product_id từ order_items
                const { data: orderItems, error: itemsError } = await supabase
                    .from('order_items')
                    .select('product_id')
                    .in('order_id', orderIds)
                    .not('product_id', 'is', null); // Chỉ lấy items có product_id

                if (itemsError) throw itemsError;

                if (!orderItems || orderItems.length === 0) {
                    setRecommendations([]);
                    setIsLoading(false);
                    return;
                }

                const purchasedProductIds = orderItems
                    .map(item => item.product_id)
                    .filter(id => id !== null); // Filter out null values

                // Bước 3: Lấy category_id của các sản phẩm đã mua
                const { data: purchasedProducts, error: productsError } = await supabase
                    .from('products')
                    .select('id, category_id')
                    .in('id', purchasedProductIds);

                if (productsError) throw productsError;

                if (!purchasedProducts || purchasedProducts.length === 0) {
                    setRecommendations([]);
                    setIsLoading(false);
                    return;
                }

                // Đếm số lượng sản phẩm theo category để ưu tiên
                const categoryCount: { [key: number]: number } = {};
                const categoryIds: number[] = [];

                purchasedProducts.forEach(p => {
                    if (p.category_id !== null) {
                        categoryCount[p.category_id] = (categoryCount[p.category_id] || 0) + 1;
                        if (!categoryIds.includes(p.category_id)) {
                            categoryIds.push(p.category_id);
                        }
                    }
                });

                // Sắp xếp categories theo số lượng sản phẩm đã mua (giảm dần)
                const sortedCategories = categoryIds.sort((a, b) => categoryCount[b] - categoryCount[a]);

                // Bước 4: Lấy sản phẩm gợi ý từ các categories, loại trừ sản phẩm đã mua
                const { data: recommendedProducts, error: recommendError } = await supabase
                    .from('products')
                    .select(`
            *,
            categories ( name )
          `)
                    .in('category_id', sortedCategories)
                    .not('id', 'in', `(${purchasedProductIds.join(',')})`)
                    .limit(8);

                if (recommendError) throw recommendError;

                if (recommendedProducts && recommendedProducts.length > 0) {
                    // Map dữ liệu để tương thích với UI
                    const mappedProducts = recommendedProducts.map((item: any) => ({
                        ...item,
                        image: item.image_url,
                        originalPrice: item.original_price,
                        category: item.categories?.name,
                        tag: item.tags?.[0],
                        tagColor: item.tags?.[0] === 'HOT' ? 'red' : item.tags?.[0] === 'MỚI' ? 'orange' : 'primary'
                    }));

                    setRecommendations(mappedProducts);
                } else {
                    setRecommendations([]);
                }

            } catch (err: any) {
                console.error('Error fetching product recommendations:', err);
                setError(err.message || 'Lỗi khi tải gợi ý sản phẩm');
                setRecommendations([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, [userId]);

    return { recommendations, isLoading, error };
}
