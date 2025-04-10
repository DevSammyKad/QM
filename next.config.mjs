/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quickmeds.sndktech.online',
        port: '', // optional; omit or leave blank if not needed
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
