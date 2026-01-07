import { getPublishedPosts } from '@/lib/blog/queries';
import { getLatestProduct } from '@/lib/products/queries';
import MasonryBlogContent from './_components/MasonryBlogContent';

export const metadata = {
  title: 'Blog - Góc Kiến Thức Trái Cây | Tiệm Quả Nghiệp',
  description: 'Khám phá bí quyết chọn quả ngon, công thức detox và sống khỏe mỗi ngày cùng Tiệm Quả Nghiệp',
};

export default async function BlogPage() {
  // Fetch published posts and latest product on server
  const [posts, hotProduct] = await Promise.all([
    getPublishedPosts(),
    getLatestProduct()
  ]);

  return (
    <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8">
      <MasonryBlogContent initialPosts={posts} hotProduct={hotProduct} />
    </main>
  );
}