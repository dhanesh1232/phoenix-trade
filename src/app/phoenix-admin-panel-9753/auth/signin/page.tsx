"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Field, PasswordField } from "@/components/ui/field";
import { emailRegex, SECRET_ADMIN_PATH } from "@/lib/validators_client";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Form {
  email: string;
  password: string;
}
const defaultForm: Form = {
  email: "",
  password: "",
};

export default function SignInPage() {
  const router = useRouter();
  const [show, setShow] = React.useState(false);
  const [form, setForm] = React.useState<Form>(defaultForm);
  const [isLogin, setIsLogin] = React.useState(false);

  const isValid = () => {
    if (
      form.email &&
      emailRegex.test(form.email) &&
      form.password.length >= 6
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    try {
      setIsLogin(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (result?.error) {
        toast.error(result?.error);
      } else {
        toast.success("Logged in successfully");
        router.replace(`/${SECRET_ADMIN_PATH}`);
      }
    } catch (err: unknown) {
      // console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLogin(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md bg-background/70 backdrop-blur-sm border border-border rounded-xl p-8 shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-['Playfair_Display'] text-foreground text-center">
          Admin Sign In
        </h1>
        <p className="text-muted-foreground text-center mt-2 text-sm">
          Access your Phoenix dashboard
        </p>

        {/* Divider */}
        <div className="h-0.5 w-16 bg-primary mx-auto mt-4 mb-8" />

        {/* Form */}
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email */}
            <Field
              value={form.email}
              label="Email"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, email: e }));
              }}
              placeholder="admin@example.com"
              type="email"
            />

            {/* Password */}
            <PasswordField
              value={form.password}
              handleChange={(e) => {
                setForm((prev) => ({ ...prev, password: e }));
              }}
              placeholder="••••••••"
              show={show}
              setShow={() => setShow(!show)}
            />
            {/* Forgot Password */}
            {/* <div className="flex justify-end mt-2">
              <Link
                href="/phoenix-admin-panel-9753/auth/forgot"
                className="text-xs text-primary hover:opacity-80 transition underline"
              >
                Forgot password?
              </Link>
            </div> */}
          </div>

          {/* Button */}
          <Button
            variant="primary"
            size="lg"
            disabled={!isValid() || isLogin}
            type="submit"
            className="w-full flex items-center justify-center cursor-pointer mt-4"
          >
            {isLogin ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin text-primary-foreground w-4 h-4" />{" "}
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/phoenix-admin-panel-9753/auth/signup"
            className="text-primary hover:opacity-85 underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
