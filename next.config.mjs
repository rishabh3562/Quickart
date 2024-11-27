/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com","rukminim2.flixcart.com", "images.meesho.com", "example.com", "m.media-amazon.com"], // Allow images from tailwindui.com
  
  },
};

export default nextConfig;
