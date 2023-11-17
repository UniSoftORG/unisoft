/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.kgb.gg',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'kgb-dev.com',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        port: '8000',
        hostname: '127.0.0.1',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'kgb.gg',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'banners.gametracker.rs',
      },
    ],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
