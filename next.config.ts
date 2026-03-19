import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "public_html",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
