// next.config.js

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "upgrade-insecure-requests; block-all-mixed-content",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
