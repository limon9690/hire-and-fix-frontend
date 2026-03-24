import { HomeHero } from "@/components/public/home-hero";
import { ServiceCategoriesSection } from "@/components/public/service-categories-section";

export default function HomePage() {
  return (
    <div className="space-y-12">
      <HomeHero />
      <ServiceCategoriesSection />
    </div>
  );
}
