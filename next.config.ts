import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [256, 384, 512],
  },
};

export default nextConfig;
