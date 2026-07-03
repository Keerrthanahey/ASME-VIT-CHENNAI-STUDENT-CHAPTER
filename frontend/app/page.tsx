import { HeroSection } from "@/features/landing/hero-section";
import { StatisticsSection } from "@/features/landing/statistics-section";
import { AboutSection } from "@/features/landing/about-section";
import { WhyJoinSection } from "@/features/landing/why-join-section";
import { DomainsSection } from "@/features/landing/domains-section";
import { EventsPreviewSection } from "@/features/landing/events-preview-section";
import { TeamPreviewSection } from "@/features/landing/team-preview-section";
import { CTASection } from "@/features/landing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatisticsSection />
      <AboutSection />
      <WhyJoinSection />
      <DomainsSection />
      <EventsPreviewSection />
      <TeamPreviewSection />
      <CTASection />
    </>
  );
}
