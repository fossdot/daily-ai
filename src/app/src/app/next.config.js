/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/daily-ai',
  assetPrefix: '/daily-ai/',
  trailingSlash: true,
}

module.exports = nextConfig 