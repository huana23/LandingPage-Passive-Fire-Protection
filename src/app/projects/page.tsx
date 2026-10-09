import { PageHeader } from "@/components/sites/adwarnerpfp/page-header";
import { CtaBand } from "@/components/sites/adwarnerpfp/cta-band";
import { Reveal } from "@/components/sites/adwarnerpfp/reveal";
import { Photo } from "@/components/sites/adwarnerpfp/photo";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";
import { PROJECTS } from "@/components/sites/adwarnerpfp/data";

export const metadata = {
  title: "Recent Projects | Commercial Fireproofing Contractor NSW",
  description:
    "A selection of passive fire protection and spray-applied fireproofing works across commercial construction projects in NSW.",
};

export default function ProjectsPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Portfolio"
        title="Recent Projects"
        description="A selection of passive fire protection and spray-applied fireproofing works across commercial construction projects in NSW."
      />
      <SectionShell number="Projects" label="NSW">
        <div className="container">
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <Reveal
                key={project.title}
                className="reveal h-full"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-foreground/20 bg-card shadow-hard">
                  <div className="overflow-hidden border-b border-foreground/15 bg-background p-3">
                    <Photo
                      src={project.image}
                      alt={project.title}
                      className="aspect-[3/2] w-full"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h2 className="font-display text-2xl font-bold leading-tight tracking-tight">
                      {project.title}
                    </h2>
                    <dl className="mt-4 space-y-1 text-sm text-muted-foreground">
                      <div className="flex gap-2">
                        <dt className="font-semibold text-foreground/70">Location:</dt>
                        <dd>{project.location}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="font-semibold text-foreground/70">Scope:</dt>
                        <dd>{project.scope}</dd>
                      </div>
                      {project.system ? (
                        <div className="flex gap-2">
                          <dt className="font-semibold text-foreground/70">System:</dt>
                          <dd>{project.system}</dd>
                        </div>
                      ) : null}
                    </dl>
                    <p className="mt-4 leading-relaxed text-muted-foreground">
                      {project.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>
      <CtaBand
        image="/images/upper-level-structural-beams.jpg"
        imageAlt="Upper commercial floor plate with spray-applied fireproofing on structural beams"
        headline="Have a Project That Requires Passive Fire Protection?"
        blurb="Talk to A&D Warner about your upcoming project, fireproofing requirements or passive fire protection scope."
      />
    </main>
  );
}
