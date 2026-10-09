import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/adwarnerpfp/icons";
import { Photo } from "@/components/sites/adwarnerpfp/photo";
import { COMPANY, STATS } from "@/components/sites/adwarnerpfp/data";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col bg-foreground text-background">
      <Photo
        src="/images/hero-cafco-beams.jpg"
        alt="Commercial level in NSW with CAFCO 300 spray fireproofing covering structural beams during passive fire protection works"
        className="absolute inset-0 h-full w-full"
        imageClassName="object-cover object-center"
        sizes="100vw"
        priority
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/25"
        aria-hidden="true"
      />

      <div className="container relative flex flex-1 flex-col justify-center py-24">
        <div>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-background/80">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            {COMPANY.name} — {COMPANY.topBlurb}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-black uppercase leading-[0.98] tracking-tight md:text-7xl">
            Passive Fire <span className="text-accent">Protection</span> Specialists
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/80 md:text-xl">
            Professional spray-applied fire protection for commercial construction
            projects across NSW.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-background hover:text-foreground"
            >
              Request a Quote
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center gap-2 border border-background/60 px-8 py-4 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:border-background hover:bg-background hover:text-foreground"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>

      <div className="relative border-t border-background/20">
        <div className="container grid gap-6 py-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-background/20">
          {STATS.map((stat) => (
            <div key={stat.label} className="sm:px-6 sm:first:pl-0">
              <span className="font-display text-2xl font-bold text-accent">
                {stat.value}
              </span>
              <p className="mt-1 text-sm text-background/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
