import withPlaiceholder from "@plaiceholder/next";

const nextConfig = {
  transpilePackages: ["@plaiceholder/ui"],
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "lh3.googleusercontent.com",
      "localhost",
      "placehold.co",
      "cooks-compass.s3.us-east-1.amazonaws.com",
    ],
  },
};

export default withPlaiceholder(nextConfig);
