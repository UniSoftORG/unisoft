/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1"
      },
    ],
    minimumCacheTTL: 60
  },
};

module.exports = nextConfig;
