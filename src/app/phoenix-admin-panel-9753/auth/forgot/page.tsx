"use client";

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md bg-background/70 backdrop-blur-sm border border-border rounded-xl p-8 shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-['Playfair_Display'] text-foreground text-center">
          Reset Password
        </h1>
        <p className="text-muted-foreground text-center mt-2 text-sm">
          Enter your registered email to receive a reset link.
        </p>

        {/* Divider */}
        <div className="h-[2px] w-16 bg-primary mx-auto mt-4 mb-8" />

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-sm text-foreground">Email</label>
            <input
              type="email"
              className="
                w-full mt-2 px-4 py-3 rounded-lg
                bg-background border border-border text-foreground
                focus:outline-none focus:border-primary
                transition
              "
              placeholder="admin@example.com"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full py-3 mt-2 rounded-lg
              bg-primary text-primary-foreground
              font-semibold uppercase tracking-wide
              hover:opacity-90 transition
            "
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Sign In */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Remember your password?{" "}
          <Link
            href="/phoenix-admin-panel-9753/auth/signin"
            className="text-primary underline hover:opacity-85"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
