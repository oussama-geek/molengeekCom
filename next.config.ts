/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      // // API Laravel
      // { source: "/api/:path*", destination: "http://localhost:8000/api/:path*" },
      // { source: "/sanctum/:path*", destination: "http://localhost:8000/sanctum/:path*" },

      // // Auth web Laravel (il te manque ceux-ci chez toi)
      // { source: "/login", destination: "http://localhost:8000/login" },
      // { source: "/logout", destination: "http://localhost:8000/logout" },
      // { source: "/register", destination: "http://localhost:8000/register" },

      // // OAuth
      // { source: "/auth/:path*", destination: "http://localhost:8000/auth/:path*" },

      // // Password reset
      // { source: "/forgot-password", destination: "http://localhost:8000/forgot-password" },
      // { source: "/reset-password", destination: "http://localhost:8000/reset-password" },
    ];
  },
};

module.exports = nextConfig;
