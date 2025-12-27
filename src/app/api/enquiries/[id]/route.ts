import dbConnect from "@/lib/connection";
import { Enquiry } from "@/models/Enquiry";
import { ErrorHandles, SuccessHandles } from "@/lib/response";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status } = body || {};

    if (!["new", "in_review", "closed"].includes(status)) {
      return ErrorHandles.BadRequest("Invalid status value.");
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return ErrorHandles.NotFound("Enquiry not found.");
    }

    return SuccessHandles.Ok("Status updated successfully.", {
      id: enquiry._id,
    });
  } catch (er: unknown) {
    const e = er as Error;
    console.error("ENQUIRY_PATCH_ERROR", e.message);
    return ErrorHandles.InternalServer("Unable to update enquiry.");
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const { id } = await context.params;

    // Find and delete the enquiry by ID
    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return ErrorHandles.NotFound("Enquiry not found.");
    }

    return SuccessHandles.Ok("Enquiry deleted successfully.", {
      id: deletedEnquiry._id,
    });
  } catch (er: unknown) {
    const e = er as Error;
    console.error("ENQUIRY_DELETE_ERROR", e.message);
    return ErrorHandles.InternalServer("Unable to delete enquiry.");
  }
}
