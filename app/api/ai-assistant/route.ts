// app/api/ai-assistant/route.ts - AI Assistant Chat API

import { NextRequest, NextResponse } from 'next/server';
import { queryAIAssistant } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export interface AIMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface DatabaseContext {
    totalCategories: number;
    categories: Array<{ id: number; name: string; slug: string }>;
    totalProducts: number;
    productsSummary: Array<{
        id: string;
        name: string;
        price: number;
        category: string;
        stock: number;
        isBestSeller: boolean;
    }>;
    priceRange: { min: number; max: number };
}

/**
 * Build database context for AI prompt
 */
async function buildDatabaseContext(): Promise<DatabaseContext> {
    try {
        // 1. Get categories
        const { data: categories, error: categoriesError } = await supabase
            .from('categories')
            .select('id, name, slug')
            .order('name');

        if (categoriesError) throw categoriesError;

        // 2. Get products with category info
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select(`
                id,
                name,
                price,
                stock,
                is_best_seller,
                category_id,
                categories!inner(name)
            `)
            .order('name');

        if (productsError) throw productsError;

        // 3. Build products summary
        const productsSummary = products?.map((p: any) => ({
            id: String(p.id),
            name: p.name,
            price: Number(p.price),
            category: p.categories?.name || 'N/A',
            stock: p.stock || 0,
            isBestSeller: p.is_best_seller || false,
        })) || [];

        // 4. Calculate price range
        const prices = productsSummary.map(p => p.price);
        const priceRange = {
            min: prices.length > 0 ? Math.min(...prices) : 0,
            max: prices.length > 0 ? Math.max(...prices) : 0,
        };

        return {
            totalCategories: categories?.length || 0,
            categories: categories || [],
            totalProducts: products?.length || 0,
            productsSummary,
            priceRange,
        };
    } catch (error) {
        console.error('Error building database context:', error);
        // Return empty context on error
        return {
            totalCategories: 0,
            categories: [],
            totalProducts: 0,
            productsSummary: [],
            priceRange: { min: 0, max: 0 },
        };
    }
}

/**
 * POST /api/ai-assistant
 * Handle AI assistant chat requests
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, conversationHistory } = body;

        // Validate input
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Build database context
        const databaseContext = await buildDatabaseContext();

        // Query AI assistant
        const reply = await queryAIAssistant(
            message.trim(),
            databaseContext,
            conversationHistory || []
        );

        return NextResponse.json({
            success: true,
            reply,
        });

    } catch (error) {
        console.error('AI Assistant API error:', error);

        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
            },
            { status: 500 }
        );
    }
}
