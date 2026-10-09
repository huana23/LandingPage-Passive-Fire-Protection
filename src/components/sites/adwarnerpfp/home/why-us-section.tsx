import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/adwarnerpfp/icons";
import { Reveal } from "@/components/sites/adwarnerpfp/reveal";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";
import { WHY_US } from "@/components/sites/adwarnerpfp/data";

/**
 * "03 — Why us" section: a dark band with a sticky left column (title + CTA)
 * and a right column that lists 10 numbered bullets in a borderless ordered
 * list.
 */
export function WhyUsSection() {
  return (
    <SectionShell
      number="03"
      label="Why us"
      className="bg-foreground py-24 text-background [&>span]:text-background/40"
    >
      <div className="container grid gap-16 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="self-start lg:sticky lg:top-32">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Why A&D Warner
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Why Work With A&D Warner?
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-background/70">
            We are a professional passive fire protection subcontractor set up
            for commercial construction — reliable to deal with, safety-conscious on site,
            and able to scale to the demands of larger projects.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            Request a Quote
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Reveal>

        <ol className="border-y border-background/15">
          {WHY_US.map((item, idx) => (
            <li
              key={item}
              className="flex items-baseline gap-6 border-b border-background/15 py-5 last:border-b-0"
            >
              <span className="font-display text-sm font-bold tracking-widest text-accent">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-lg">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
