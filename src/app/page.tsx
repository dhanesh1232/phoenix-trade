import { CTASection } from "@/components/pages/home/cta-section";
import { GlobalSupplySection } from "@/components/pages/home/global-supply";
import { HeroBanner } from "@/components/pages/home/hero";
import { IntroSection } from "@/components/pages/home/intro";
import { ProductCategoriesSection } from "@/components/pages/home/product-category";
import { WhoWeAre } from "@/components/pages/home/who-we-are";
import { WhyChooseSection } from "@/components/pages/home/why-choose-us";

export default function Page() {
  return (
    <div className="min-h-full">
      <HeroBanner />
      <IntroSection />
      <div className="h-px bg-gray-200 max-w-7xl mx-auto" />
      <WhoWeAre />
      <ProductCategoriesSection />
      <WhyChooseSection />
      <div className="h-px bg-gray-200 max-w-7xl mx-auto" />
      <GlobalSupplySection />
      <CTASection />
    </div>
  );
}
