import type { Metadata, Viewport } from "next";
import { Archivo, Roboto_Slab } from "next/font/google";
import { SiteHeader } from "@/components/sites/adwarnerpfp/site-header";
import { SiteFooter } from "@/components/sites/adwarnerpfp/site-footer";
import { ClientBody } from "@/components/sites/adwarnerpfp/client-body";
import { ScrollToTop } from "@/components/sites/adwarnerpfp/scroll-to-top";
import { EXTENSION_ATTRIBUTE_GUARD_SCRIPT } from "@/components/sites/adwarnerpfp/extension-guard-script";
import { COMPANY } from "@/components/sites/adwarnerpfp/data";
import { buildPageMetadata, localBusinessJsonLd, DEFAULT_KEYWORDS } from "@/lib/seo";
import "./globals.css";

// Both fonts use `display: "swap"` so text is always painted with the
// system fallback (Inter/system-ui) instead of being invisible while the
// woff2 downloads. Without `swap`, a slow Google Fonts handshake blanks
// the page for hundreds of milliseconds and PageSpeed flags it as
// "Ensure text remains visible during webfont load".
//
// `preload: true` (the default) writes a <link rel=preload as=font
// crossOrigin> for each weight in the head — that's what removes the
// "render-blocking external stylesheet" penalty from the Google Fonts
// CSS request.
//
// We trim Roboto_Slab's weights from 5 → 4 — the site never uses 900;
// the loudest heading weight is 800 (the "font-black" utility). Dropping
// 900 trims ~25 KB of woff2 + one <link rel=preload> from the head.
const archivo = Archivo({
  variable: "--ff-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

const robotoSlab = Roboto_Slab({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: [
    "Georgia",
    "ui-serif",
    "Cambria",
    "Times New Roman",
    "Times",
    "serif",
  ],
});

export const viewport: Viewport = {
  themeColor: "#c63d2a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: {
      default: `${COMPANY.name} | Passive Fire Protection NSW`,
      template: `%s | ${COMPANY.name}`,
    },
    description:
      "A&D Warner provides spray-applied fire protection and passive fireproofing services for commercial construction projects across Sydney and NSW. CAFCO 300, Perlifoc HP, Fendolite & PSK systems, fire-rated duct protection, repairs and QA documentation.",
    path: "/",
    keywords: DEFAULT_KEYWORDS,
  }),
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.name }],
  creator: COMPANY.name,
  publisher: COMPANY.name,
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  category: "Construction",
  icons: {
    // In Next.js 15 App Router, a file at `src/app/favicon.ico` is auto-
    // served at `/favicon.ico`, and a file at `src/app/apple-icon.png`
    // is auto-served at `/apple-icon.png`. The metadata.icons block
    // below just makes sure the <link rel="icon"> tags appear in <head>
    // pointing at those auto-generated URLs. We keep an explicit
    // <link rel="icon" type="image/svg+xml" href="/favicon.svg"> in the
    // <head> below for browsers that prefer vector favicons.
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://adwarnerpfp.com/",
  },
  // Replace these with the codes from Google Search Console + Bing Webmaster
  // after you verify the domain. Empty strings are fine — Next.js will
  // simply omit the <meta name="google-site-verification"> tag.
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
    // other: { "msvalidate.01": "bing-code-here" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${archivo.variable} ${robotoSlab.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* The hero LCP image is auto-preloaded by Next/Image (it emits its
            own <link rel=preload as=image fetchPriority=high> with the full
            responsive srcset). We let Next.js do it — adding a manual
            preload here would double-fetch the same image. Kept as a
            comment so the next person doesn't try to "improve" it. */}
        {/* Preconnect to the Google Fonts CDN. The CSS is downloaded during
            SSR by next/font, but the font FILES (woff2) still come from
            fonts.gstatic.com. A preconnect saves the TLS handshake on the
            first woff2 download, which otherwise adds ~100-200ms on mobile. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Runs synchronously before React hydrates — strips extension-
            injected attributes from the entire document so the SSR HTML
            matches the client DOM.
            NOTE: we wrap the inline body in `try/catch` and skip the rAF
            sweep entirely on first parse so it cannot slow down the
            critical rendering path. The post-hydration MutationObserver
            in ClientBody now handles ALL ongoing stripping. This script
            only does a single synchronous pass — enough to prevent the
            hydration mismatch, but it never yields back into the rAF
            loop that previously pegged the main thread for 5 seconds. */}
        <script
          dangerouslySetInnerHTML={{
            __html: EXTENSION_ATTRIBUTE_GUARD_SCRIPT,
          }}
        />
        {/* Web App Manifest. Next.js 15 needs an explicit <link> tag here
            for non-default manifest file names. */}
        <link rel="manifest" href="/site.webmanifest" />
        {/* Safari pinned-tab (macOS Safari). It takes a single-colour SVG
            and applies its own fill. The .svg format keeps the icon crisp
            at any zoom level in the pinned-tab bar. */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c63d2a" />
        {/* Microsoft tile configuration (Windows Start menu / Edge pinned
            tabs). browserconfig.xml points to the 150x150 PNG and sets
            the tile background colour. */}
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#c63d2a" />
        <meta name="theme-color" content="#c63d2a" />
        {/* Explicit <link rel="icon"> for crawlers. In Next.js App Router,
            `/favicon.ico` is served from `src/app/favicon.ico`,
            `/apple-icon.png` from `src/app/apple-icon.png`, and
            `/favicon.svg` from `public/favicon.svg`. Listing them
            here as classic <link> tags (in addition to metadata.icons)
            is what Google's favicon crawler expects. */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/svg+xml"
          sizes="any"
          href="/favicon.svg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon.png"
        />
        {/* LocalBusiness + Organization + WebSite JSON-LD. Repeating on every
            page helps Google associate the entity with the site. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd(COMPANY)),
          }}
        />
        {/* Geo / region meta tags. */}
        <meta name="geo.region" content="AU-NSW" />
        <meta name="geo.placename" content="Sydney, New South Wales" />
        <meta name="ICBM" content="-33.8688,151.2093" />
        {/* Format-detection re-asserts native mobile behaviour (we still want
            addresses and phones tappable; we just turn OFF auto-linking of
            email so that <a href="mailto:"> is the only mailto link). */}
        <meta name="format-detection" content="telephone=yes" />
      </head>
      <ClientBody className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="flex min-h-[100dvh] flex-1 flex-col">{children}</div>
        <SiteFooter />
        <ScrollToTop />
      </ClientBody>
    </html>
  );
}
