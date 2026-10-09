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

const archivo = Archivo({
  variable: "--ff-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  variable: "--ff-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
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
    icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
    apple: "/apple-icon.svg",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://adwarnerpfp.com/",
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
        {/* Runs synchronously before React hydrates — strips extension-
            injected attributes from the entire document so the SSR HTML
            matches the client DOM. */}
        <script
          dangerouslySetInnerHTML={{
            __html: EXTENSION_ATTRIBUTE_GUARD_SCRIPT,
          }}
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
