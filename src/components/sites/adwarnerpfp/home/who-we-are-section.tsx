import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/adwarnerpfp/icons";
import { Photo } from "@/components/sites/adwarnerpfp/photo";
import { Reveal } from "@/components/sites/adwarnerpfp/reveal";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";
import { COMPANY } from "@/components/sites/adwarnerpfp/data";

export function WhoWeAreSection() {
  return (
    <SectionShell number="01" label="Who we are">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            {COMPANY.name}
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Reliable Passive Fire Protection for Commercial Construction
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {COMPANY.name} provides passive fire protection and spray-applied
            fireproofing services for commercial construction projects across
            Sydney and NSW, with a focus on quality workmanship, site safety,
            productivity and reliable project delivery.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            We work directly with builders, fire protection contractors and
            construction companies, and we are set up to undertake both smaller
            scopes and larger commercial projects — from rectification works
            through to full structural steel fireproofing packages.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent transition-colors hover:text-foreground"
          >
            Discuss your project
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal className="relative">
          <div className="border border-foreground/20 bg-card p-3 shadow-hard">
            <Photo
              src="/images/upper-level-structural-beams.jpg"
              alt="High commercial floor plate with CAFCO 300-covered structural beams in NSW"
              className="aspect-[3/2] w-full"
            />
          </div>
          <div className="absolute -bottom-10 -left-6 hidden w-52 -rotate-3 border border-foreground/20 bg-card p-2 shadow-hard-sm md:block">
            <Photo
              src="/images/cafco-beam-closeup.jpg"
              alt="Close-up of CAFCO 300 cementitious fireproofing on a structural steel beam"
              className="aspect-[3/2] w-full"
              sizes="208px"
            />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
