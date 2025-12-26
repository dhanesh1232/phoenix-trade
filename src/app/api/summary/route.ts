import { getSessionServer } from "@/lib/auth";
import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Category } from "@/models/category";
import { Product } from "@/models/product";

interface CategorySummary {
  _id: string;
  name: string;
  totalProducts: number;
  activeProducts: number;
  draftProducts: number;
  inactiveProducts: number;
}

export async function GET() {
  await dbConnect();
  try {
    const s = await getSessionServer();
    if (!s) {
      return ErrorHandles.Unauthorized();
    }

    // Global counts
    const [
      totalProducts,
      totalCategories,
      activeProducts,
      draftProducts,
      inactiveProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Product.countDocuments({ status: "active" }),
      Product.countDocuments({ status: "draft" }),
      Product.countDocuments({ status: "inactive" }),
    ]);

    // Category-wise product counts using aggregation
    const categorySummary = await Product.aggregate<CategorySummary>([
      {
        $group: {
          _id: "$category",
          totalProducts: { $sum: 1 },
          activeProducts: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          draftProducts: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          inactiveProducts: {
            $sum: { $cond: [{ $eq: ["$status", "inactive"] }, 1, 0] },
          },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: "$categoryInfo._id",
          name: "$categoryInfo.name",
          totalProducts: 1,
          activeProducts: 1,
          draftProducts: 1,
          inactiveProducts: 1,
        },
      },
      {
        $sort: { totalProducts: -1 },
      },
    ]);

    // Latest 5 products with category population
    const latestProducts = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()
      .exec();

    return SuccessHandles.Ok("Successfully fetched dashboard summary", {
      global: {
        totalProducts,
        totalCategories,
        activeProducts,
        draftProducts,
        inactiveProducts,
      },
      categories: categorySummary,
      latestProducts: latestProducts.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        category: (p.category as any)?.name || "Uncategorized",
        status: p.status,
        createdAt: new Date(p.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        markets: p.markets,
        availability: p.availability,
      })),
    });
  } catch (err: unknown) {
    const e = err as Error;
    console.error("Dashboard summary error:", e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}
