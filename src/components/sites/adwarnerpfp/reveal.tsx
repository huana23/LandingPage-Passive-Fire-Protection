"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Adds the `is-visible` class once the element scrolls into view (or on first
 * paint if it's already in view). Mirrors the source's reveal animation:
 * opacity 0 -> 1 plus translateY 24px -> 0.
 *
 * The CSS that owns the transition is `globals.css` (the `.reveal` rule).
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
