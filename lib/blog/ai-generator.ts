/**
 * AI-powered Blog Content Generator
 * Uses Gemini AI to generate blog posts from images and titles
 */

import { analyzeImage } from '@/lib/gemini';
import {
    buildTitleGenerationPrompt,
    buildContentGenerationPrompt,
    buildExcerptPrompt,
    buildTagsPrompt,
} from './prompts';

// Re-use existing Gemini utilities
import { GEMINI_CONFIG } from '@/constants';

interface GeminiTextPart {
    text: string;
}

interface GeminiImagePart {
    inlineData: {
        mimeType: string;
        data: string;
    };
}

type GeminiPart = GeminiTextPart | GeminiImagePart;

interface GeminiRequest {
    contents: {
        parts: GeminiPart[];
    }[];
}

interface GeminiResponse {
    candidates?: {
        content: {
            parts: {
                text: string;
            }[];
        };
    }[];
    error?: {
        message: string;
        code: number;
    };
}

/**
 * Call Gemini API (internal helper)
 */
async function callGeminiAPI(payload: GeminiRequest): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }

    const url = `${GEMINI_CONFIG.API_ENDPOINT}/${GEMINI_CONFIG.MODEL_NAME}:generateContent?key=${apiKey}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GEMINI_CONFIG.TIMEOUT * 2); // Longer timeout for blog generation

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`
            );
        }

        const data: GeminiResponse = await response.json();

        if (data.error) {
            throw new Error(`Gemini API error: ${data.error.message}`);
        }

        if (!data.candidates || data.candidates.length === 0) {
            throw new Error('No response from Gemini API');
        }

        const text = data.candidates[0].content.parts[0]?.text;
        if (!text) {
            throw new Error('Empty response from Gemini API');
        }

        return text;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                throw new Error('Gemini API request timeout');
            }
            throw error;
        }

        throw new Error('Unknown error calling Gemini API');
    }
}

/**
 * Input for blog generation
 */
export interface BlogGenerationInput {
    imageBase64: string;
    title?: string;
}

/**
 * Output from blog generation
 */
export interface BlogGenerationOutput {
    title: string;
    content: string;
    excerpt: string;
    suggestedTags: string[];
}

/**
 * Generate blog title from image
 */
async function generateTitle(imageDescription: string): Promise<string> {
    const prompt = buildTitleGenerationPrompt(imageDescription);

    const payload: GeminiRequest = {
        contents: [
            {
                parts: [{ text: prompt }],
            },
        ],
    };

    const response = await callGeminiAPI(payload);
    return response.trim().replace(/^["']|["']$/g, ''); // Remove quotes if any
}

/**
 * Generate main blog content
 */
async function generateMainContent(
    imageDescription: string,
    title: string
): Promise<string> {
    const prompt = buildContentGenerationPrompt(imageDescription, title);

    const payload: GeminiRequest = {
        contents: [
            {
                parts: [{ text: prompt }],
            },
        ],
    };

    const response = await callGeminiAPI(payload);
    return response.trim();
}

/**
 * Generate excerpt from content
 */
async function generateExcerpt(content: string): Promise<string> {
    const prompt = buildExcerptPrompt(content);

    const payload: GeminiRequest = {
        contents: [
            {
                parts: [{ text: prompt }],
            },
        ],
    };

    const response = await callGeminiAPI(payload);
    return response.trim().replace(/^["']|["']$/g, '');
}

/**
 * Suggest tags for the blog
 */
async function suggestTags(title: string, content: string): Promise<string[]> {
    const prompt = buildTagsPrompt(title, content);

    const payload: GeminiRequest = {
        contents: [
            {
                parts: [{ text: prompt }],
            },
        ],
    };

    const response = await callGeminiAPI(payload);

    try {
        // Extract JSON array from response
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            console.warn('No JSON array found in tags response:', response);
            return [];
        }

        const tags = JSON.parse(jsonMatch[0]);

        if (!Array.isArray(tags)) {
            console.warn('Tags response is not an array:', tags);
            return [];
        }

        return tags
            .filter((tag) => typeof tag === 'string')
            .map((tag) => tag.toLowerCase().trim())
            .slice(0, 7); // Max 7 tags
    } catch (error) {
        console.error('Error parsing tags response:', error, response);
        return [];
    }
}

/**
 * Main function: Generate complete blog content from image
 * 
 * @param input - Image (base64) and optional title
 * @returns Complete blog post with title, content, excerpt, and tags
 * 
 * @throws Error if image analysis or content generation fails
 */
export async function generateBlogContent(
    input: BlogGenerationInput
): Promise<BlogGenerationOutput> {
    const { imageBase64, title: userTitle } = input;

    try {
        // Step 1: Analyze image to understand the content
        console.log('[AI Blog Generator] Step 1: Analyzing image...');
        const imageAnalysis = await analyzeImage(imageBase64);
        const imageDescription = imageAnalysis.description;

        if (!imageDescription) {
            throw new Error('Failed to analyze image content');
        }

        console.log('[AI Blog Generator] Image analysis:', imageDescription);

        // Step 2: Generate title (if not provided)
        let finalTitle = userTitle;
        if (!finalTitle) {
            console.log('[AI Blog Generator] Step 2: Generating title...');
            finalTitle = await generateTitle(imageDescription);
            console.log('[AI Blog Generator] Generated title:', finalTitle);
        } else {
            console.log('[AI Blog Generator] Using user-provided title:', finalTitle);
        }

        // Step 3: Generate main content
        console.log('[AI Blog Generator] Step 3: Generating content...');
        const content = await generateMainContent(imageDescription, finalTitle);
        console.log('[AI Blog Generator] Content generated:', content.length, 'characters');

        // Step 4: Generate excerpt
        console.log('[AI Blog Generator] Step 4: Generating excerpt...');
        const excerpt = await generateExcerpt(content);
        console.log('[AI Blog Generator] Excerpt generated:', excerpt);

        // Step 5: Suggest tags
        console.log('[AI Blog Generator] Step 5: Suggesting tags...');
        const suggestedTags = await suggestTags(finalTitle, content);
        console.log('[AI Blog Generator] Tags suggested:', suggestedTags);

        return {
            title: finalTitle,
            content,
            excerpt,
            suggestedTags,
        };
    } catch (error) {
        console.error('[AI Blog Generator] Error:', error);
        throw error instanceof Error
            ? error
            : new Error('Failed to generate blog content');
    }
}
