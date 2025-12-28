import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Category } from "@/models/category";
import { Product } from "@/models/product";

export async function GET(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug") || "";
    const cat = await Category.findOne({ slug });
    if (!cat) {
      return ErrorHandles.NotFound("Category not found");
    }

    const products = await Product.find({ category: cat._id }).populate(
      "category"
    );
    return SuccessHandles.Ok("Successfully fetch products", { products });
  } catch (e: unknown) {
    const err = e as Error;
    console.log(err.message);
    return ErrorHandles.InternalServer(err.message);
  }
}
