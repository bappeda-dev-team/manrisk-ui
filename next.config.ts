import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: "/manrisk",
  assetPrefix: "/manrisk/",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnkk.zeabur.app',
        pathname: '**'
      }
    ]
  }
};

export default nextConfig;
