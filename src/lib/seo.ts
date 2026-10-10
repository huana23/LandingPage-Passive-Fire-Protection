import type { Metadata } from "next";

type PageMetadataOptions = {
  title: Metadata["title"];
  description: string;
  path?: string;
  keywords?: string[];
  ogImage?: string;
};

type CompanyInfo = {
  name: string;
  email?: string;
  phoneTel?: string;
  shortName?: string;
};

export const DEFAULT_KEYWORDS = [
  "passive fire protection",
  "passive fire protection nsw",
  "passive fire protection sydney",
  "fireproofing nsw",
  "fireproofing sydney",
  "spray-applied fire protection",
  "spray-applied fireproofing",
  "Sydney fire protection",
  "structural steel fireproofing",
  "CAFCO 300 applicator",
  "CAFCO 300 sydney",
  "Perlifoc HP applicator",
  "Perlifoc HP sydney",
  "Fendolite applicator",
  "PSK systems",
  "fire-rated duct protection",
  "fire protection contractor nsw",
  "fire protection contractor sydney",
  "fireproofing contractor sydney",
  "fireproofing repairs nsw",
  "fire protection rectification",
  "additional fireproofing thickness",
  "QA documentation fireproofing",
  "commercial fireproofing nsw",
  "FRL compliance",
  "AS 1530.4",
  "NCC Section C",
  "Tier 1 builder fireproofing",
  "Tier 2 builder fireproofing",
  "passive fire protection subcontractor nsw",
];

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = DEFAULT_KEYWORDS,
  ogImage = "/images/og/og-default.jpg",
}: PageMetadataOptions): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://adwarnerpfp.com";

  const canonicalUrl = new URL(path, baseUrl).toString();
  const ogImageUrl = new URL(ogImage, baseUrl).toString();

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title ?? undefined,
      description,
      url: canonicalUrl,
      type: "website",
      locale: "en_AU",
      siteName: "A&D Warner Passive Fire Protection",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "A&D Warner — Passive Fire Protection NSW",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? undefined,
      description,
      images: [ogImageUrl],
    },
  };
}

/**
 * Full LocalBusiness + Organization + WebSite JSON-LD graph.
 * Repeating on every page helps Google associate the entity with the site.
 */
export function localBusinessJsonLd(company: CompanyInfo) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://adwarnerpfp.com";

  const telephone = company.phoneTel || "";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "GeneralContractor", "FireProtectionService"],
        "@id": `${baseUrl}/#business`,
        name: company.name,
        alternateName: company.shortName || "A&D Warner",
        url: baseUrl,
        image: `${baseUrl}/images/og/og-default.jpg`,
        logo: `${baseUrl}/icon.svg`,
        telephone,
        email: company.email,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sydney",
          addressRegion: "NSW",
          addressCountry: "AU",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -33.8688,
          longitude: 151.2093,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: "New South Wales" },
          { "@type": "City", name: "Sydney" },
          { "@type": "City", name: "Newcastle" },
          { "@type": "City", name: "Wollongong" },
          { "@type": "City", name: "Parramatta" },
          { "@type": "City", name: "Penrith" },
          { "@type": "City", name: "Liverpool" },
          { "@type": "City", name: "Campbelltown" },
          { "@type": "City", name: "Blacktown" },
          { "@type": "City", name: "Central Coast" },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "07:00",
            closes: "17:00",
          },
        ],
        knowsAbout: [
          "Passive Fire Protection",
          "Spray-applied fireproofing",
          "CAFCO 300",
          "Perlifoc HP",
          "Fendolite",
          "PSK Systems",
          "Fire-rated duct protection",
          "FRL Compliance",
          "AS 1530.4",
          "NCC Vol1 Section C",
          "Structural Steel Fireproofing",
          "Fire protection repairs and rectification",
          "QA & project documentation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Passive Fire Protection Services",
          itemListElement: [
            "Structural Steel Fireproofing",
            "CAFCO 300 Application",
            "Perlifoc HP Application",
            "Fendolite & PSK Systems",
            "Fire-Rated Duct Protection",
            "Repairs & Rectification",
            "Additional Thickness Upgrades",
            "QA & Project Documentation",
          ].map((name, i) => ({
            "@type": "Offer",
            position: i + 1,
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: company.name,
        publisher: { "@id": `${baseUrl}/#business` },
        inLanguage: "en-AU",
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: company.name,
        legalName: "A&D Warner Pty Ltd",
        url: baseUrl,
        logo: `${baseUrl}/icon.svg`,
        email: company.email,
        contactPoint: {
          "@type": "ContactPoint",
          telephone,
          contactType: "customer service",
          areaServed: "AU",
          availableLanguage: ["English"],
        },
      },
    ],
  };
}

/**
 * Service schema for individual service pages (e.g. /services/cafco-300).
 */
export function serviceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://adwarnerpfp.com";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Passive Fire Protection",
    name: opts.name,
    description: opts.description,
    url: `${baseUrl}/services/${opts.slug}`,
    provider: { "@id": `${baseUrl}/#business` },
    areaServed: { "@type": "AdministrativeArea", name: "New South Wales" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "AUD",
      category: "Construction",
    },
  };
}

/**
 * FAQ schema. Pass an array of { question, answer } pairs.
 */
export function faqJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/**
 * BreadcrumbList schema. Pass ordered list of { label, href? }.
 * Last item's `href` is optional (it's the current page).
 */
export function breadcrumbJsonLd(
  items: { label: string; href?: string }[]
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://adwarnerpfp.com";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      item: it.href ? `${baseUrl}${it.href}` : undefined,
    })),
  };
}
