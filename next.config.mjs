/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    assetPrefix: '/landing-page-examples',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/landing-page-examples/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
