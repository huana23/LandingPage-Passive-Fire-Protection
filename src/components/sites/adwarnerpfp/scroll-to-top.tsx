"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/sites/adwarnerpfp/icons";
import { cn } from "@/lib/utils";

/**
 * Floating "scroll to top" button.
 *
 * - Stays fixed in the bottom-right corner across every page.
 * - Stays hidden until the user has scrolled past one viewport — keeps the
 *   viewport clean for content at the top of long pages.
 * - Fades + lifts in via a CSS transition so the appearance doesn't feel abrupt.
 * - Clicking smooth-scrolls to the top; honours the global `scroll-behavior:
 *   smooth` rule already in globals.css.
 * - Uses `prefers-reduced-motion` to skip the animation when requested.
 */
export function ScrollToTop({ threshold = 0 }: { threshold?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // `threshold` is in pixels — by default we reveal as soon as the page
      // scrolls at all, but you can pass e.g. `threshold={600}` to wait until
      // the user is well into the page.
      const y =
        window.scrollY ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      setVisible(y > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  function handleClick() {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Scroll to top"
      // Stacks above the floating Request-a-Quote / sticky header UI without
      // colliding with any dialog overlays (which use higher z-indexes).
      className={cn(
        "fixed right-5 bottom-5 z-40 inline-flex h-12 w-12 items-center justify-center",
        "bg-accent text-accent-foreground shadow-lg shadow-foreground/10",
        "border border-foreground/15 transition-all duration-300 ease-out",
        "hover:bg-foreground hover:text-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Reveal / hide state.
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUpIcon className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}
