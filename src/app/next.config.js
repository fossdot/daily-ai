/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/daily-ai',
  assetPrefix: '/daily-ai/',
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 