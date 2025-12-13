import type { Metadata } from 'next';

export const siteConfig = {
    name: 'Tiệm Quả Nghiệp',
    description: 'Cửa hàng trái cây tươi nhập khẩu và đặc sản Việt Nam. Nghiệp tụ vành môi, ăn vô trôi hết.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    ogImage: '/og-image.jpg',
    keywords: ['trái cây', 'hoa quả tươi', 'trái cây nhập khẩu', 'đặc sản Việt Nam', 'trái cây sạch'],
};

export function generateMetadata(
    title: string,
    description?: string,
    image?: string,
): Metadata {
    return {
        title: `${title} | ${siteConfig.name}`,
        description: description || siteConfig.description,
        keywords: siteConfig.keywords,
        authors: [{ name: siteConfig.name }],
        openGraph: {
            type: 'website',
            locale: 'vi_VN',
            url: siteConfig.url,
            title: `${title} | ${siteConfig.name}`,
            description: description || siteConfig.description,
            siteName: siteConfig.name,
            images: [
                {
                    url: image || siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | ${siteConfig.name}`,
            description: description || siteConfig.description,
            images: [image || siteConfig.ogImage],
        },
    };
}
