import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  transpilePackages: ["@plaiceholder/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "lh3.googleusercontent.com",
      "localhost",
      "food-blog-server1.onrender.com",
      "placehold.co",
      "cooks-compass.s3.us-east-1.amazonaws.com",
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
