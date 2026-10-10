// Centralised content for the A&D Warner clone. Sourced from the live site
// (https://adwarnerpfp.com/). Every string here is the real production
// text — no placeholders.
//
// Images are served from /images/* (see public/images/).

import type { IconName as _IconName } from "./icons";

// Re-export so consumers can type their data without a second import line.
export type IconName = _IconName;

export type ServiceSlug =
  | "structural-steel-fireproofing"
  | "cafco-300"
  | "perlifoc-hp"
  | "fendolite-psk"
  | "fire-rated-duct-protection"
  | "repairs-rectification"
  | "additional-thickness-upgrades"
  | "qa-documentation";

export interface ServiceSummary {
  number: string;
  slug: ServiceSlug;
  title: string;
  blurb: string;
}

export interface ServiceDetail extends ServiceSummary {
  intro: string;
  bullets: string[];
  pricingNote: string;
}

export interface Project {
  title: string;
  image: string;
  location: string;
  scope: string;
  system?: string;
  body: string;
}

export const COMPANY = {
  name: "A&D Warner Pty Ltd",
  shortName: "A&D Warner",
  email: "Adwarnerptyltd@outlook.com",
  phone: "+61 403 332 685",
  phoneTel: "+61403332685",
  region: "Servicing Sydney & NSW-wide",
  copyright: "© 2026 A&D Warner Pty Ltd. All rights reserved.",
  tagline: "Passive Fire Protection — NSW",
  topBlurb: "Commercial fireproofing contractor",
  // Optional — set via NEXT_PUBLIC_SITE_URL env var on Vercel; fallback here.
  siteUrl: "https://adwarnerpfp.com",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = {
  services: [
    "Structural Steel Fireproofing",
    "CAFCO 300",
    "Perlifoc HP",
    "Fendolite & PSK Systems",
    "Fire-Rated Duct Protection",
    "Repairs & Rectification",
    "Additional Thickness & Upgrade Works",
    "QA & Project Documentation",
  ],
  company: [
    { label: "Home", href: "/" },
    { label: "All Services", href: "/services" },
    { label: "Recent Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Request a Quote", href: "/contact" },
  ],
};

export const STATS = [
  { value: "≈13 yrs", label: "Industry experience in spray-applied fire protection" },
  { value: "NSW", label: "Servicing Sydney and projects state-wide" },
  { value: "Commercial", label: "Built for Tier 1 and Tier 2 project environments" },
];

export const SERVICES: ServiceSummary[] = [
  {
    number: "01",
    slug: "structural-steel-fireproofing",
    title: "Structural Steel Fireproofing",
    blurb: "Spray-applied fire protection systems for structural steel to achieve specified fire-resistance requirements.",
  },
  {
    number: "02",
    slug: "cafco-300",
    title: "CAFCO 300",
    blurb: "Professional application of CAFCO 300 to structural steel and other specified applications.",
  },
  {
    number: "03",
    slug: "perlifoc-hp",
    title: "Perlifoc HP",
    blurb: "Application of Perlifoc HP systems in accordance with project specifications and manufacturer requirements.",
  },
  {
    number: "04",
    slug: "fendolite-psk",
    title: "Fendolite & PSK Systems",
    blurb: "Fire protection systems including Fendolite and PSK applications.",
  },
  {
    number: "05",
    slug: "fire-rated-duct-protection",
    title: "Fire-Rated Duct Protection",
    blurb: "Passive fire protection systems for ductwork and associated construction elements.",
  },
  {
    number: "06",
    slug: "repairs-rectification",
    title: "Repairs & Rectification",
    blurb: "Repairs, reinstatement and rectification of damaged or incomplete passive fire protection.",
  },
  {
    number: "07",
    slug: "additional-thickness-upgrades",
    title: "Additional Thickness & Upgrade Works",
    blurb:
      "Additional fireproofing thickness works where required by project specifications, inspections or revised requirements.",
  },
  {
    number: "08",
    slug: "qa-documentation",
    title: "QA & Project Documentation",
    blurb:
      "Professional thickness checks, photographic records and project QA documentation.",
  },
];

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  "structural-steel-fireproofing": {
    number: "01",
    slug: "structural-steel-fireproofing",
    title: "Structural Steel Fireproofing",
    blurb: "Spray-applied fire protection systems for structural steel to achieve specified fire-resistance requirements.",
    intro:
      "A&D Warner applies spray-applied fire protection to structural steel on commercial construction projects across Sydney and NSW. We work to the fire-resistance levels nominated in the project specifications and fire engineering requirements, applying cementitious fireproofing systems — including CAFCO 300 — to beams and ductwork at consistent, specified thickness using professional Immer spray pumps.",
    bullets: [
      "Spray application to structural steel beams and ductwork",
      "Application to specified fire-resistance levels (FRLs)",
      "Surface preparation and protection of adjoining work areas",
      "Thickness checking throughout application",
      "Photographic records and QA documentation",
      "Coordination with builders, steel erectors and other trades",
    ],
    pricingNote:
      "For project pricing, please send through drawings, specifications, quantities and any relevant fire engineering requirements where available.",
  },
  "cafco-300": {
    number: "02",
    slug: "cafco-300",
    title: "CAFCO 300",
    blurb: "Professional application of CAFCO 300 to structural steel and other specified applications.",
    intro:
      "A&D Warner is experienced in the application of CAFCO 300 spray-applied fireproofing on commercial projects across NSW. We apply CAFCO 300 with Immer spray pumps in accordance with manufacturer requirements and project specifications, with thickness checks and photographic QA records provided throughout the works.",
    bullets: [
      "CAFCO 300 application to structural steel",
      "Application in line with manufacturer requirements",
      "Thickness testing to specified fire-resistance levels",
      "Photographic QA records during application",
    ],
    pricingNote:
      "For project pricing, please send through drawings, specifications, quantities and any relevant fire engineering requirements where available.",
  },
  "perlifoc-hp": {
    number: "03",
    slug: "perlifoc-hp",
    title: "Perlifoc HP",
    blurb: "Application of Perlifoc HP systems in accordance with project specifications and manufacturer requirements.",
    intro:
      "We undertake Perlifoc HP application for commercial construction projects in Sydney and across NSW, installed in accordance with project specifications and manufacturer requirements. Our crews are experienced with spray-applied perlite-based fireproofing systems across structural beams and ductwork.",
    bullets: [
      "Perlifoc HP application to structural steel",
      "Application to project specifications and FRL requirements",
      "Manufacturer-compliant installation methods",
      "Thickness checking and QA records",
    ],
    pricingNote:
      "For project pricing, please send through drawings, specifications, quantities and any relevant fire engineering requirements where available.",
  },
  "fendolite-psk": {
    number: "04",
    slug: "fendolite-psk",
    title: "Fendolite & PSK Systems",
    blurb: "Fire protection systems including Fendolite and PSK applications.",
    intro:
      "A&D Warner applies Fendolite and PSK passive fire protection systems on commercial construction projects across NSW. Our team works with the major spray-applied fireproofing systems specified on Australian commercial projects, applied in accordance with manufacturer requirements and project documentation.",
    bullets: [
      "Fendolite system application",
      "PSK system application",
      "Application to manufacturer specifications",
      "Thickness testing and QA documentation",
    ],
    pricingNote:
      "For project pricing, please send through drawings, specifications, quantities and any relevant fire engineering requirements where available.",
  },
  "fire-rated-duct-protection": {
    number: "05",
    slug: "fire-rated-duct-protection",
    title: "Fire-Rated Duct Protection",
    blurb: "Passive fire protection systems for ductwork and associated construction elements.",
    intro:
      "We provide passive fire protection for ductwork and associated construction elements on commercial projects across Sydney and NSW. Fire-rated duct and service protection is applied in accordance with the project specifications, fire engineering requirements and manufacturer documentation for the nominated system.",
    bullets: [
      "Fire protection to commercial HVAC ductwork",
      "Application to specified fire-resistance levels",
      "Work in ceiling voids and plant areas",
      "Protection and preparation of work areas",
    ],
    pricingNote:
      "For project pricing, please send through drawings, specifications, quantities and any relevant fire engineering requirements where available.",
  },
  "repairs-rectification": {
    number: "06",
    slug: "repairs-rectification",
    title: "Repairs & Rectification",
    blurb: "Repairs, reinstatement and rectification of damaged or incomplete passive fire protection.",
    intro:
      "Damaged, incomplete or non-compliant fireproofing is a common issue on active commercial sites. A&D Warner undertakes repairs, reinstatement and rectification of existing passive fire protection — from impact and follow-on trade damage through to incomplete or failed applications that need to be brought up to specification.",
    bullets: [
      "Repairs to damaged spray-applied fireproofing",
      "Reinstatement after follow-on trade damage",
      "Rectification of incomplete or failed applications",
      "Existing fireproofing repairs on refurbishment projects",
    ],
    pricingNote:
      "For project pricing, please send through drawings, specifications, quantities and any relevant fire engineering requirements where available.",
  },
  "additional-thickness-upgrades": {
    number: "07",
    slug: "additional-thickness-upgrades",
    title: "Additional Thickness & Upgrade Works",
    blurb: "Additional fireproofing thickness works where required by project specifications, inspections or revised requirements.",
    intro:
      "Where inspections, revised fire engineering or updated specifications call for additional fireproofing thickness, A&D Warner can prepare and apply additional material to bring elements up to the required fire-resistance level. We undertake upgrade works on both new construction and existing buildings across NSW.",
    bullets: [
      "Additional thickness application to existing fireproofing",
      "Upgrade works following inspections or revised fire engineering",
      "Thickness testing to specified fire-resistance levels",
      "Photographic and project QA documentation",
    ],
    pricingNote:
      "For project pricing, please send through drawings, specifications, quantities and any relevant fire engineering requirements where available.",
  },
  "qa-documentation": {
    number: "08",
    slug: "qa-documentation",
    title: "QA & Project Documentation",
    blurb: "Professional thickness checks, photographic records and project QA documentation.",
    intro:
      "A&D Warner provides thorough QA and project documentation for spray-applied fireproofing works, including thickness checks, photographic records and written documentation to support handover. Records are produced as works progress so documentation matches the delivered application.",
    bullets: [
      "Thickness checks across the works",
      "Photographic QA records during application",
      "Project-specific QA documentation",
      "Handover-ready records for builders and fire engineers",
    ],
    pricingNote:
      "For project pricing, please send through drawings, specifications, quantities and any relevant fire engineering requirements where available.",
  },
};

