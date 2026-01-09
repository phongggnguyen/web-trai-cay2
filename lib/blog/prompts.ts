/**
 * AI Prompts for Blog Generation
 * These prompts are used with Gemini AI to generate blog content
 */

/**
 * Build prompt for generating blog title from image description
 */
export function buildTitleGenerationPrompt(imageDescription: string): string {
    return `Bạn là chuyên gia viết blog về trái cây cho cửa hàng "Tiệm Quả Nghiệp".

Dựa trên hình ảnh được mô tả như sau: "${imageDescription}"

Hãy đề xuất 1 tiêu đề blog hấp dẫn, SEO-friendly về trái cây:

YÊU CẦU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Độ dài: 50-70 ký tự
✅ Ngôn ngữ: Tiếng Việt tự nhiên
✅ Phong cách: Thân thiện, cuốn hút
✅ Có số liệu hoặc từ khóa nổi bật
✅ Dễ đọc, dễ nhớ

VÍ DỤ TIÊU ĐỀ TỐT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- "5 Loại Trái Cây Giúp Da Đẹp Dáng Xinh"
- "Bí Quyết Chọn Dưa Hấu Ngọt Lịm Không Cần Gõ"
- "Top 10 Trái Cây Giải Nhiệt Mùa Hè Cực Đã"
- "Mẹo Bảo Quản Trái Cây Tươi Lâu Gấp 3 Lần"

QUY TẮC QUAN TRỌNG:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Ngắn gọn, súc tích
✅ Thu hút click
✅ Có giá trị SEO
❌ KHÔNG dài dòng
❌ KHÔNG chung chung
❌ KHÔNG sử dụng clickbait quá đà

Hãy trả về ĐÚNG 1 TIÊU ĐỀ duy nhất, KHÔNG cần giải thích thêm.`;
}

/**
 * Build prompt for generating main blog content
 */
export function buildContentGenerationPrompt(
    imageDescription: string,
    title: string
): string {
    return `Bạn là chuyên gia viết blog về trái cây cho cửa hàng "Tiệm Quả Nghiệp".

THÔNG TIN ĐẦU VÀO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📸 Mô tả hình ảnh: ${imageDescription}
📌 Tiêu đề bài viết: "${title}"

NHIỆM VỤ CỦA BẠN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Viết 1 bài blog chi tiết, chuyên nghiệp về trái cây với cấu trúc markdown như sau:

## Giới Thiệu
(100-150 từ)
- Mở đầu cuốn hút, liên quan đến tiêu đề
- Giới thiệu vấn đề hoặc chủ đề chính
- Tạo sự tò mò cho người đọc

## Nội Dung Chính
(500-700 từ, chia thành 3-4 mục nhỏ với heading ###)

### [Mục 1: Tên mục liên quan]
- Nội dung chi tiết
- Sử dụng bullet points khi cần
- Có ví dụ cụ thể

### [Mục 2: Tên mục liên quan]
- Tiếp tục phát triển chủ đề
- Thêm thông tin hữu ích
- Mẹo vặt thực tế

### [Mục 3: Tên mục liên quan]
- Bổ sung kiến thức
- Lưu ý quan trọng
- Tips & tricks

## Kết Luận
(80-100 từ)
- Tóm tắt các điểm chính
- Lời khuyên cuối cùng
- Call-to-action nhẹ nhàng (khuyến khích ghé thăm cửa hàng)

YÊU CẦU KỸ THUẬT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Tổng độ dài: 800-1000 từ
✅ Format: Markdown chuẩn (##, ###, -, *)
✅ Emoji: Sử dụng tinh tế để sinh động (🍎🍊🍇🥝)
✅ Ngôn ngữ: Tiếng Việt tự nhiên, thân thiện
✅ Thông tin: Chính xác, có giá trị thực tế
✅ SEO: Tự nhiên chèn từ khóa liên quan
✅ Đoạn văn: Ngắn gọn, dễ đọc (3-4 câu/đoạn)

QUY TẮC VI ẾT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Viết như đang tư vấn cho khách hàng
✅ Chia sẻ kinh nghiệm thực tế
✅ Sử dụng số liệu khi có thể
✅ Thêm mẹo vặt hữu ích
✅ Tạo danh sách khi phù hợp

❌ KHÔNG viết dài dòng, lan man
❌ KHÔNG sử dụng ngôn ngữ quá học thuật
❌ KHÔNG đưa thông tin sai lệch
❌ KHÔNG copy từ nguồn khác
❌ KHÔNG quảng cáo trắng trợn

VÍ DỤ PHONG CÁCH VIẾT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Bạn đang băn khoăn không biết chọn loại trái cây nào tốt cho sức khỏe? 🤔 Đừng lo! Hôm nay Tiệm Quả Nghiệp sẽ chia sẻ với bạn 5 loại trái cây siêu bổ dưỡng, vừa ngon vừa giúp cơ thể khỏe mạnh mỗi ngày. 🍎🍊"

Hãy viết bài blog theo yêu cầu trên:`;
}

