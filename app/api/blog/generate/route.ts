import { NextRequest, NextResponse } from 'next/server';
import { generateBlogContent } from '@/lib/blog/ai-generator';
import { validateImageSize } from '@/lib/gemini';

/**
 * POST /api/blog/generate
 * 
 * Generate blog content using Gemini AI from an image and optional title
 * 
 * Request body:
 * {
 *   imageBase64: string,  // Base64 encoded image (required)
 *   title?: string        // Optional blog title
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   data?: {
 *     title: string,
 *     content: string,
 *     excerpt: string,
 *     suggestedTags: string[]
 *   },
 *   error?: string
 * }
 */
export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const body = await req.json();
        const { imageBase64, title } = body;

        // Validation
        if (!imageBase64) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Ảnh bìa là bắt buộc để tạo nội dung với AI',
                },
                { status: 400 }
            );
        }

        // Validate image size
        if (!validateImageSize(imageBase64)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Ảnh quá lớn (tối đa 4MB)',
                },
                { status: 400 }
            );
        }

        // Validate title length (if provided)
        if (title && title.length > 100) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Tiêu đề không được vượt quá 100 ký tự',
                },
                { status: 400 }
            );
        }

        // Generate blog content using AI
        console.log('[API] Generating blog content...');
        const result = await generateBlogContent({
            imageBase64,
            title: title?.trim() || undefined,
        });

        console.log('[API] Blog content generated successfully');

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error('[API] Error generating blog:', error);

        const errorMessage =
            error instanceof Error
                ? error.message
                : 'Có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại.';

        return NextResponse.json(
            {
                success: false,
                error: errorMessage,
            },
            { status: 500 }
        );
    }
}
