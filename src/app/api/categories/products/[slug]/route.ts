import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Product } from "@/models/product";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  await dbConnect();
  try {
    const { slug } = await context.params;

    const product = await Product.findOne({ slug })
      .populate("category", "name slug")
      .lean();

    const relatedProducts = await Product.find({
      category: product?.category._id,
    }).populate("category", "name slug");

    const filterRelatedProducts = await relatedProducts.filter(
      (f) =>
        f.slug !== product?.slug || f._id.toString() !== product._id.toString()
    );

    if (!product) {
      return ErrorHandles.NotFound("Product not found.");
    }
    // console.log(product);
    return SuccessHandles.Ok("Product fetched successfully.", {
      product,
      relatedProducts: filterRelatedProducts,
    });
  } catch (e: unknown) {
    const err = e as Error;
    console.error("PRODUCT_DETAIL_ERROR:", err.message);
    return ErrorHandles.InternalServer(err.message);
  }
}
