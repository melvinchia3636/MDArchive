/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/null/null',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
