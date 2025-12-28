import { Product } from "@/models/product";
import dbConnect from "./connection";
import { Category } from "@/models/category";

export async function getProducts({
  limit = 1000,
  category = "",
}: {
  limit?: number;
  category?: string;
}) {
  await dbConnect();
  try {
    const query: any = { detailPage: true }; // Only index detail pages

    if (category) {
      query["category.slug"] = category;
    }

    const products = await Product.find(query)
      .populate("category")
      .limit(limit)
      .sort({ updatedAt: -1, createdAt: -1 });

    return products.map((product: any) => ({
      _id: product._id.toString(),
      slug: product.slug,
      category: product.category,
      name: product.name,
      updatedAt: product.updatedAt,
      createdAt: product.createdAt,
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const categories = await Category.find().sort({
      updatedAt: -1,
    });

    return categories.map((category: any) => ({
      _id: category._id.toString(),
      slug: category.slug,
      name: category.name,
      updatedAt: category.updatedAt,
      createdAt: category.createdAt,
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
