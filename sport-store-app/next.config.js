/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Desactiva ESLint durante el build
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'golty.com.co',
      'wilsonstore.com.pe',
      'neo2.com',
      'siman.vtexassets.com',
      'decathlon.com',
      'ss201.liverpool.com.mx',
      'i.blogs.es',
      'bellini.es',
      'padelstore.mx',
      'i.ebayimg.com',
      'www.neo2.com',
      'contents.mediadecathlon.com'
    ],
  },
}

module.exports = nextConfig
