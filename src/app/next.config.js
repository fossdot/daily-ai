/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/daily-ai', // Updated repository name
  assetPrefix: '/daily-ai/',
  trailingSlash: true,
}

module.exports = nextConfig 