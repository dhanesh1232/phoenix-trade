"use client";

import { Button } from "@/components/ui/button";
import { Field, PasswordField } from "@/components/ui/field";
import Link from "next/link";
import * as React from "react";
import { emailRegex } from "@/lib/validators_client";
import { toast } from "sonner";

interface Form {
  name: string;
  email: string;
  password: string;
}
const defaultForm: Form = {
  name: "",
  email: "",
  password: "",
};

export default function SignUpPage() {
  const [form, setForm] = React.useState<Form>(defaultForm);
  const [isSaving, setIsSaving] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const isValid = () => {
    if (
      form.name &&
      form.email &&
      emailRegex.test(form.email) &&
      form.password.length >= 8
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    try {
      setIsSaving(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      // console.log(data);
      toast.success(data.message);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setIsSaving(false);
      setForm(defaultForm);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md bg-background/70 backdrop-blur-sm border border-border rounded-xl p-4 md:p-8 shadow-lg">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] text-foreground text-center">
          Create Admin Account
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          Register to manage Phoenix exports
        </p>

        {/* Divider */}
        <div className="h-0.5 w-16 bg-primary mx-auto mt-2 mb-4" />

        {/* Form */}
        <form className="space-y-2" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name */}
            <Field
              value={form.name}
              label="Name"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, name: e }));
              }}
              placeholder="John Doe"
            />

            {/* Email */}
            <Field
              value={form.email}
              onChange={(e) => {
                setForm((prev) => ({ ...prev, email: e }));
              }}
              label="Email"
              placeholder="admin@example.com"
              type="email"
            />

            {/* Password */}
            <PasswordField
              value={form.password}
              show={show}
              setShow={() => setShow(!show)}
              handleChange={(e) => {
                setForm((prev) => ({ ...prev, password: e }));
              }}
            />
          </div>
          {/* Button */}
          <Button
            variant="primary"
            type="submit"
            size="lg"
            disabled={!isValid() || isSaving}
            className="w-full cursor-pointer mt-4"
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-gray-500">
          Already have an account?{" "}
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
