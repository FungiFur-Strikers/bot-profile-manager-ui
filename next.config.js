/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    API_URL: process.env.API_URL,
    ADMIN_USER_EMAIL: process.env.ADMIN_USER_EMAIL,
    ADMIN_USER_PASSWORD: process.env.ADMIN_USER_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

module.exports = nextConfig;
