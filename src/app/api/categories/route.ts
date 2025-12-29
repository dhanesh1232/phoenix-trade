import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Category } from "@/models/category";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { name, image, slug } = await req.json();
    const category = await Category.findOne({ slug });

    if (category) {
      return ErrorHandles.BadRequest("Category already exists");
    }

    const newCategory = await Category.create({
      name,
      image,
      slug,
    });
    return SuccessHandles.Ok("Category created successfully", newCategory);
  } catch (err: unknown) {
    const e = err as Error;
    // console.log(e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}

export async function GET() {
  await dbConnect();
  try {
    const categories = await Category.find();
    return SuccessHandles.Ok("Categories fetched successfully", { categories });
  } catch (err: unknown) {
    const e = err as Error;
    // console.log(e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { _id, name, image, slug, description } = await req.json();

    const category = await Category.findById(_id);
    if (!category) {
      return ErrorHandles.BadRequest("Category not found");
    }
    category.name = name;
    category.image = image;
    category.slug = slug;
    category.description = description;
    await category.save();

    return SuccessHandles.Ok("Category updated successfully", category);
  } catch (err: unknown) {
    const e = err as Error;
    // console.log(e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}
