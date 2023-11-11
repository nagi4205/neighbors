/** @type {import('next').NextConfig} */
const nextConfig = {
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
