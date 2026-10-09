import { CtaBand } from "@/components/sites/adwarnerpfp/cta-band";
import { HeroSection } from "@/components/sites/adwarnerpfp/home/hero-section";
import { WhoWeAreSection } from "@/components/sites/adwarnerpfp/home/who-we-are-section";
import { ServicesSection } from "@/components/sites/adwarnerpfp/home/services-section";
import { WhyUsSection } from "@/components/sites/adwarnerpfp/home/why-us-section";
import { ExperienceSection } from "@/components/sites/adwarnerpfp/home/experience-section";
import { QualitySafetySection } from "@/components/sites/adwarnerpfp/home/quality-safety-section";

export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <HeroSection />
      <WhoWeAreSection />
      <ServicesSection />
      <WhyUsSection />
      <ExperienceSection />
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
