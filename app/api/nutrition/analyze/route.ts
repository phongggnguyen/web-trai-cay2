import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
    analyzeOrderNutrition,
    suggestNutritionProducts,
    type OrderItem,
    type ProductForSuggestion,
} from '../../../../lib/gemini';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
    try {
        const { orderId } = await request.json();

        if (!orderId) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            );
        }

        // Fetch order with items
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('*, order_items(*)')
            .eq('id', orderId)
            .single();

        if (orderError || !order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        if (!order.order_items || order.order_items.length === 0) {
            return NextResponse.json(
                { error: 'Order has no items' },
                { status: 400 }
            );
        }

        // Fetch all products for suggestions
        const { data: allProducts, error: productsError } = await supabase
            .from('products')
            .select('id, name, category, price, image, unit');

        if (productsError) {
            console.error('Error fetching products:', productsError);
        }

        console.log(`[Nutrition API] Fetched ${allProducts?.length || 0} products from database`);

        // Prepare order items for analysis
        const orderItems: OrderItem[] = order.order_items.map((item: any) => ({
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            unit: item.unit || 'kg',
        }));

        // Analyze nutrition
        const nutritionAnalysis = await analyzeOrderNutrition(orderItems);

        // Get product suggestions
        let suggestedProducts: ProductForSuggestion[] = [];
        if (allProducts && allProducts.length > 0) {
            const productsForSuggestion: ProductForSuggestion[] = allProducts.map((p: any) => ({
                id: p.id,
                name: p.name,
                category: p.category || 'Khác',
                price: p.price,
                image: p.image,
                unit: p.unit || 'kg',
            }));

            console.log(`[Nutrition API] Sending ${productsForSuggestion.length} products to AI for suggestions`);
            console.log(`[Nutrition API] Product names: ${productsForSuggestion.map(p => p.name).join(', ')}`);

            suggestedProducts = await suggestNutritionProducts(
                nutritionAnalysis,
                productsForSuggestion
            );

            console.log(`[Nutrition API] AI returned ${suggestedProducts.length} suggested products`);
        } else {
            console.warn('[Nutrition API] No products available in database for suggestions');
        }

        return NextResponse.json({
            analysis: nutritionAnalysis,
            suggestedProducts,
        });
    } catch (error: any) {
        console.error('Error in nutrition analysis API:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
