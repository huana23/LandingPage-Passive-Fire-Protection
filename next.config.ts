import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow remote images you reference via <Image src="https://..." />
  // Currently we only use local /public/images, but this makes it safe to
  // drop in a CDN later without code changes.
  images: {
    // AVIF first (smallest), WebP fallback for very old browsers that don't
    // decode AVIF. PageSpeed's "Improve image delivery" and "Serve images
    // in next-gen formats" audits flag JPEG/PNG by default.
    formats: ["image/avif", "image/webp"],
    // `deviceSizes` is the list of widths next/image will generate when
    // `sizes` doesn't match a fixed pixel width. The default list is fine
    // for desktop, but it includes very large widths (3840) we never
    // ship. Trimming it cuts the number of responsive copies Next.js
    // generates for the LCP image and slightly reduces build time + cache
    // size on Vercel.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Quality 78 is the sweet spot — below ~70 you see banding in photos
    // like the CAFCO beams, above ~80 the savings are tiny but the
    // encode time balloons on Vercel's CPU budget.
    qualities: [78],
    // Keep optimized images cached on the CDN for 1 year. They're
    // content-addressed (URL includes a hash) so a new build always
    // busts the cache automatically.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "adwarnerpfp.au" },
      { protocol: "https", hostname: "*.vercel.com" },
    ],
  },

  // Use the project's `.browserslistrc` (modern targets only — no IE11 /
  // legacy mobile) to drive SWC's output. Without this, Next.js uses a
  // broader default list which forces it to ship ES5 fallbacks and
  // larger polyfill bundles. PageSpeed flags those as "Legacy JavaScript".
  // In Next.js 15.x this is implemented inside `experimental` even
  // though the public TS type hasn't caught up yet — the flag IS read
  // at build time. We cast through `unknown` to silence the TS warning
  // without disabling type checking elsewhere.
  experimental: {
    browsersListForSwc: true,
    // Tells Next.js to tree-shake lucide-react per-icon instead of
    // bundling the whole library. PageSpeed flags unused icon bytes
    // under "Reduce unused JavaScript" because we only import ~20 of
    // the ~1500 icons it ships.
    optimizePackageImports: ["lucide-react"],
    // ESM-externalize 3rd-party deps we don't tree-shake well so the
    // compiler doesn't pull unused branches into the main bundle.
    esmExternals: true,
  } as Record<string, unknown>,

  compiler: {
    // Strip `console.*` calls in production. The dev-only assertions in
    // `client-body.tsx` and `extension-guard-script.ts` never need to
    // ship. Set to `{ exclude: ["error", "warn"] }` if you ever need to
    // keep error logging — for now we keep them verbose in dev.
    removeConsole: process.env.NODE_ENV === "production",
    // Note: `swcMinify` is always on in Next.js 15 — the option was
    // removed because there is no longer an opt-out. We rely on the
    // build using SWC + Terser's minify path by default.
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
      // NOTE: HSTS only belongs in production. Leaving it on in dev makes
      // the browser remember "always use HTTPS for this host" which can
      // lock you out of http://localhost:3000 (and even worse, redirect
      // plain HTTP requests to the production https://adwarnerpfp.au/
      // if a previous user ever opened it). We gate the header behind
      // NEXT_PUBLIC_ENV so local dev stays on plain HTTP.
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
      {
        // Cache aggressively for already-compressed media. The hashes in
        // the URLs (e.g. _next/static/media/hero-*.jpg) make this safe.
        source: "/_next/static/media/(.*)",
        headers: longTermCache,
      },
      {
        // Same caching strategy for our optimised video assets.
        source: "/videos/(.*)",
        headers: [
          {
            key: "Cache-Control",
            // 30 days — videos are heavier than images so a shorter TTL
            // is friendlier for clients on tight data caps. Still long
            // enough that repeat visitors never re-download.
            value: "public, max-age=2592000, must-revalidate",
          },
        ],
      },
    ];
  },

  // Slightly tighter defaults that help SEO crawling.
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
};

export default nextConfig;
