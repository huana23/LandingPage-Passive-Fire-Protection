import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/sites/adwarnerpfp/icons";
import {
  COMPANY,
  FOOTER_NAV,
  SERVICES,
} from "@/components/sites/adwarnerpfp/data";

/**
 * Footer — 4-column layout on desktop, single column on mobile. The top edge
 * is a 4px accent rule, matching the source.
 */
export function SiteFooter() {
  return (
    <footer className="border-t-4 border-accent bg-foreground text-background">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="font-display text-xl font-bold tracking-wide">
            A&D WARNER <span className="text-accent">PTY LTD</span>
          </span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
            Passive fire protection and spray-applied fireproofing subcontractor
            for commercial construction projects across Sydney and NSW.
          </p>
        </div>

        <nav aria-label="Services">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-background/50">
            Services
          </span>
          <ul className="mt-4 space-y-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-sm text-background/80 transition-colors hover:text-accent"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-background/50">
            Company
          </span>
          <ul className="mt-4 space-y-2">
            {FOOTER_NAV.company.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={
                    item.label === "Request a Quote"
                      ? "text-sm font-semibold text-accent transition-colors hover:text-background"
                      : "text-sm text-background/80 transition-colors hover:text-accent"
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-background/50">
            Contact
          </span>
          <ul className="mt-4 space-y-3 text-sm text-background/80">
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-2 break-all transition-colors hover:text-accent"
              >
                <MailIcon className="h-4 w-4 shrink-0" />
                {COMPANY.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                aria-label={`Call A&D Warner on ${COMPANY.phone}`}
              >
                <PhoneIcon className="h-4 w-4 shrink-0" />
                {COMPANY.phone}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 shrink-0" />
              {COMPANY.region}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="container flex flex-col gap-2 py-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between">
          <span>{COMPANY.copyright}</span>
          <span className="uppercase tracking-[0.25em]">{COMPANY.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
