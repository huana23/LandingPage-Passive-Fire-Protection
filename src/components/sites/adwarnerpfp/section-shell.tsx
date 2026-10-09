import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps a section with a vertical label (e.g. "01 — Who we are") on the left
 * edge of the page. The label is hidden below `xl` (1280px) to mirror the
 * source.
 */
export function SectionShell({
  number,
  label,
  className,
  children,
}: {
  number: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("relative border-t border-foreground/15 py-24", className)}>
      <span
        aria-hidden="true"
        className="writing-vertical pointer-events-none absolute left-5 top-10 hidden rotate-180 text-[11px] font-semibold uppercase tracking-[0.35em] text-foreground/40 xl:block"
      >
        {number} — {label}
      </span>
      {children}
    </section>
  );
}
