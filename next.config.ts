import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow remote images you reference via <Image src="https://..." />
  // Currently we only use local /public/images, but this makes it safe to
  // drop in a CDN later without code changes.
  images: {
    formats: ["image/avif", "image/webp"],
    // `deviceSizes` is the list of widths next/image will generate when
    // `sizes` doesn't match a fixed pixel width. The default list is fine
    // for desktop, but it includes very large widths (3840) we never ship.
    // Trimming it cuts the number of responsive copies Next.js generates
    // for the LCP image and slightly reduces build time + cache size on
    // Vercel. We keep 16 device sizes to cover every common phone/tablet.
    deviceSizes: [
      640, 750, 828, 1080, 1200, 1440, 1920, 2048,
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Quality 75 is the sweet spot PageSpeed recommends — below ~70 you see
    // banding in photos like the CAFCO beams, above ~80 the savings are
    // tiny but the encode time balloons on Vercel's CPU budget.
    qualities: [75],
    // Keep optimized images cached on the CDN for 1 year. They're content-
    // addressed (URL includes a hash) so a new build always busts the
    // cache automatically.
    minimumCacheTTL: 31536000,
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
      // NOTE: HSTS only belongs in production. Leaving it on in dev makes the
    // browser remember "always use HTTPS for this host" which can lock you
    // out of http://localhost:3000 (and even worse, redirect plain HTTP
    // requests to the production https://adwarnerpfp.com/ if a previous
    // user ever opened it). We gate the header behind NEXT_PUBLIC_ENV so
    // local dev stays on plain HTTP.
    ...(process.env.NEXT_PUBLIC_ENV === "production"
      ? [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ]
      : []),
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
