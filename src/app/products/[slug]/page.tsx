// app/products/[slug]/page.tsx

import { metadataForPath } from "@/lib/seo";
import { CategoryPage } from "@/components/pages/products/category";
import { toTitleCase } from "@/lib/name-control";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  // Human-readable title from slug
  const readableTitle = toTitleCase(slug);

  return metadataForPath(`/products/${slug}`, {
    title: `${readableTitle} for Export`,
    description: `Explore export-quality ${readableTitle} supplied globally by Phoenix Trade Exports. Trusted sourcing, export compliance, and international logistics support.`,
    keywords: [
      `${readableTitle} export`,
      `${readableTitle} supplier`,
      "Indian export products",
      "bulk export supplier",
      "international trade India",
      "export quality products",
    ],
  });
}

export default function Page() {
  return <CategoryPage />;
}
