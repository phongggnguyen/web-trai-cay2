// app/api/search/ai/text/route.ts - Text-based AI Search API

import { NextRequest, NextResponse } from 'next/server';
import { analyzeTextQuery } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('query');

        if (!query || query.trim().length === 0) {
            return NextResponse.json(
                { error: 'Query parameter is required' },
                { status: 400 }
            );
        }

        // Fetch all products from Supabase
        const { data: products, error } = await supabase
            .from('products')
            .select('id, name, category, origin');

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch products from database' },
                { status: 500 }
            );
        }

        if (!products || products.length === 0) {
            return NextResponse.json({
                success: true,
                productIds: [],
                message: 'No products available',
            });
        }

        // Use Gemini AI to analyze the query
        const productIds = await analyzeTextQuery(query, products);

        return NextResponse.json({
            success: true,
            query,
            productIds,
            totalMatches: productIds.length,
        });

    } catch (error) {
        console.error('AI Text Search error:', error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Internal server error',
                fallback: true,
            },
            { status: 500 }
        );
    }
}