export const WHY_US = [
  "Experienced passive fire protection team",
  "Commercial construction experience",
  "Professional Immer spray pumps and application equipment",
  "Ability to work with major fireproofing systems",
  "Strong focus on site safety",
  "Quality-focused workmanship",
  "Thickness checking and QA documentation",
  "Reliable communication",
  "Flexible labour and project capacity",
  "Ability to scale crews depending on project requirements",
];

export const QUALITY_TAGS: Array<{ label: string; icon: IconName }> = [
  { label: "Site safety requirements", icon: "shield-check" },
  { label: "PPE", icon: "hard-hat" },
  { label: "Site inductions", icon: "clipboard-check" },
  { label: "Toolbox talks", icon: "users" },
  { label: "Work-area protection", icon: "construction" },
  { label: "Thickness checking", icon: "ruler" },
  { label: "Photographic QA records", icon: "camera" },
  { label: "Project documentation", icon: "file-text" },
  { label: "Manufacturer requirements", icon: "factory" },
  { label: "Following project specifications", icon: "list-checks" },
];

export const PROJECTS: Project[] = [
  {
    title: "Spray-applied fireproofing to ductwork",
    image: "/images/ductwork-fireproofing.jpg",
    location: "NSW",
    scope: "Spray-applied cementitious fireproofing to commercial HVAC ductwork",
    body: "Commercial construction level showing spray-applied fireproofing to ductwork, with adjacent galvanised ducting and site plant in place during active works.",
  },
  {
    title: "CAFCO 300-covered structural beams",
    image: "/images/hero-cafco-beams.jpg",
    location: "NSW",
    scope: "Spray-applied CAFCO 300 fireproofing to structural beams",
    system: "CAFCO 300",
    body: "Commercial level with cementitious CAFCO 300 fireproofing spray-applied to structural beams, with site works coordinated around the protected steel.",
  },
  {
    title: "High-level structural beams with CAFCO 300",
    image: "/images/upper-level-structural-beams.jpg",
    location: "NSW",
    scope: "CAFCO 300 spray fireproofing to structural beams on an upper commercial level",
    system: "CAFCO 300",
    body: "Upper commercial floor plate with CAFCO 300 cementitious fireproofing applied to structural beams, with services and edge protection in place during construction.",
  },
  {
    title: "Steel beam spray application with detailed masking",
    image: "/images/spray-masking-floor.jpg",
    location: "NSW",
    scope:
      "Spray-applied fireproofing to structural steel beams with detailed masking to adjoining elements",
    body: "Commercial construction floor plate showing spray-applied fireproofing applied to structural steel beams with detailed masking to adjoining elements and services, during active site works.",
  },
  {
    title: "Spray-applied CAFCO 300 coating detail — steel beam interface",
    image: "/images/cafco-beam-closeup.jpg",
    location: "NSW",
    scope:
      "Close-up of cementitious CAFCO 300 spray fireproofing at a structural beam interface",
    system: "CAFCO 300",
    body: "Detail of freshly applied cementitious CAFCO 300 fireproofing at a structural beam interface, illustrating finish quality and coverage around connections.",
  },
];

export const SHOWCASE = [
  { title: "CAFCO 300 beams", body: "Structural beams with CAFCO 300 covering", image: "/images/hero-cafco-beams.jpg" },
  { title: "Upper-level CAFCO 300 works", body: "Structural beams", image: "/images/upper-level-structural-beams.jpg" },
  { title: "Steel beam spray & masking", body: "Spray-applied fireproofing to structural beams with detailed masking", image: "/images/spray-masking-floor.jpg" },
  { title: "Ductwork spray application", body: "Spray-applied fireproofing to ductwork", image: "/images/ductwork-fireproofing.jpg" },
];

export const CONTACT_FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "company", label: "Company", type: "text" },
  { name: "phone", label: "Phone", type: "tel" },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "projectName", label: "Project name", type: "text" },
  { name: "projectLocation", label: "Project location", type: "text" },
  { name: "scope", label: "Approximate scope", type: "text" },
  { name: "startDate", label: "Required start date", type: "date" },
  { name: "message", label: "Message", type: "textarea" },
];

// Helper: get the "other services" list (excluding the current one).
export function otherServices(slug: ServiceSlug): ServiceSummary[] {
  return SERVICES.filter((s) => s.slug !== slug).slice(0, 4);
}
