import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["typeorm", "reflect-metadata"],
  images: {
    domains: ["gym-connect-bucket.s3.us-east-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.gymconnect.com.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
