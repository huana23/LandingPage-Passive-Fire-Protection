import { PlayIcon } from "@/components/sites/adwarnerpfp/icons";
import { Reveal } from "@/components/sites/adwarnerpfp/reveal";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";

/**
 * "05 — Process" section: showcases two short clips of the crew working
 * on actual jobs (spray application, surface prep, masking, etc). We keep
 * the layout lean: each video lives inside a framed "specimen" card that
 * mirrors the rest of the site's industrial editorial style.
 *
 * Videos are served from /videos/* (see public/videos/) — same approach as
 * the photo grid in `experience-section.tsx`.
 */

interface ProcessClip {
  number: string;
  title: string;
  description: string;
  videoSrc: string;
  poster: string;
  duration: string;
  tags: string[];
}

const CLIPS: ProcessClip[] = [
  {
    number: "01",
    title: "Spray Application on Site",
    description:
      "A look at how we set up and spray-apply cementitious fireproofing to structural steel on a live commercial level — from masking of adjoining elements through to even coverage at the specified thickness.",
    videoSrc: "/videos/video-1.mp4",
    poster: "/images/hero-cafco-beams.jpg",
    duration: "0:22",
    tags: ["Spray pumps", "Masking", "Thickness checks"],
  },
  {
    number: "02",
    title: "Workmanship & QA Checks",
    description:
      "Site walkthrough of freshly applied fireproofing, with thickness testing and photographic QA records captured as work progresses — so handover documentation matches the delivered application.",
    videoSrc: "/videos/video-2.mp4",
    poster: "/images/cafco-beam-closeup.jpg",
    duration: "0:27",
    tags: ["QA records", "Thickness testing", "Handover"],
  },
];

export function ProcessSection() {
  return (
    <SectionShell number="05" label="Process">
      <div className="container">
        <Reveal className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            On-site process
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            See the Work in Action
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Two short clips from active commercial construction sites — showing
            the basic day-to-day workings of our passive fire protection crew.
            The same setup, masking and QA routine carries through every project
            we deliver across Sydney and NSW.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {CLIPS.map((clip) => (
            <Reveal key={clip.number} className="group">
              <figure className="flex h-full flex-col border border-foreground/20 bg-card shadow-hard-sm">
                <div className="relative aspect-[4/5] max-h-[560px] w-full overflow-hidden bg-foreground">
                  <video
                    src={clip.videoSrc}
                    poster={clip.poster}
                    controls
                    preload="metadata"
                    playsInline
                    muted
                    loop
                    className="absolute inset-0 h-full w-full object-cover"
                  >
                    <track kind="captions" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Duration badge */}
                  <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 bg-foreground/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-background backdrop-blur">
                    <PlayIcon className="h-3 w-3 text-accent" strokeWidth={2.5} />
                    {clip.duration}
                  </span>

                  {/* Number badge */}
                  <span className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 bg-background/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-foreground backdrop-blur">
                    <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
                    Clip {clip.number}
                  </span>
                </div>

                <figcaption className="flex flex-1 flex-col gap-4 p-6">
                  <div>
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-accent">
                      {clip.number} / Process
                    </span>
                    <h3 className="mt-2 font-display text-2xl font-bold leading-snug tracking-tight">
                      {clip.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {clip.description}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-2 border-t border-foreground/15 pt-4">
                    {clip.tags.map((tag) => (
                      <li
                        key={tag}
                        className="inline-flex items-center gap-1.5 border border-foreground/25 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-foreground/70"
                      >
                        <span
                          className="h-1 w-1 bg-accent"
                          aria-hidden="true"
                        />
                        {tag}
                      </li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex items-center gap-4 border-l-4 border-accent pl-6">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Want to see the same level of detail on a live project? Reach out
            and we&apos;ll send through site-safe imagery, system specifications
            and recent QA samples from comparable commercial environments.
          </p>
        </Reveal>
      </div>
    </SectionShell>
  );
}
