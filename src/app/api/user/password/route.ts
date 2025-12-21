// app/api/user/password/route.ts
import { NextRequest } from "next/server";
import { getSessionServer } from "@/lib/auth";
import dbConnect from "@/lib/connection";
import { ErrorHandles, SuccessHandles } from "@/lib/response";
import { hashPassword, verifyPassword } from "@/lib/validator";
import { User } from "@/models/user";

export async function PATCH(req: NextRequest) {
  await dbConnect();

  try {
    const session = await getSessionServer();
    const id = session?.user?.id;

    if (!id) {
      return ErrorHandles.Unauthorized("Unauthorized");
    }

    const { newPassword, confirmPassword, currentPassword } = await req.json();

    // Validate all fields exist
    if (!currentPassword || !newPassword || !confirmPassword) {
      return ErrorHandles.BadRequest("All password fields are required");
    }

    // Check password match
    if (newPassword !== confirmPassword) {
      return ErrorHandles.BadRequest(
        "New password and confirm password do not match"
      );
    }

    // Check new password length
    if (newPassword.length < 6) {
      return ErrorHandles.BadRequest(
        "New password must be at least 6 characters"
      );
    }

    // Find user and verify current password
    const user = await User.findById(id).select("+password"); // Include password field
    if (!user) {
      return ErrorHandles.NotFound("User not found");
    }

    const isCurrentValid = await verifyPassword(currentPassword, user.password);
    if (!isCurrentValid) {
      return ErrorHandles.BadRequest("Current password is incorrect");
    }

    // Check if new password is same as current
    if (newPassword === currentPassword) {
      return ErrorHandles.BadRequest(
        "New password cannot be the same as current password"
      );
    }

    // Hash and update password
    user.password = await hashPassword(newPassword);
    await user.save();

    // Return success response (exclude password)
    return SuccessHandles.Created("Password updated successfully");
  } catch (err: unknown) {
    const e = err as Error;
    console.error("Password update error:", e.message);
    return ErrorHandles.InternalServer("Failed to update password");
  }
}
