import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdnkk.zeabur.app',
        pathname: '**'
      }
    ]
  },
  transpilePackages: ['@react-pdf/renderer', 'react-pdf'],
};

export default nextConfig;
