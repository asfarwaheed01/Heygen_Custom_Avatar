/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["meomind.com"],
  },
  env: {
    HEYGENAPIKEY: process.env.HEYGENAPIKEY,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type,Authorization,x-api-key",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
