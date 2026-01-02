// lib/gemini.ts - Utility functions for Gemini REST API integration

import { GEMINI_CONFIG } from '../constants';

interface GeminiTextPart {
    text: string;
}

interface GeminiImagePart {
    inlineData: {
        mimeType: string;
        data: string; // base64
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
 * Build the Gemini API request payload
 */
function buildGeminiPayload(prompt: string, imageBase64?: string): GeminiRequest {
    const parts: GeminiPart[] = [{ text: prompt }];

    if (imageBase64) {
        // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
        const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

        parts.push({
            inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data,
            },
        });
    }

    return {
        contents: [{ parts }],
    };
}

/**
 * Call Gemini API with retry logic
 */
async function callGeminiAPI(payload: GeminiRequest): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured in environment variables');
    }

    const url = `${GEMINI_CONFIG.API_ENDPOINT}/${GEMINI_CONFIG.MODEL_NAME}:generateContent?key=${apiKey}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), GEMINI_CONFIG.TIMEOUT);

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
 * Analyze text query and return matching product IDs
 * @param query User's natural language query
 * @param products List of products to search from
 * @returns Array of product IDs that match the query
 */
export async function analyzeTextQuery(
    query: string,
    products: { id: string; name: string; category: string; origin?: string }[]
): Promise<string[]> {
    const productsJSON = JSON.stringify(
        products.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            origin: p.origin,
        }))
    );

    const prompt = `Bạn là trợ lý AI thông minh cho cửa hàng trái cây "Tiệm Quả Nghiệp".

Người dùng tìm kiếm: "${query}"

Danh sách sản phẩm hiện có:
${productsJSON}

Hãy phân tích câu truy vấn và trả về danh sách ID của các sản phẩm phù hợp nhất. 
Ví dụ: nếu người dùng hỏi "trái cây giải nhiệt", hãy chọn cam, dưa hấu, dưa lưới...
Nếu hỏi "trái cây nhập khẩu cao cấp", chọn những loại có origin nước ngoài.

QUAN TRỌNG: Chỉ trả về JSON array chứa ID sản phẩm, KHÔNG thêm text giải thích.
Format: ["id1", "id2", "id3"]

Nếu không tìm thấy sản phẩm phù hợp, trả về: []`;

    const response = await callGeminiAPI(buildGeminiPayload(prompt));

    // Parse JSON response
    try {
        // Extract JSON array from response (in case AI adds extra text)
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            console.warn('Gemini response không chứa JSON array:', response);
            return [];
        }

        const productIds = JSON.parse(jsonMatch[0]);

        if (!Array.isArray(productIds)) {
            console.warn('Gemini response không phải array:', productIds);
            return [];
        }

        return productIds.filter((id) => typeof id === 'string');
    } catch (error) {
        console.error('Error parsing Gemini response:', error, response);
        return [];
    }
}

/**
 * Analyze image and return description + matching product names
 * @param imageBase64 Base64 encoded image
 * @returns Object containing description and potential product matches
 */
export async function analyzeImage(imageBase64: string): Promise<{
    description: string;
    productHints: string[];
}> {
    const prompt = `Bạn là chuyên gia nhận dạng trái cây cho "Tiệm Quả Nghiệp".

Hãy phân tích hình ảnh và trả lời theo format JSON:
{
  "description": "Tên trái cây ngắn gọn (VD: Cherry đỏ, Táo xanh, Cam vàng)",
  "productHints": ["tên chính", "biến thể 1", "biến thể 2"]
}

QUY TẮC QUAN TRỌNG:
1. "productHints" phải chứa TÊN TRÁI CÂY đơn giản, ngắn gọn
2. Ưu tiên tên TIẾNG VIỆT thông dụng
3. Bao gồm cả tên tiếng Anh nếu phổ biến
4. Tránh mô tả dài dòng

VÍ DỤ ĐÚNG:
- Ảnh cherry đỏ: {"description": "Cherry đỏ", "productHints": ["cherry", "cherry đỏ", "anh đào"]}
- Ảnh táo xanh: {"description": "Táo xanh", "productHints": ["táo", "táo xanh", "táo granny smith"]}
- Ảnh cam: {"description": "Cam vàng", "productHints": ["cam", "cam vàng", "cam navel"]}
- Ảnh nho: {"description": "Nho xanh", "productHints": ["nho", "nho xanh", "nho shine muscat"]}

VÍ DỤ SAI (không làm):
- {"productHints": ["Quả cherry đỏ sẫm, hình tròn đều, vỏ bóng mượt..."]} ❌ (quá dài)

QUAN TRỌNG: Chỉ trả về JSON object, KHÔNG thêm text khác.`;

    const response = await callGeminiAPI(buildGeminiPayload(prompt, imageBase64));

    try {
        // Extract JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Không tìm thấy JSON trong response');
        }

        const result = JSON.parse(jsonMatch[0]);

        return {
            description: result.description || 'Không nhận dạng được trái cây',
            productHints: Array.isArray(result.productHints) ? result.productHints : [],
        };
    } catch (error) {
        console.error('Error parsing image analysis response:', error, response);

        // Fallback: use the raw response as description
        return {
            description: response.slice(0, 200),
            productHints: [],
        };
    }
}

/**
 * Validate image size
 */
export function validateImageSize(base64Image: string): boolean {
    // Remove data URL prefix
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

    // Calculate size in bytes (base64 is ~33% larger than binary)
    const sizeInBytes = (base64Data.length * 3) / 4;

    return sizeInBytes <= GEMINI_CONFIG.MAX_IMAGE_SIZE;
}

/**
 * Convert File to base64
 */
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to convert file to base64'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
