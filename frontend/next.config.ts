import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  // Updated: moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: ['mongoose'],
  // Enable static optimization
  output: 'standalone',
  // Optimize images
  images: {
    domains: [],
  },
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;