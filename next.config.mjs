/** @type {import('next').NextConfig} */
const nextConfig = {
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
        ],
    },
};

export default nextConfig;
