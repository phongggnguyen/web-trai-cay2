import React from 'react';
import { Page } from '../types';
import { BLOG_POSTS } from '../constants';

interface BlogProps {
  onNavigate: (page: Page) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-10">
      <div className="mb-10 flex items-end justify-between border-b border-border-color pb-6 dark:border-border-dark">
        <div>
          <h1 className="text-4xl font-black text-text-main dark:text-white">Blog Sống Khỏe</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Kiến thức dinh dưỡng và mẹo vặt hay ho.</p>
        </div>
        <div className="hidden flex-wrap gap-2 md:flex">
          {['Tất cả', 'Công thức', 'Sức khỏe', 'Mẹo vặt', 'Review'].map(cat => (
            <button key={cat} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${cat === 'Tất cả' ? 'bg-text-main text-white dark:bg-white dark:text-text-main' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-surface-dark dark:text-gray-400 dark:hover:bg-black/40'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-12 grid gap-8 lg:grid-cols-2">
        <div className="group relative overflow-hidden rounded-2xl">
          <img src={featuredPost.image} alt={featuredPost.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute top-4 left-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-text-main">{featuredPost.category}</div>
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>{featuredPost.date}</span>
            <span>•</span>
            <span>{featuredPost.views} lượt xem</span>
          </div>
          <h2 className="cursor-pointer text-3xl font-black leading-tight text-text-main transition-colors hover:text-primary dark:text-white md:text-4xl">{featuredPost.title}</h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">{featuredPost.excerpt}</p>
          <button className="mt-2 w-fit rounded-full border border-gray-300 px-6 py-3 font-bold text-text-main transition-colors hover:bg-text-main hover:text-white dark:border-gray-700 dark:text-white dark:hover:bg-white dark:hover:text-text-main">
            Đọc tiếp
          </button>
        </div>
      </div>

      {/* Grid Posts */}
      <h3 className="mb-6 text-2xl font-bold text-text-main dark:text-white">Bài viết mới nhất</h3>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {otherPosts.map(post => (
          <div key={post.id} className="group cursor-pointer">
            <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-gray-100 dark:bg-surface-dark">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-3 left-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-text-main backdrop-blur-sm">{post.category}</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{post.date}</span>
            </div>
            <h4 className="mt-2 text-xl font-bold leading-snug text-text-main transition-colors group-hover:text-primary dark:text-white">{post.title}</h4>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;