// app/api/images/route.ts
import ImageKit from "imagekit";
import { ErrorHandles, SuccessHandles } from "@/lib/response";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!, // keep on server only
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder") || "phoenix";
    const search = searchParams.get("q") || "";
    // console.log(folder, search);

    const params: any = {
      path: `/${folder}`,
      limit: 50,
    };

    if (search) {
      // simple name match; you can use advanced searchQuery as well
      params.searchQuery = `name ~ "${search}"`;
    }

    const files = await imagekit.listFiles(params);

    const images = files
      .map((f: any) => {
        if (f.type !== "file") return null;

        return {
          id: f.fileId,
          url: f.url,
          thumbnail: f.thumbnail,
          name: f.name,
          fileName: f.name.split("_").shift()?.replace("-", " "),
        };
      })
      .filter(Boolean); // remove nulls

    return SuccessHandles.Ok("Images fetch successfully", { images });
  } catch (err: unknown) {
    const e = err as Error;
    console.log(e.message);
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
