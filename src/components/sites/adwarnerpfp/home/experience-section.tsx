import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/adwarnerpfp/icons";
import { Photo } from "@/components/sites/adwarnerpfp/photo";
import { Reveal } from "@/components/sites/adwarnerpfp/reveal";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";
import { SHOWCASE } from "@/components/sites/adwarnerpfp/data";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <SectionShell number="04" label="Experience">
      <div className="container">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Track record
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Experience You Can Rely On
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              The A&D Warner team brings extensive experience in passive fire
              protection and commercial construction, with approximately 13 years
              of industry experience across spray-applied fire protection
              projects.
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
              Our background spans commercial construction environments and
              projects involving structural steel, repairs, fireproofing upgrades
              and fire-rated ductwork — working alongside builders, fire
              protection contractors and fire engineers to deliver compliant,
              well-documented outcomes.
            </p>
            <div className="mt-10 flex items-end gap-4 border-l-4 border-accent pl-6">
              <span className="font-display text-6xl font-black leading-none">
                13
              </span>
              <span className="pb-1 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Years of industry
                <br />
                experience (approx.)
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-6">
            <Reveal>
              <div className="border border-foreground/20 bg-card p-3 shadow-hard-sm">
                <Photo
                  src="/images/hero-cafco-beams.jpg"
                  alt="CAFCO 300-covered structural beams on a commercial construction level in NSW"
                  className="aspect-[3/4] w-full"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
            </Reveal>
            <Reveal className="mt-10">
              <div className="border border-foreground/20 bg-card p-3 shadow-hard-sm">
                <Photo
                  src="/images/spray-masking-floor.jpg"
                  alt="Commercial construction floor plate in NSW with structural beams and active site works"
                  className="aspect-[3/4] w-full"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <Reveal>
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              Project Showcase
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Site photography from commercial construction environments where
              spray-applied fireproofing is delivered. Full case studies with
              builder and system details can be added as projects are documented.
            </p>
          </Reveal>
          <div className="showcase mt-8 grid border border-foreground/25 sm:grid-cols-2 lg:grid-cols-4">
            {SHOWCASE.map((item) => (
              <div
                key={item.title}
                className="showcase-item border-b border-foreground/25 bg-background"
              >
                <Reveal className="flex h-full flex-col p-6">
                  <div className="overflow-hidden border border-foreground/15">
                    <Photo
                      src={item.image}
                      alt={item.title}
                      className="aspect-[3/2] w-full object-cover object-center"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                  <span className="mt-4 block font-display text-lg font-bold">
                    {item.title}
                  </span>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </Reveal>
              </div>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:text-foreground"
            >
              View projects page
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
