import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Claude_Test2",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