/**
 * Build prompt for generating excerpt from content
 */
export function buildExcerptPrompt(content: string): string {
    return `Bạn là chuyên gia viết content marketing.

Dựa vào nội dung bài blog sau:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${content.slice(0, 500)}...

NHIỆM VỤ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Viết 1 đoạn mô tả ngắn (excerpt) hấp dẫn cho bài blog này.

YÊU CẦU:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Độ dài: 150-200 ký tự
✅ Tóm tắt ý chính của bài viết
✅ Thu hút người đọc click vào
✅ Ngôn ngữ tự nhiên, cuốn hút
✅ Không có emoji
✅ 1-2 câu văn hoàn chỉnh

VÍ DỤ EXCERPT TỐT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Khám phá 5 loại trái cây giàu vitamin C giúp tăng cường sức đề kháng và làm đẹp da. Cùng tìm hiểu cách chọn và bảo quản để giữ trọn dưỡng chất nhé!"

"Dưa hấu ngọt lịm không cần gõ? Bí quyết chọn quả ngon chỉ bằng cách nhìn và sờ. Đơn giản mà hiệu quả cực kỳ!"

Hãy viết excerpt (CHỈ TRẢ VỀ EXCERPT, không giải thích):`;
}

/**
 * Build prompt for suggesting tags
 */
export function buildTagsPrompt(title: string, content: string): string {
    return `Bạn là chuyên gia SEO và content marketing.

THÔNG TIN:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tiêu đề: "${title}"
Nội dung: ${content.slice(0, 300)}...

NHIỆM VỤ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Đề xuất 5-7 tags (thẻ) phù hợp nhất cho bài blog này.

YÊU CẦU VỀ TAGS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Viết thường, không dấu
✅ Ngắn gọn (1-3 từ)
✅ Liên quan trực tiếp đến nội dung
✅ Có giá trị SEO
✅ Dễ tìm kiếm

DANH MỤC TAGS PHỔ BIẾN (tham khảo):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Chủ đề: trai-cay, suc-khoe, dinh-duong, vitamin, lam-dep
Loại quả: cam, tao, chuoi, dau, nho, xoai
Mục đích: giai-nhiet, tang-suc-de-khang, giam-can
Đối tượng: cho-be, phu-nu, nguoi-lon-tuoi
Mùa: mua-he, mua-dong, mua-xuan

VÍ DỤ TAGS TỐT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bài về "Cam tốt cho sức khỏe":
["trai-cay", "cam", "vitamin-c", "suc-khoe", "tang-suc-de-khang"]

Bài về "Chọn dưa hấu ngon":
["dua-hau", "meo-vat", "chon-qua", "mua-he", "giai-nhiet"]

FORMAT TRẢ VỀ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Chỉ trả về JSON array, KHÔNG giải thích:
["tag1", "tag2", "tag3", "tag4", "tag5"]`;
}
