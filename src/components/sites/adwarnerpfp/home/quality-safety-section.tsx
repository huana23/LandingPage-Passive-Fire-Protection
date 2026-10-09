import { Reveal } from "@/components/sites/adwarnerpfp/reveal";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";
import { QUALITY_TAGS } from "@/components/sites/adwarnerpfp/data";
import { pickIcon } from "@/components/sites/adwarnerpfp/icons";

export function QualitySafetySection() {
  return (
    <SectionShell
      number="05"
      label="Quality & Safety"
      className="bg-secondary/60"
    >
      <div className="container">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            How we work
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Quality, Safety & Compliance
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A&D Warner takes site safety, quality control and project
            documentation seriously. Every project is delivered in line with
            site safety requirements, manufacturer requirements and the project
            specifications — and backed by practical QA records.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-px border border-foreground/15 bg-foreground/15 sm:grid-cols-2 lg:grid-cols-5">
          {QUALITY_TAGS.map((tag) => {
            const Icon = pickIcon(tag.icon);
            return (
              <Reveal
                key={tag.label}
                className="flex items-center gap-4 bg-background p-5"
              >
                <Icon className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.75} />
                <span className="text-sm font-semibold leading-snug">
                  {tag.label}
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
