import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
      },
    ],
  },
};

export default nextConfig;
