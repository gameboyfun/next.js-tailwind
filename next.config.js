/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: "/admin",
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: "https://google.com/api/:path*",
        },
      ];
    } else {
      return [
        {
          source: "/api/:path*",
          destination: "https://google.com/api/:path*",
        },
      ];
    }
  },
};

module.exports = nextConfig;
