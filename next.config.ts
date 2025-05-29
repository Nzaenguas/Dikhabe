import path from 'path';
import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  // @ts-ignore: custom property for dev proxy
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

  webpack(config: Configuration, { isServer }) {
    if (!isServer) {
      // Cast resolve to `any` to add fallback without TS error
      const resolve = config.resolve as any;

      resolve.fallback = {
        ...(resolve.fallback || {}),
        crypto: false,
        stream: false,
        buffer: false,
      };

      resolve.alias = {
        ...(resolve.alias || {}),
        underscore: 'lodash',
      };

      resolve.extensions = [
        ...(resolve.extensions || []),
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
      ];

      config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    }

    return config;
  },
};

export default nextConfig;
