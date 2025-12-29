// app/api/images/route.ts

import dbConnect from "@/lib/connection";
import { imagekit } from "@/lib/image-kit";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Category } from "@/models/category";
import { Product } from "@/models/product";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder") || "phoenix";
    const search = searchParams.get("q") || "";

    const params: any = {
      path: `/${folder}`,
      limit: 50,
    };

    if (search) {
      params.searchQuery = `name ~ "${search}"`;
    }

    const files = await imagekit.listFiles(params);

    const images = await Promise.all(
      files
        .filter((f: any) => f.type === "file")
        .map(async (f: any) => {
          const fileId = f.fileId;

          // CATEGORY usage
          const categoryCount = await Category.countDocuments({
            "image.id": fileId,
          });

          // PRODUCT featured usage
          const featuredCount = await Product.countDocuments({
            "images.featured.id": fileId,
          });

          // PRODUCT gallery usage
          const galleryCount = await Product.countDocuments({
            "images.gallery.id": fileId,
          });

          const usageCount = categoryCount + featuredCount + galleryCount;

          return {
            id: fileId,
            url: f.url,
            thumbnail: f.thumbnail,
            name: f.name,
            fileName: f.name.split("_").shift()?.replace("-", " "),
            used: usageCount > 0,
            usageCount,
            usagePoints: {
              category: categoryCount,
              productFeatured: featuredCount,
              productGallery: galleryCount,
            },
          };
        })
    );

    return SuccessHandles.Ok("Images fetched", { images });
  } catch (err: unknown) {
    const e = err as Error;
    console.error(e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = formData.get("folder") || "phoenix";

    if (!file) {
      return ErrorHandles.BadRequest("File is required");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await imagekit.upload({
      file: buffer.toString("base64"),
      fileName: file.name,
      folder: `/${folder}`,
    }); // returns url, fileId, etc. [web:77][web:80]

    return SuccessHandles.Ok("Image uploaded successfully", {
      url: uploaded.url,
      thumbnailUrl: uploaded.thumbnailUrl,
      name: uploaded.name,
      fileId: uploaded.fileId,
      fileName: uploaded.name.split("_").shift()?.replace("-", " "),
    });
  } catch (err) {
    const e = err as Error;
    console.log(e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}

// DELETE single image
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileId = searchParams.get("fileId");
    // console.log(fileId);
    if (!fileId) {
      return ErrorHandles.BadRequest("fileId is required");
    }

    await imagekit.deleteFile(fileId);
    return SuccessHandles.Ok("Image deleted successfully");
  } catch (err: unknown) {
    const e = err as Error;
    console.log(e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}
