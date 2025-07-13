/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['dummyjson.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '',
        pathname: '/icon/**',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
