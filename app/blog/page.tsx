import { getPublishedPosts } from '@/lib/blog/queries';
import MasonryBlogContent from './_components/MasonryBlogContent';

export const metadata = {
  title: 'Blog - Góc Kiến Thức Trái Cây | Tiệm Quả Nghiệp',
  description: 'Khám phá bí quyết chọn quả ngon, công thức detox và sống khỏe mỗi ngày cùng Tiệm Quả Nghiệp',
};

export default async function BlogPage() {
  // Fetch published posts on server
  const posts = await getPublishedPosts();

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8">
      <MasonryBlogContent initialPosts={posts} />
    </main>
  );
}