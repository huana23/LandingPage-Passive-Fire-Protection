import { PageHeader } from "@/components/sites/adwarnerpfp/page-header";
import { ContactForm } from "@/components/sites/adwarnerpfp/contact-form";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";
import { COMPANY } from "@/components/sites/adwarnerpfp/data";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/sites/adwarnerpfp/icons";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Request a Quote | Passive Fire Protection Contractor Sydney",
  description:
    "Get a passive fire protection quote in Sydney & NSW. Send drawings, specifications, quantities and fire engineering requirements. Talk to A&D Warner today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Contact"
        title="Request a Quote"
        description="Tell us about your project, fireproofing requirements or passive fire protection scope and we will come back to you."
      />
      <SectionShell number="Contact" label="NSW">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <aside>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight">
              {COMPANY.name}
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex items-center gap-2 break-all transition-colors hover:text-accent"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent"
                  aria-label={`Call A&D Warner on ${COMPANY.phone}`}
                >
                  <PhoneIcon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                  {COMPANY.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                {COMPANY.region}
              </li>
            </ul>
            <div className="mt-10 border-l-4 border-accent bg-secondary/60 p-6">
              <p className="text-sm leading-relaxed">
                For project pricing, please send through drawings, specifications,
                quantities and any relevant fire engineering requirements where
                available.
              </p>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We work with Tier 1 and Tier 2 builders, commercial builders, fire
              protection contractors, fire engineers and construction companies
              across NSW.
            </p>
          </aside>
          <ContactForm />
        </div>
      </SectionShell>
    </main>
  );
}
