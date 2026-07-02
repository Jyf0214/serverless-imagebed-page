import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingExcludes: {
    "*": ["public/images/**/*.{jpg,jpeg,png,webp,gif,svg}"],
  },
  images: {
    remotePatterns: [

      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "bing.img.run",
      },
    ],
  },
};

export default nextConfig;
