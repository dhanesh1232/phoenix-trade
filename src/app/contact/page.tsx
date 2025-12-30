import ContactPage from "@/components/pages/contact";
import { metadataForPath } from "@/lib/seo";

export const metadata = metadataForPath("/contact", {
  title: "Contact Phoenix Trade Exports | Export Enquiry & Quotes",
  description:
    "Contact Phoenix Trade Exports for bulk export enquiries, pricing, packaging specifications, and international shipping support.",
  keywords: [
    "export enquiry India",
    "contact export company",
    "bulk export enquiry",
    "international trade enquiry",
    "Indian exporter contact",
    "export quotation request",
    "international shipping support",
  ],
});

export default function Page() {
  return <ContactPage />;
}
