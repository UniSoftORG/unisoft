/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                pathname: '/storage/**',
            }
        ]
    }
}

module.exports = nextConfig;
