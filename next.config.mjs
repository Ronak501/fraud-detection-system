/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, //Enable React Strict Mode

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
