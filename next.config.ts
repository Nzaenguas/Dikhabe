/** @type {import('next').NextConfig} */
const nextConfig = {
  // @ts-ignore
  allowedDevOrigins: ['lacewing-easy-pleasantly.ngrok-free.app'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.ufs.sh',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
        pathname: '/**',
      },
      
    ],
    unoptimized: true,
  },
};

export default nextConfig;
