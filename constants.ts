import { Product, BlogPost } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nho Mẫu Đơn Shine Muscat',
    price: 1250000,
    originalPrice: 1500000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHN82bqCwCfphIFuEmgD4fMep6R2Q8zLKb9BAGtkLZiXJjVtNPEXSgeD8-iDW_ksuBFMzpsWu5oK9O-s-nuFPJU8wSD31UlPgWDr1dluXVKxn-kDvTseLzZpvgzgCphWzTld4nFSQSzZWEl3Q0bBFwQPBdij50ImJelwLAGRSMFCJY4LPstoNSb1H8ze-1p7OfvebBsYCeX1tXg8Na0iXsaIdelh9DBS2x3GM6l6UvliRTsJULQ7g5ChYmQQQyc0vOnZwYxsgVtcQr',
    unit: 'hộp',
    tag: 'HOT',
    tagColor: 'red',
    origin: 'Hàn Quốc',
    category: 'Nho & Berry',
    rating: 5.0,
    reviews: 128
  },
  {
    id: '2',
    name: 'Táo Envy Size Lớn',
    price: 240000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2LyLeqvisQaNnIYNXDhxb9N_-FYKmvcjp8rSQg_SFIAQFQ8HK1MKhOKCq_KXm8tzEFM8a91NIEbsSfNl3umeHGL3SeLCq3IxLNlgpqXkv5QlbZvdVA7PDtqA2083oqrEpEoi4vCAvWapwo3tVv5fHtQv-_3SOhvGZf83-gLGAxEB95UCMQZ3UQqe1Bh4eYpTpTz65PyWTn1JCkYUkG4qNRGtZA5fXj4S7gnhbGEKrYPPYRP7k7avaqVSUM4eAZFQJc3Oo4GGwiXYg',
    unit: 'kg',
    origin: 'Mỹ',
    category: 'Táo & Lê',
    rating: 4.8,
    reviews: 89
  },
  {
    id: '3',
    name: 'Dưa Lưới Musk Melon',
    price: 1800000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg6jhrEzfT_-FLJ7o1Jix1gAIT6KQAQqmwHfP_iOXQlMbjT5aLXpc0lRAxS0rpsigcY983eTdpuQ9dgN9koS_5Bp4q5cfK0RTgUTSFZKJw5nL_4txf8KMTnIkaXRYyMcPNRYU3MoXdhDaN04_lf56c51bZk8vSf5OPRVFrKFPb1KErx5jRURlNIKg5ZwEpBYlXto7qeteagWnaMsJb4qhyPTGO9Uh-FsxX8xufhd2DurZKsi78RBk4OTphVmlnfBlFDqupndsTXQ1H',
    unit: 'trái',
    tag: 'MỚI',
    tagColor: 'orange',
    origin: 'Nhật Bản',
    category: 'Dưa các loại',
    rating: 5.0,
    reviews: 12
  },
  {
    id: '4',
    name: 'Chuối Laba Đà Lạt',
    price: 45000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQfmP2gK9xrjarHwgEQohwJ0UP81tUHhQXtAbCBVR8mCeHJ-UmzmkcWYICA3Eg0dv-CY3_QPebvQrF0d5iwIy0vAfs-EgDOgFw4fCKd2NrA-S0NQU99XtY17vtyBCwCkQoIc9TQIRjbvRbYxSO9sGdGVNZDs5jiJmdY-e7VADlsXXH1WRTP8CrtlX7Dr718Z3sVOBT-RaD_KLuQOf3q_50Zx3sgImBq_CqudhW9MCMdFcTRcaohI-gXbvug9dVu2LXv3jVOSLP4CK9',
    unit: 'nải',
    origin: 'Việt Nam',
    category: 'Trái cây nhiệt đới',
    rating: 4.5,
    reviews: 204
  },
  {
    id: '5',
    name: 'Cherry Đỏ Size 30+',
    price: 520000,
    originalPrice: 650000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYZh651uw2VTP4EoM4N7nek7G6nOJv0eC10LvsTCZ_ywKsX0DJm01tYDDILiLZj1DA4VRss48i63gYII8nAta_KapLtNSoIhM8KClQ7pSKfC3cNlJmia4CjHn-ipJTopaGdshxYjHWoCQuwuuCMglBWuUkfljlZvJRZtUyusfoeN9mg2vO0MUYhwipkNE8lMg_RWzaswthUqeotjM7CHSe56cLnLz0lqwIHEJ3K_hL2zjCrnrE6GwrVwUBvmhBD-FqjE_qqxFRLPUZ',
    unit: 'kg',
    tag: '-20%',
    tagColor: 'red',
    origin: 'Úc',
    category: 'Nho & Berry',
    rating: 4.9,
    reviews: 156
  },
  {
    id: '6',
    name: 'Kiwi Xanh Hữu Cơ',
    price: 180000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgCmzYEXhRNEDteS3F4PwvAQoOFKjuJhW5d78NotnrjWjcQdKzsGw8kjWoTAp6t1KgJJki-0hR8nXGhpF_LZFARAaAYDZSo7hSZkJ-8Mgy4bxd1iana4Lih7HcBCt0mp97RJwqXPP_aIHaiQ9bYb3oVRvD6VoZy20CKf1XimqAj68rq8UCWdlO0KzKlNZ0qGE4hdQugcBWgtH7sYYzPltPfm4XL4DKatySzYUmX6jtT4VfHr18i2TFc6dVO_8elR4EPs1csO6JWaHv',
    unit: 'kg',
    origin: 'New Zealand',
    category: 'Trái cây nhập khẩu',
    rating: 4.7,
    reviews: 67
  },
  {
    id: '7',
    name: 'Dâu Tây Giống Nhật',
    price: 350000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRDMDvvcZAr44MyD_bgZUABF-U7w8TzBkLX1mjjHBG-mTvCvqdE1PfJ7yJovnp0e-e_ObeMegXpopGcThJACRdhbvR8nVMHqprf6goEeDPFecgU5eHGJFpxMbLrN2AmWhR38lyc_qHERfMsXGJx7Ra_VjoPH6MmmTTET8I0xECkAQsq2OAhjOdqm3HZRrepL2AsI5myGU5CYI1EU_a4GC77Npn_r55g3qRmbNPqSRHZsYCd9FaN9yuOg2vbDwDZp9qcFce5Blqs5I4',
    unit: 'hộp',
    origin: 'Hàn Quốc',
    category: 'Nho & Berry',
    rating: 4.8,
    reviews: 42
  },
  {
    id: '8',
    name: 'Cam Vàng Navel',
    price: 60000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkqqWGr7CJMXEps-WswMx-hn47ZAYCES_jnVQBLk6hZNHbNXQ6kT5BCogaimPF_fr_BGFy6ngbLwMxrX1RGUXP9eWoc-9wz73Wzn6WkrlsrFrMbp6SW4urXsqgREalMX9d45-3iqhmhpNJvJBkDgBfMRiwgqbU2aAJD3YswpzXuZ2D3qk71n39uy6DoLbA8bfPTM3HBuBNvo-doSKASVsZ985QapXxQTllbyNH3TT0v_0GbMzWxAr9zBUVg9eURA-mJ80fpk50FjB3',
    unit: 'kg',
    origin: 'Ai Cập',
    category: 'Trái cây nhập khẩu',
    rating: 4.6,
    reviews: 99
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 cách làm salad trái cây giải nhiệt mùa hè "ăn là ghiền"',
    excerpt: 'Mùa hè nóng bức, còn gì tuyệt vời hơn một tô salad trái cây mát lạnh? Xem ngay 5 công thức đơn giản này để chiêu đãi cả nhà nhé.',
    date: '12/05/2024',
    category: 'Công thức',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoh50FD4ZgpbvsQQ6e4hk2Eno4WF2sxkex2x0FfZnb6go9TJHbqgf6vbJeTqh8b9QKd79BdbHnlzeYqCBrOgAl_jxeA1B5-IWT6114FdNyAUz9fz_nzpSAdZ1ztfofudM9WvXoDxMGFvGm1DRsbiIgFdlYah9WHGPPj_JtWVYQ_Ms25iIGH6o8lMMy7aNHWobuG7RnjH_2lhR0YytHHx7AqZTgSTGnVNHuYDyWSmadnIesgbdYdeaEWjFt3BW-tp2-DShvqcnQGRLp',
    views: '2.5k'
  },
  {
    id: '2',
    title: 'Ăn sầu riêng có thực sự "nóng"? Giải mã lầm tưởng',
    excerpt: 'Sầu riêng ngon nhưng nhiều người sợ nóng trong người. Sự thật là gì và cách ăn sầu riêng đúng cách để không bị nổi mụn?',
    date: '10/05/2024',
    category: 'Sức khỏe',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjtirZq8cbciyFa2npn-OjjZR_OZW-AnJ8MaVZ0uKscrqG7jWuHdZuKmjGoeQyIRVv2ZKx7AYbfRPmsNE-3zoAQ9uyoohWU9u0ND0FKK25VwkUj8NKSEkMAZIBfAwZowK5VhDRb5O7u6F9x2TPg-AIxjqti5dyS4L8flp7pVcSfNB_wBLBIfR6jhHm0gMNplWQRVsy7fQXsXEnhCIiD748IrqOVfM1104t0lehCelkDQBxxi_uyoVzOkSVuOyujydsW8RcGSOuxFVC',
    views: '5.1k'
  },
  {
    id: '3',
    title: 'Bí kíp chọn dưa hấu: Vỗ nghe tiếng "bộp bộp" là ngon?',
    excerpt: 'Không cần phải là chuyên gia, chỉ với 3 mẹo nhỏ này bạn sẽ chọn được quả dưa hấu đỏ ngọt, mọng nước cho gia đình.',
    date: '08/05/2024',
    category: 'Mẹo vặt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOdTRNh02McV9AKItp56DouIGcuSotysZaUcqsK5y1B3lg6rs8bPV5fN6er0Y6jEVN_rhM06ipYaeNAqWCQZ9CbgfkfrrHwUgwhtqU25So7COsmiv6cd32aGpQLRz9BErhSYJVHUQvgOljVUdipR2hTDFpggHihnaOEiG7MBtt4CCrCtPjV8YCWz0AktYYVy-I0tZK0lQgAyYgCbv8D-5WxZ9pPX9ISmFNRwZNNGoe2TDuo18iDBwi0uNo39kxCpR9rkkxw9tGVyta',
    views: '1.2k'
  },
  {
    id: '4',
    title: 'Tuyệt chiêu giữ trái cây tươi lâu trong tủ lạnh',
    excerpt: 'Đừng ném tất cả vào tủ lạnh! Mỗi loại quả có một "tính nết" riêng. Học ngay cách bảo quản chuẩn chuyên gia.',
    date: '05/05/2024',
    category: 'Bảo quản',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArk35CZbf7QWiqbiBewUAVVxq4IbZ73YOHvGjMhO7k5rBg-6fYcgOCaezu6NjmxDc62of48G0m3v0Jr56wQl9vDQQaJqbWCgW8kZjBbzj5pi_UMzGs04FGEHIp4ZCZA7MZsNoLrhsGo9vB91hKFI3zGNUInl8IPJnvDmdY96eldvmbpgiffTuHbGJcKzhjHcuL7OUddak_hMW7cLwZFi7LObjX0F6-B1s7WZeAxiORZtan0s_sKnRcOhttF0j5_EYiieumAsnipuuY',
    views: '3.8k'
  }
];