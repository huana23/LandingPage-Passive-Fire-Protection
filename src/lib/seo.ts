import type { Metadata } from "next";

type PageMetadataOptions = {
  title: Metadata["title"];
  description: string;
  path?: string;
  keywords?: string[];
};

type CompanyInfo = {
  name: string;
  description?: string;
  url?: string;
  [key: string]: unknown;
};

export const DEFAULT_KEYWORDS = [
  "passive fire protection",
  "fireproofing NSW",
  "spray-applied fire protection",
  "Sydney fire protection",
  "CAFCO 300",
  "Perlifoc HP",
  "Fendolite",
  "fire-rated duct protection",
];

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = DEFAULT_KEYWORDS,
}: PageMetadataOptions): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://adwarnerpfp.com";

  const canonicalUrl = new URL(path, baseUrl).toString();

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      locale: "en_AU",
      siteName: "A&D Warner Passive Fire Protection",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function localBusinessJsonLd(company: CompanyInfo) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://adwarnerpfp.com";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    url: company.url || baseUrl,
  };
}