import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/adwarnerpfp/icons";
import { Photo } from "@/components/sites/adwarnerpfp/photo";

export function CtaBand({
  image,
  imageAlt,
  headline,
  blurb,
  ctaLabel = "Request a Quote",
  ctaHref = "/contact",
}: {
  image: string;
  imageAlt: string;
  headline: string;
  blurb: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative border-t border-foreground/15">
      <Photo
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-foreground/85" aria-hidden="true" />
      <div className="container relative py-24 text-center text-background">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
          {headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-background/80">
          {blurb}
        </p>
        <Link
          href={ctaHref}
          className="mt-10 inline-flex min-h-[44px] items-center gap-2 bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-background hover:text-foreground"
        >
          {ctaLabel}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
