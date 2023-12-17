/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
    // serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/local/images/**',
      },
    ],
  },
  ...nextConfig,
};
