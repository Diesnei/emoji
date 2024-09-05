/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: ['./src'],
        prependData: '@import "src/styles/variables.scss";'
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'emojiapi.dev',
            },
        ],
    },
};

export default nextConfig;
