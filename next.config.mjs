/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
          {
              source: '/api/get-access-token',
              destination: 'https://main.dal9auz5q4mbe.amplifyapp.com/api/get-access-token',
          }
      ];
  },
  async headers() {
      return [
          {
              source: '/api/:path*',
              headers: [
                  { key: 'Access-Control-Allow-Origin', value: '*' },
                  { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
                  { key: 'Access-Control-Allow-Headers', value: 'Content-Type,Authorization,x-api-key' },
              ],
          },
      ];
  },
};

export default nextConfig;
