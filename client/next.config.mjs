import withPlaiceholder from '@plaiceholder/next';

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  transpilePackages: ['@plaiceholder/ui'],
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'lh3.googleusercontent.com',
      'localhost',
      'food-blog-server1.onrender.com',
      'placehold.co',
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
