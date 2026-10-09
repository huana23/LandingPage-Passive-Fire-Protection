import Link from "next/link";
import { ArrowRightIcon } from "@/components/sites/adwarnerpfp/icons";
import { Photo } from "@/components/sites/adwarnerpfp/photo";
import { SERVICE_DETAILS, SERVICES, SHOWCASE } from "@/components/sites/adwarnerpfp/data";
import { cn } from "@/lib/utils";

/**
 * Alternating image / content layout for `/services`. Each service row sits
 * inside a single shared container with the photo and the copy swapping sides
 * on every other row, so the section reads as a vertically-scrolling zig-zag.
 *
 * On mobile the photo stacks above the copy; on `lg+` it becomes a 2-col
 * grid. Images are pulled from `SHOWCASE` in round-robin order so the layout
 * stays consistent without needing a per-service asset.
 */
const SERVICE_IMAGES: string[] = SHOWCASE.map((item) => item.image);

export function ServicesList() {
  return (
    <div className="mt-12 space-y-16">
      {SERVICES.map((service, index) => {
        const detail = SERVICE_DETAILS[service.slug];
        const image = SERVICE_IMAGES[index % SERVICE_IMAGES.length];
        const reverse = index % 2 === 1;

        return (
          <article
            key={service.slug}
            id={service.slug}
            className={cn(
              "grid items-center gap-8 border-t border-foreground/15 pt-12 first:border-t-0 first:pt-0",
              "lg:grid-cols-2",
            )}
          >
            {/* Image block */}
            <div className={cn("relative", reverse && "lg:order-2")}>
              <div className="border border-foreground/20 bg-card p-3 shadow-hard-sm">
                <Photo
                  src={image}
                  alt={`${service.title} — spray-applied fireproofing in NSW`}
                  className="aspect-[3/2] w-full"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>

            {/* Content block */}
            <div className={cn(reverse && "lg:order-1")}>
              <span className="font-display text-sm font-bold tracking-widest text-accent">
                {service.number}
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                {service.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {detail.intro}
              </p>
              <ul className="mt-6 space-y-3 border-t border-foreground/15 pt-6">
                {detail.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-sm leading-relaxed"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${service.slug}`}
                className="mt-8 inline-flex min-h-[44px] items-center gap-2 border border-foreground px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors hover:bg-foreground hover:text-background"
              >
                Service details
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
