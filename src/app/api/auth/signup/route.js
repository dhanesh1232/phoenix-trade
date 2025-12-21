import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { hashPassword } from "@/lib/validator";
import { User } from "@/models/user";

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.password) {
      return ErrorHandles.BadRequest("Missing required fields");
    }

    const exUser = await User.findOne({ email: body.email });

    if (exUser) {
      return ErrorHandles.BadRequest("User already exists");
    }

    const password = await hashPassword(body.password);
    body.password = password;

    const user = await User.create(body);
    return SuccessHandles.Ok("Success", user);
  } catch (err) {
    console.log(err);
    return ErrorHandles.InternalServer(err.message);
  }
}
