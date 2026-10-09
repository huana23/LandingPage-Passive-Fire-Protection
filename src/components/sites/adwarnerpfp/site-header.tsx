"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "@/components/sites/adwarnerpfp/icons";
import { COMPANY, NAV_LINKS } from "@/components/sites/adwarnerpfp/data";
import { cn } from "@/lib/utils";

/**
 * Header sticks to the top of the viewport on every page. The source page
 * shows a thin underline under the active nav item in the accent colour; we
 * reproduce that here. The mobile menu is a panel that slides into view below
 * the header at <lg.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock the body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return !!pathname?.startsWith(href);
  }

  return (
    <header
      key={pathname}
      className="sticky top-0 z-50 border-b border-foreground/15 bg-background/95 backdrop-blur"
    >
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${COMPANY.name} — home`}
          className="flex items-center gap-3"
        >
          <span className="bg-foreground px-2.5 py-2 font-display text-lg font-bold leading-none tracking-tight text-background">
            A&D
          </span>
          <span className="leading-none">
            <span className="block font-display text-base font-bold tracking-wide">
              WARNER
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Passive Fire Protection
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "text-sm font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                isActive(link.href)
                  ? "text-accent underline decoration-2 underline-offset-8"
                  : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center bg-accent px-6 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Request a Quote
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center lg:hidden"
        >
          {open ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu panel — anchored below the header. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-foreground/15 bg-background lg:hidden"
      >
        <nav aria-label="Mobile" className="container flex flex-col gap-1 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={cn(
                "min-h-[44px] py-3 text-base font-semibold uppercase tracking-widest transition-colors hover:text-accent",
                isActive(link.href) ? "text-accent" : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center bg-accent px-6 text-base font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Request a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
