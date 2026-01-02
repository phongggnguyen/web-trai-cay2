// app/api/search/ai/image/route.ts - Image-based AI Search API

import { NextRequest, NextResponse } from 'next/server';
import { analyzeImage, validateImageSize } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image } = body;

        if (!image || typeof image !== 'string') {
            return NextResponse.json(
                { error: 'Image data (base64) is required' },
                { status: 400 }
            );
        }

        // Validate image size
        if (!validateImageSize(image)) {
            return NextResponse.json(
                { error: 'Image size exceeds 4MB limit' },
                { status: 400 }
            );
        }

        // Use Gemini Vision AI to analyze the image
        const { description, productHints } = await analyzeImage(image);

        // Search products based on AI hints
        let matchedProducts: any[] = [];

        if (productHints.length > 0) {
            // Build a query to search for products matching the hints
            const { data: products, error } = await supabase
                .from('products')
                .select('id, name, category, image_url, price, unit');

            if (error) {
                console.error('Supabase error:', error);
            } else if (products) {
                // Filter products based on hints (case-insensitive partial match)
                matchedProducts = products.filter((product) => {
                    const productName = product.name.toLowerCase();
                    return productHints.some((hint) =>
                        productName.includes(hint.toLowerCase())
                    );
                });
            }
        }

        return NextResponse.json({
            success: true,
            description,
            productHints,
            products: matchedProducts,
            totalMatches: matchedProducts.length,
        });

    } catch (error) {
        console.error('AI Image Search error:', error);

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Internal server error',
                fallback: true,
            },
            { status: 500 }
        );
    }
}
