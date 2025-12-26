// app/api/products/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Product } from "@/models/product";
import { productApiSchema, querySchema } from "@/lib/product-schema";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const rawQuery = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      status: searchParams.get("status") || undefined,
    };

    const { search, category, status } = querySchema.parse(rawQuery);

    const filter: Record<string, any> = {};

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { name: regex },
        { shortDescription: regex },
        { description: regex },
        { "specifications.origin": regex },
        { "specifications.processingType": regex },
      ];
    }

    if (category) {
      filter.category = category; // Mongoose will cast to ObjectId
    }

    if (status) {
      filter.status = status;
    }

    // If you want inactive also stored as "draft", you can map here if needed

    const docs = await Product.find(filter)
      .sort({ createdAt: -1 })
      .populate("category", "name")
      .lean()
      .exec();

    const products = docs.map((doc: any) => ({
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      category: doc.category?._id?.toString?.() || doc.category?.toString?.(),
      categoryName: doc.category?.name || undefined,
      shortDescription: doc.shortDescription,
      description: doc.description,
      specifications: doc.specifications,
      availability: doc.availability,
      markets: doc.markets,
      tags: doc.tags,
      status: doc.status,
      images: doc.images,
      seo: doc.seo,
      detailPage: doc.detailPage,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));

    return SuccessHandles.Ok("Successfully fetched products", { products });
  } catch (err: unknown) {
    const e = err as Error;
    console.error("GET /api/products error:", e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const raw = await req.json();

    if (!raw.slug && raw.name) {
      raw.slug = raw.name.toLowerCase().trim().replace(/\s+/g, "-");
    }

    const data = productApiSchema.parse(raw);

    if (!data.images.featured) {
      return NextResponse.json(
        { message: "Featured image is required" },
        { status: 400 }
      );
    }

    const created = await Product.create({
      name: data.name,
      slug: data.slug,
      category: data.category,
      shortDescription: data.shortDescription,
      description: data.description,
      specifications: data.specifications,
      availability: data.availability,
      markets: data.markets,
      tags: data.tags,
      status: data.status,
      images: data.images,
      seo: data.seo,
      detailPage: data.detailPage,
    });

    return NextResponse.json(
      {
        message: "Product created successfully",
        data: { product: created },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("POST /api/products error:", err);

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid product data", errors: err.message },
        { status: 400 }
      );
    }

    if (typeof err === "object" && err && (err as any).code === 11000) {
      return NextResponse.json(
        {
          message: "Slug already exists. Please change product name or slug.",
        },
        { status: 409 }
      );
    }

    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}
