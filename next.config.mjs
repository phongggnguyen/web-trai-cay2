/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "www.svgrepo.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "svgrepo.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
