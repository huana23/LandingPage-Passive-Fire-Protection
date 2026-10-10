import { CtaBand } from "@/components/sites/adwarnerpfp/cta-band";
import { HeroSection } from "@/components/sites/adwarnerpfp/home/hero-section";
import { WhoWeAreSection } from "@/components/sites/adwarnerpfp/home/who-we-are-section";
import { ServicesSection } from "@/components/sites/adwarnerpfp/home/services-section";
import { WhyUsSection } from "@/components/sites/adwarnerpfp/home/why-us-section";
import { ExperienceSection } from "@/components/sites/adwarnerpfp/home/experience-section";
import { ProcessSection } from "@/components/sites/adwarnerpfp/home/process-section";
import { QualitySafetySection } from "@/components/sites/adwarnerpfp/home/quality-safety-section";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: {
    default: "Passive Fire Protection NSW | Spray Fireproofing Sydney | A&D Warner",
    template: "%s | A&D Warner",
  },
  description:
    "A&D Warner delivers spray-applied fire protection & passive fireproofing across Sydney & NSW. CAFCO 300, Perlifoc HP, Fendolite & PSK systems, fire-rated duct protection, repairs and QA documentation. Request a quote.",
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <HeroSection />
      <WhoWeAreSection />
      <ServicesSection />
      <WhyUsSection />
      <ExperienceSection />
      <ProcessSection />
      <QualitySafetySection />
      <CtaBand
        image="/images/upper-level-structural-beams.jpg"
        imageAlt="Upper commercial floor plate with spray-applied fireproofing on structural beams"
        headline="Have a Project That Requires Passive Fire Protection?"
        blurb="Talk to A&D Warner about your upcoming project, fireproofing requirements or passive fire protection scope."
      />
    </main>
  );
}
