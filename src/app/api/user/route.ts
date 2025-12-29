import { getSessionServer } from "@/lib/auth";
import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { User } from "@/models/user";

export async function GET() {
  await dbConnect();
  try {
    const session = await getSessionServer();
    // console.log(session);
    const user = await User.findById(session?.user?.id).select("-password"); // Assuming session.user exists and has an 'id' property
    if (!user) {
      return ErrorHandles.Unauthorized("Unauthorized");
    }
    // console.log(user);
    return SuccessHandles.Ok("Success", user);
  } catch (err: unknown) {
    const e = err as Error;
    // console.log(e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}

export async function PATCH(req: Request) {
  await dbConnect();
  try {
    const session = await getSessionServer();
    const id = session?.user?.id;
    const { name, email } = await req.json();
    if (!id) {
      return ErrorHandles.Unauthorized("Unauthorized");
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true, runValidators: true }
    );
    if (!user) {
      return ErrorHandles.NotFound("User not found");
    }
    return SuccessHandles.Ok("Success", user);
  } catch (err: unknown) {
    const e = err as Error;
    // console.log(e.message);
    return ErrorHandles.InternalServer(e.message);
  }
}
