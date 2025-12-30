import AboutPage from "@/components/pages/about";
import { metadataForPath } from "@/lib/seo";

export const metadata = metadataForPath("/about-us", {
  title: "About Phoenix Trade Exports | Trusted Indian Export Company",
  description:
    "Learn about Phoenix Trade Exports, an Indian export company supplying fresh agricultural produce, marine products, and value-added goods to global markets with quality and compliance.",
  keywords: [
    "about export company",
    "Indian exporters",
    "global export company India",
    "agriculture export India",
    "marine products exporter",
    "trusted export supplier",
    "international trade India",
  ],
});

export default function Page() {
  return <AboutPage />;
}
