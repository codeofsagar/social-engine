/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for SFTP/Static hosting
  output: 'export', 
  images: {
    unoptimized: true, 
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
  transpilePackages: ['@splinetool/react-spline'],
};

module.exports = nextConfig;