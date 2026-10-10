import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow remote images you reference via <Image src="https://..." />
  // Currently we only use local /public/images, but this makes it safe to
  // drop in a CDN later without code changes.
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "adwarnerpfp.com" },
      { protocol: "https", hostname: "*.vercel.com" },
    ],
  },

  // SEO + security headers applied to every response. We keep the list
  // conservative so it never breaks a Google crawler or ad verification
  // pixel; only add a directive if you understand the trade-off.
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ];

    const longTermCache = [
      {
        key: "Cache-Control",
        value: "public, max-age=31536000, immutable",
      },
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/_next/static/(.*)",
        headers: longTermCache,
      },
      {
        source: "/images/(.*)",
        headers: longTermCache,
      },
    ];
  },

  // Slightly tighter defaults that help SEO crawling.
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
