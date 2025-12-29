// app/api/images/bulk-delete/route.ts
import { imagekit } from "@/lib/image-kit";
import { ErrorHandles, SuccessHandles } from "@/lib/response";

export async function DELETE(req: Request) {
  try {
    const { fileIds } = await req.json();

    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      return ErrorHandles.BadRequest("fileIds array is required");
    }

    // Delete all files in parallel
    const deletePromises = fileIds.map((fileId: string) =>
      imagekit.deleteFile(fileId.trim())
    );

    const results = await Promise.allSettled(deletePromises);

    // Log any failures
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length > 0) {
      console.warn("Bulk delete failures:", failed);
    }

    return SuccessHandles.Ok(`Deleted ${fileIds.length} images successfully`);
  } catch (err: unknown) {
    const e = err as Error;
    console.error("Bulk DELETE Error:", e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}
