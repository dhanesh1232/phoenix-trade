import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Product } from "@/models/product";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await context.params;
    const { status } = await req.json();
    const prd = await Product.findByIdAndUpdate(id, { status });
    return SuccessHandles.Ok(`Successfully status changed ${status}`);
  } catch (err: unknown) {
    const er = err as Error;
    return ErrorHandles.InternalServer(er.message);
  }
}
