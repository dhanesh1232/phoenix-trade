// app/products/[slug]/[product]/page.tsx
import { metadataForPath } from "@/lib/seo";
import { ProductDetailPage } from "@/components/pages/products/product";
import { toTitleCase } from "@/lib/name-control";

type Props = {
  params: Promise<{ slug: string; product: string }>;
};

const URL = process.env.NEXT_PUBLIC_BASE_URL || "https://phoenixexporthub.com";

export async function generateMetadata({ params }: Props) {
  const { slug: categorySlug, product: productSlug } = await params;

  const url = `${URL}/api/categories/products/${productSlug}?category=${categorySlug}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();

  const categoryName = toTitleCase(categorySlug);
  const productName = toTitleCase(productSlug);

  if (!res.ok && !data.data) {
    return metadataForPath(`/products/${categorySlug}/${productSlug}`, {
      title: `${productName} | ${categoryName} Export`,
      description: `Discover export-quality ${productName} from Phoenix Trade Exports. Trusted sourcing, bulk supply, international compliance, and global shipping.`,
      keywords: [
        `${productName} export`,
        `${productName} supplier`,
        `${categoryName} exporter`,
        "Indian export company",
        "bulk export products",
        "international trade India",
        "export quality products",
      ],
    });
  }
  const product = data.data.product;
  return metadataForPath(`/products/${categorySlug}/${productSlug}`, {
    title: `${productName} | ${categoryName} Export`,
    description: `${product.seo.metaDescription} Discover export-quality ${productName} from Phoenix Trade Exports. Trusted sourcing, bulk supply, international compliance, and global shipping.`,
    keywords: [
      ...product.tags,
      `${productName} export`,
      `${productName} supplier`,
      `${categoryName} exporter`,
      "Indian export company",
      "bulk export products",
      "international trade India",
      "export quality products",
    ],
    canonical: `${URL}/products/${categorySlug}/${productSlug}`,
  });
}

export default async function Page() {
  return <ProductDetailPage />;
}
