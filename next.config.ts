import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ]
  },
  // pg is a native Node package — bundling it drags fs/path into edge and
  // client compiles (instrumentation.ts is built for every runtime).
  serverExternalPackages: ['pg'],
  transpilePackages: ['geist'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

// The Sontara preview splices a basePath into the object literal above.
// Next only prefixes its OWN routing with it, so republish it for the
// hand-written fetch()/href calls (lib/base-path.ts reads this).
nextConfig.env = { ...nextConfig.env, NEXT_PUBLIC_BASE_PATH: nextConfig.basePath ?? '' };

export default nextConfig;
