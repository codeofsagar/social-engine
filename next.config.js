/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this line exactly:
  transpilePackages: ['@splinetool/react-spline'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;