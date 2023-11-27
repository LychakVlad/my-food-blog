import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  transpilePackages: ['@plaiceholder/ui'],
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'localhost',
      'food-blog-server1.onrender.com',
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },
};

export default withPlaiceholder(nextConfig);
