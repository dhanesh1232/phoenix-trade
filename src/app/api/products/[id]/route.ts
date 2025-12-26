// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Product } from "@/models/product";
import { getSessionServer } from "@/lib/auth";
import { Types } from "mongoose";
import { productApiSchema } from "@/lib/product-schema";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await context.params;
    const raw = await req.json();

    if (!raw.slug && raw.name) {
      raw.slug = raw.name.toLowerCase().trim().replace(/\s+/g, "-");
    }

    const data = productApiSchema.parse(raw);

    const existing = await Product.findById(id);
    if (!existing) {
      return ErrorHandles.NotFound("Product not found");
    }

    const slugConflict = await Product.findOne({
      slug: data.slug,
      _id: { $ne: id },
    });

    if (slugConflict) {
      return NextResponse.json(
        {
          message: "Slug already exists. Please change product name or slug.",
        },
        { status: 409 }
      );
    }

    if (!data.images.featured) {
      return NextResponse.json(
        { message: "Featured image is required" },
        { status: 400 }
      );
    }

    existing.name = data.name;
    existing.slug =
      data.slug || data.name.toLowerCase().trim().replace(/\s+/g, "-");
    existing.category = data.category
      ? new Types.ObjectId(data.category)
      : existing.category;
    existing.shortDescription = data.shortDescription;
    existing.description = data.description;
    existing.specifications = data.specifications;
    existing.availability = data.availability;
    existing.markets = data.markets;
    existing.tags = data.tags;
    existing.status = data.status;
    existing.images = data.images;
    existing.seo = data.seo;
    existing.detailPage = data.detailPage;

    await existing.save();

    return SuccessHandles.Ok("Product updated successfully", {
      product: {
        id: existing._id.toString(),
        name: existing.name,
        slug: existing.slug,
        category: existing.category,
        status: existing.status,
        updatedAt: existing.updatedAt,
      },
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid product data", errors: err.message },
        { status: 400 }
      );
    }

    console.error("PUT /api/products/[id] error:", err);
    return ErrorHandles.InternalServer("Failed to update product");
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  try {
    const { id } = await context.params;

    const doc = await Product.findById(id)
      .populate("category", "name slug")
      .lean()
      .exec();
    if (!doc) {
      return ErrorHandles.NotFound("Product not found");
    }

    const categoryName =
      typeof (doc as any).category === "object"
        ? (doc as any).category?.name
        : undefined;
    const product = {
      id: doc._id.toString(),
      name: doc.name,
      slug: doc.slug,
      category: doc.category?._id?.toString?.() || doc.category?.toString?.(),
      categoryName,
      shortDescription: doc.shortDescription,
      description: doc.description,
      specifications: doc.specifications,
      availability: doc.availability,
      markets: doc.markets,
      tags: doc.tags,
      status: doc.status,
      images: doc.images,
      seo: doc.seo,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      detailPage: doc.detailPage,
    };

    return SuccessHandles.Ok("Success", { product });
  } catch (err: unknown) {
    const e = err as Error;
    return ErrorHandles.InternalServer(e.message);
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const s = await getSessionServer();
    const { id } = await context.params;

    if (!s) {
      return ErrorHandles.Unauthorized();
    }
    if (!id) {
      return NextResponse.json(
        { message: "Product id is required" },
        { status: 400 }
      );
    }

    const existing = await Product.findById(id);

    if (!existing) {
      return ErrorHandles.NotFound("Product not found");
    }

    await existing.deleteOne();

    const docs = await Product.find();
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
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));

    return SuccessHandles.Ok("Product deleted successfully", {
      products,
      product: {
        id: existing._id.toString(),
        name: existing.name,
        slug: existing.slug,
      },
    });
  } catch (err: unknown) {
    console.error("DELETE /api/products/[id] error:", err);
    return ErrorHandles.InternalServer("Failed to delete product");
  }
}
