/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/expyr.ai',
  assetPrefix: '/expyr.ai/',
}

module.exports = nextConfig 