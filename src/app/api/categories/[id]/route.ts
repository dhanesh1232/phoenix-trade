// app/api/categories/[id]/route.ts
import dbConnect from "@/lib/connection";
import { Category } from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await context.params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { message: "Category not found" },
        { status: 404 }
      );
    }

    const remaining = await Category.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Category deleted successfully",
        categories: remaining,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const e = error as Error;
    console.log(e.message);
    return NextResponse.json(
      { message: e.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
