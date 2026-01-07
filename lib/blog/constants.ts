// Blog-related constants

export const BLOG_CATEGORIES = [
    { name: 'Tất cả', icon: 'grid_view', tag: null },
    { name: 'Sức khỏe', icon: 'favorite', tag: 'sức khỏe' },
    { name: 'Mẹo vặt', icon: 'lightbulb', tag: 'mẹo hay' },
    { name: 'Công thức', icon: 'local_fire_department', tag: 'công thức' },
    { name: 'Bảo quản', icon: 'inventory_2', tag: 'bảo quản' },
] as const;

export const POSTS_PER_PAGE = 9;
