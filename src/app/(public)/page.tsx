import { HomeHero } from "@/components/public/home-hero";
import { HowItWorksSection } from "@/components/public/how-it-works-section";
import { HomeCta } from "@/components/public/home-cta";
import { ServiceCategoriesSection } from "@/components/public/service-categories-section";

export default function HomePage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <HomeHero />
      <ServiceCategoriesSection />
      <HowItWorksSection />
      <HomeCta />
    </div>
  );
}
