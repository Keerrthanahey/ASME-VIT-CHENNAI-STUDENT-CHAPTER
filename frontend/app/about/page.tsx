import { AboutSection } from "@/features/landing/about-section";
import { WhyJoinSection } from "@/features/landing/why-join-section";
import { PageHero } from "@/components/shared/section-header";

export const metadata = {
  title: "About",
  description: "Learn about ASME International, ASME India, and the ASME VIT Chennai Student Chapter.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About"
        title="About ASME VIT Chennai"
        subtitle="Empowering mechanical engineering students through innovation, industry exposure, and technical excellence."
      />
      <AboutSection />
      <WhyJoinSection />
    </>
  );
}
