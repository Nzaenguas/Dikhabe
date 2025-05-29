import path from 'path'
import type { NextConfig } from 'next'
import type { Configuration } from 'webpack'

const nextConfig: NextConfig = {
  // Development CORS handling
  // @ts-ignore
  allowedDevOrigins: ['lacewing-easy-pleasantly.ngrok-free.app'],

  // Image domain handling
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

  // Fallback for unsupported Node.js modules in browser
    webpack(config: Configuration, { isServer }: { isServer: boolean }) {
    if (!isServer) {
      // Forcefully cast resolve as any to add fallback
      config.resolve = {
        ...(config.resolve as any),
        fallback: {
          ...(config.resolve && (config.resolve as any).fallback),
          crypto: false,
          stream: false,
          buffer: false,
        },
      };
    }
    return config;
  },
  // Turbopack customization
  turbopack: {
    root: path.join(__dirname),
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    resolveAlias: {
      underscore: 'lodash',
    },
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
}

export default nextConfig
