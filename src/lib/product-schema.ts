import z from "zod";

// POST remains as you already have:
export const productApiSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  category: z.string().min(1),
  shortDescription: z.string().max(400),
  description: z.any(),
  specifications: z
    .object({
      origin: z.string().optional(),
      processingType: z.string().optional(),
      shelfLife: z.string().optional(),
      certifications: z.array(z.string()).optional().default([]),
      applications: z.array(z.string()).optional().default([]),
    })
    .optional()
    .default(() => ({ certifications: [], applications: [] })),
  availability: z.enum(["enquiry", "in_stock", "preorder"]),
  markets: z
    .array(z.enum(["EU", "GCC", "US", "ASEAN"]))
    .optional()
    .default([]),
  tags: z.array(z.string()).optional().default([]),
  status: z.enum(["active", "draft", "inactive"]).default("active"),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    })
    .optional()
    .default({}),
  detailPage: z.boolean(),
  images: z
    .object({
      featured: z
        .object({
          id: z.string(),
          url: z.string().url(),
          fileName: z.string().optional(),
          name: z.string().optional(),
        })
        .optional(),
      gallery: z
        .array(
          z.object({
            id: z.string(),
            url: z.string().url(),
            fileName: z.string().optional(),
            name: z.string().optional(),
          })
        )
        .optional()
        .default([]),
    })
    .optional()
    .default({ gallery: [] }),
});

export const querySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["active", "draft", "inactive"]).optional(),
});
