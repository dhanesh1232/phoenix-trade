// app/api/categories/[id]/route.ts
import dbConnect from "@/lib/connection";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    // Find the category first to ensure it exists
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    // Delete all products linked to this category
    const deletedProducts = await Product.deleteMany({ category: id });

    // Delete the category
    await Category.findByIdAndDelete(id);

    // Get remaining categories
    const remaining = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Category deleted successfully",
        categories: remaining,
        deletedProductsCount: deletedProducts.deletedCount,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const e = error as Error;
    // console.log(e.message);
    return NextResponse.json(
      { message: e.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
