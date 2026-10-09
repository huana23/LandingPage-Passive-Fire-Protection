import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sites/adwarnerpfp/page-header";
import { CtaBand } from "@/components/sites/adwarnerpfp/cta-band";
import { Reveal } from "@/components/sites/adwarnerpfp/reveal";
import { Photo } from "@/components/sites/adwarnerpfp/photo";
import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@/components/sites/adwarnerpfp/icons";
import {
  SERVICE_DETAILS,
  SERVICES,
  SHOWCASE,
  otherServices,
  type ServiceSlug,
} from "@/components/sites/adwarnerpfp/data";

const SLUGS = SERVICES.map((s) => s.slug);
const SERVICE_IMAGES: string[] = SHOWCASE.map((item) => item.image);

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUGS.includes(slug as ServiceSlug)) return {};
  const detail = SERVICE_DETAILS[slug as ServiceSlug];
  return {
    title: `${detail.title} | A&D Warner`,
    description: detail.intro.slice(0, 160),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as ServiceSlug)) {
    notFound();
  }
  const detail = SERVICE_DETAILS[slug as ServiceSlug];
  const others = otherServices(slug as ServiceSlug);
  const serviceIndex = SERVICES.findIndex((s) => s.slug === slug);
  const heroImage = SERVICE_IMAGES[
    serviceIndex >= 0 ? serviceIndex % SERVICE_IMAGES.length : 0
  ];

  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow={`Service ${detail.number} — A&D Warner Pty Ltd`}
        title={detail.title}
        description={detail.blurb}
      />

      <section className="relative py-24">
        <div className="container grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          {/* Main column */}
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              {detail.title} across Sydney &amp; NSW
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {detail.intro}
            </p>

            <h3 className="mt-12 font-display text-xl font-bold tracking-tight">
              What&apos;s included
            </h3>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {detail.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 text-sm leading-relaxed"
                >
                  <CheckIcon
                    strokeWidth={2.5}
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 border border-foreground/20 bg-secondary/60 p-6">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {detail.pricingNote}
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:text-foreground"
              >
                Request a quote
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="space-y-8 self-start lg:sticky lg:top-32">
            <div className="border border-foreground/20 bg-card p-3 shadow-hard">
              <Photo
                src={heroImage}
                alt={`${detail.title} — spray-applied fireproofing in NSW`}
                className="aspect-[3/2] w-full"
                sizes="(min-width: 1024px) 33vw, 100vw"
              />
            </div>
            <div className="bg-foreground p-8 text-background">
              <h3 className="font-display text-xl font-bold leading-snug">
                Need {detail.title.toLowerCase()} on your project?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-background/70">
                Talk to A&amp;D Warner about your scope, program and
                fireproofing requirements.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                Request a Quote
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative border-t border-foreground/15 py-24">
        <div className="container">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight">
              Other services
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-px border border-foreground/15 bg-foreground/15 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col bg-background p-6 transition-colors hover:bg-foreground hover:text-background"
              >
                <span className="font-display text-sm font-bold tracking-widest text-accent">
                  {service.number}
                </span>
                <span className="mt-4 font-display text-lg font-bold leading-snug">
                  {service.title}
                </span>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-xs font-bold uppercase tracking-widest text-foreground transition-colors group-hover:text-accent">
                  View
                  <ArrowUpRightIcon className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:text-foreground"
            >
              View all services
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        image="/images/upper-level-structural-beams.jpg"
        imageAlt="Upper commercial floor plate with spray-applied fireproofing on structural beams"
        headline="Have a Project That Requires Passive Fire Protection?"
        blurb="Talk to A&D Warner about your upcoming project, fireproofing requirements or passive fire protection scope."
      />
    </main>
  );
}
