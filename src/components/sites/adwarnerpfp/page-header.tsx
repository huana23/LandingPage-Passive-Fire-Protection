/**
 * Dark band at the top of every non-home page, mirroring the source's
 * `/services`, `/projects` and `/contact` header.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative border-b border-foreground/15 bg-foreground py-20 text-background md:py-28">
      <div className="container">
        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-accent">
          <span className="h-px w-10 bg-accent" aria-hidden="true" />
          {eyebrow}
        </span>
        <h1 className="mt-4 font-display text-5xl font-black uppercase leading-none tracking-tight md:text-[60px]">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-background/80">
          {description}
        </p>
      </div>
    </section>
  );
}
