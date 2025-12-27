import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { Enquiry } from "@/models/Enquiry";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();

    const {
      name,
      email,
      product,
      quantity,
      country,
      packaging,
      timeline,
      message,
      phone,
    } = body || {};

    // Basic field validation
    if (!name || !email || !product || !country) {
      return ErrorHandles.BadRequest("Required fields are missing.");
    }

    // Optional: simple email pattern check (not perfect but enough here)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return ErrorHandles.BadRequest("Please provide a valid email address.");
    }

    const enquiry = await Enquiry.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      product: String(product).trim(),
      quantity: quantity ? String(quantity).trim() : undefined,
      country: String(country).trim(),
      packaging: packaging ? String(packaging).trim() : undefined,
      timeline: timeline ? String(timeline).trim() : undefined,
      message: message ? String(message).trim() : undefined,
      phone: phone ? String(phone).trim() : undefined,
    });

    return SuccessHandles.Created("Enquiry submitted successfully.", {
      id: enquiry._id,
    });
  } catch (er: unknown) {
    const e = er as Error;
    console.error("ENQUIRY_POST_ERROR", e.message);
    return ErrorHandles.InternalServer(
      "Unable to submit enquiry. Please try again."
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const enquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return SuccessHandles.Ok("Enquiries fetched successfully.", {
      enquiries,
    });
  } catch (er: unknown) {
    const e = er as Error;
    console.error("ENQUIRY_GET_ERROR", e.message);
    return ErrorHandles.InternalServer("Unable to fetch enquiries.");
  }
}
