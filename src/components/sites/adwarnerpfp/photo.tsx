import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Wrapper around next/image that enforces a few opinionated defaults that
 * keep the Largest Contentful Paint (LCP) image discoverable from the HTML
 * immediately. PageSpeed Insight's "LCP request discovery" audit warns when
 * `loading=lazy` or a missing `fetchpriority=high` causes the LCP image to
 * be deferred. The defaults below match the recommendations in
 * https://web.dev/articles/priority-hints and the next/image docs:
 *
 *   - `priority` translates to `loading=eager` and adds a `<link rel=preload>`
 *     for the image (Next 14+). We also force `loading=eager` explicitly via
 *     the `loading` prop in case a future Next.js version regresses this
 *     behaviour, and we set `fetchPriority="high"` so the browser puts the
 *     request in the highest-priority queue.
 *   - When the image is NOT priority we let next/image apply its normal
 *     `loading=lazy` (the default since next 13) so off-screen images don't
 *     steal bandwidth from the LCP.
 */
export function Photo({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        // Be explicit: a priority image MUST be eagerly loaded, MUST NOT be
        // lazy, and MUST request the highest fetch priority. This is what
        // unlocks PageSpeed's "LCP request discovery" + "fetchpriority=high"
        // audits. Without these attributes the browser still treats the LCP
        // image as just-another-image and queues it behind scripts/CSS.
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className={cn("object-cover object-center", imageClassName)}
      />
    </div>
  );
}