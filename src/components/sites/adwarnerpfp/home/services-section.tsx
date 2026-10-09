import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/sites/adwarnerpfp/icons";
import { Reveal } from "@/components/sites/adwarnerpfp/reveal";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";
import { SERVICES } from "@/components/sites/adwarnerpfp/data";
import { cn } from "@/lib/utils";

/**
 * "02 — Services" section: a responsive grid of service cards
 * (1-col mobile, 2-col sm, 4-col lg).
 *
 * Each cell draws all four borders so the divider lines are visible on every
 * cell — including the first column (left) and the first row (top). The
 * `-mb-px -mr-px` negative margins pull each cell 1px under its right and
 * bottom neighbours so the shared edges collapse into a single 1px line
 * instead of doubling up.
 */
export function ServicesSection() {
  return (
    <SectionShell
      number="02"
      label="Services"
      className="bg-secondary/60"
    >
      <div className="container">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              What we do
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Our Services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:text-accent"
          >
            View all services
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            return (
              <Reveal
                key={service.slug}
                className="-mb-px -mr-px border border-foreground/25"
              >
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col bg-background p-6 transition-colors",
                    "hover:bg-foreground hover:text-background",
                    "focus-visible:bg-foreground focus-visible:text-background",
                  )}
                >
                  <span className="font-display text-sm font-bold tracking-widest text-accent">
                    {service.number}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug">
                    {service.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed text-muted-foreground transition-colors",
                      "group-hover:text-background/70",
                    )}
                  >
                    {service.blurb}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-6 text-xs font-bold uppercase tracking-widest text-foreground transition-colors group-hover:text-accent">
                    Details
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
