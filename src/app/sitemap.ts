import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/fetch";

// Cache for 1 hour
export const dynamic = "force-static";
export const revalidate = 3600; // Re-generate every hour

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phoenixexporthub.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Fetch dynamic data from DB
    const [products, categories] = await Promise.all([
      getProducts({ limit: 1000 }),
      getCategories(),
    ]);

    // Static high-priority pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/products`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/about-us`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ];

    // Dynamic category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map(
      (category: any) => ({
        url: `${SITE_URL}/products/${category.slug}`,
        lastModified: new Date(category.updatedAt || category.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.85,
      })
    );

    // Dynamic product pages (highest priority)
    const productPages: MetadataRoute.Sitemap = products.map(
      (product: any) => ({
        url: `${SITE_URL}/products/${product.category.slug}/${product.slug}`,
        lastModified: new Date(product.updatedAt || product.createdAt),
        changeFrequency: "weekly" as const,
        priority: 0.95,
      })
    );

    // Combine ALL URLs
    return [...staticPages, ...categoryPages, ...productPages].sort(
      (a, b) => (b.priority || 0) - (a.priority || 0)
    ); // Priority order
  } catch (error) {
    console.error("❌ Sitemap generation failed:", error);

    // Fallback to static pages only
    return [
      {
        url: `${SITE_URL}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 1.0,
      },
      {
        url: `${SITE_URL}/products`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
    ];
  }
}
