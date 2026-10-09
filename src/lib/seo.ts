import type { Metadata } from "next";

export const DEFAULT_KEYWORDS = [
  "dịch vụ",
  "doanh nghiệp",
  "Việt Nam",
];

export function buildPageMetadata(
  title: string,
  description: string,
  path = "/"
): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://example.com";

  return {
    title,
    description,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: new URL(path, baseUrl).toString(),
      type: "website",
      locale: "vi_VN",
    },
  };
}

export function localBusinessJsonLd(company: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.name,
    description: company.description,
    url: process.env.NEXT_PUBLIC_SITE_URL || undefined,
  };
}