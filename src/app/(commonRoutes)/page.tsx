import { Hero } from "@/components/home/hero";
import { CuratedForYou } from "@/components/home/curated-for-you";
import { SeamlessJourney } from "@/components/home/seamless-journey";
import { AiConcierge } from "@/components/home/ai-concierge";
import { GuestExperiences } from "@/components/home/guest-experiences";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <CuratedForYou />
      <SeamlessJourney />
      <AiConcierge />
      <GuestExperiences />
      <CtaSection />
    </div>
  );
}
