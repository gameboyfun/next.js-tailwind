/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        if (process.env.NODE_ENV === 'development') {
          return [
            {
              source: '/api/:path*',
              destination: 'https://google.com/api/:path*',
            },
          ];
        } else {
          return [
            {
              source: '/api/:path*',
              destination: 'https://google.com/api/:path*',
            },
          ];
        }
      },
};

module.exports = nextConfig;
