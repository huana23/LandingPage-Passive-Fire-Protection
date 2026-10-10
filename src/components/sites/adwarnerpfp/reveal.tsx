"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Adds the `is-visible` class once the element scrolls into view (or on first
 * paint if it's already in view). Mirrors the source's reveal animation:
 * opacity 0 -> 1 plus translateY 24px -> 0.
 *
 * The CSS that owns the transition is `globals.css` (the `.reveal` rule).
 *
 * Important for LCP: we DO NOT wrap the hero `<Photo>` in a `<Reveal>` —
 * the hero image is the LCP element on this site, and a `opacity: 0`
 * initial state would block the browser from reporting the LCP paint
 * until our IntersectionObserver fires (≈ 100ms on slow devices).
 * Anything that CAN contain the LCP element must render with `opacity: 1`
 * on first paint.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    // If the element is already in the viewport on mount, reveal it on the
    // next frame instead of waiting for a scroll event. This avoids a
    // visible "pop" for content that's above-the-fold.
    const rect = el.getBoundingClientRect();
    const alreadyVisible =
      rect.top < (window.innerHeight || 0) - 40 &&
      rect.bottom > 0;

    if (alreadyVisible) {
      // requestAnimationFrame keeps the reveal out of the synchronous paint
      // path so it doesn't compete with the LCP image.
      const apply = () => {
        if (delayMs) {
          window.setTimeout(() => el.classList.add("is-visible"), delayMs);
        } else {
          el.classList.add("is-visible");
        }
      };
      if (typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(apply);
      } else {
        apply();
      }
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs) {
              window.setTimeout(() => entry.target.classList.add("is-visible"), delayMs);
            } else {
              entry.target.classList.add("is-visible");
            }
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}