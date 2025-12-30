import WhyChooseUsPage from "@/components/pages/why-choose-us";
import { metadataForPath } from "@/lib/seo";

export const metadata = metadataForPath("/why-choose-us", {
  title: "Why Choose Phoenix Trade Exports | Reliable Export Partner",
  description:
    "Discover why global buyers trust Phoenix Trade Exports for consistent quality, direct sourcing, export compliance, and reliable international logistics.",
  keywords: [
    "why choose export company",
    "reliable export partner",
    "trusted Indian exporter",
    "export quality assurance",
    "international logistics support",
    "export documentation India",
  ],
});

export default function Page() {
  return <WhyChooseUsPage />;
}
