/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 0,
        },
    },
        logging: {
        fetches: {
            fullUrl: true,
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'imai.assets.newt.so',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;
