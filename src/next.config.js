/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
        serverActions: true
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false, path: false, stream: false, constants: false };
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                pathname: '/storage/**',
            }
        ],
        minimumCacheTTL: 60,
    }
}

module.exports = nextConfig;
