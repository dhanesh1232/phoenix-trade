import ProductsMainPage from "@/components/pages/products/main";
import { metadataForPath } from "@/lib/seo";

export const metadata = metadataForPath("/products", {
  title: "Export Products from India | Phoenix Trade Exports",
  description:
    "Browse our export-ready product categories including fresh agricultural produce, marine products, and dried & value-added goods supplied worldwide by Phoenix Trade Exports.",
  keywords: [
    "export products India",
    "Indian export products",
    "bulk export supplier",
    "agriculture products exporter",
    "marine food exporter",
    "value added products export",
    "global export supply",
  ],
});

export default function Page() {
  return <ProductsMainPage />;
}
