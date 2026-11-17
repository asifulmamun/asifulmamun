import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // distDir: 'dist', // to match the original vite output for the cloudflare workflow
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
