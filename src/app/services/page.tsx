import { PageHeader } from "@/components/sites/adwarnerpfp/page-header";
import { CtaBand } from "@/components/sites/adwarnerpfp/cta-band";
import { SectionShell } from "@/components/sites/adwarnerpfp/section-shell";
import { ServicesList } from "@/components/sites/adwarnerpfp/services-list";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Fireproofing Services NSW | Structural Steel & Duct Protection",
  description:
    "Spray-applied fireproofing & passive fire protection services for commercial construction across Sydney & NSW. CAFCO 300, Perlifoc HP, Fendolite, PSK. FRL-compliant. Get a quote.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main id="main" className="flex-1">
      <PageHeader
        eyebrow="Our services"
        title="Passive Fire Protection Services"
        description="Spray-applied fireproofing and passive fire protection services for commercial construction projects across Sydney and NSW — delivered by an experienced, safety-focused subcontractor."
      />
      <SectionShell number="Services" label="NSW">
        <div className="container">
          <ServicesList />
        </div>
      </SectionShell>
      <CtaBand
        image="/images/upper-level-structural-beams.jpg"
        imageAlt="Upper commercial floor plate with spray-applied fireproofing on structural beams"
        headline="Have a Project That Requires Passive Fire Protection?"
        blurb="Talk to A&D Warner about your upcoming project, fireproofing requirements or passive fire protection scope."
      />
    </main>
  );
}
