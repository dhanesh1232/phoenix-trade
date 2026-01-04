"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Loader2, X, Check } from "lucide-react";
import { PasswordField } from "@/components/ui/field";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Roles = "user" | "admin" | "sales";
interface UserProfile {
  name: string;
  email: string;
  role: Roles;
}

export default function ProfilePage() {
  // Original data from server (never changes unless refetched)
  const [originalUser, setOriginalUser] = useState<UserProfile>({
    name: "",
    email: "",
    role: "user",
  });
  // Editable working copy
  const [user, setUser] = useState<UserProfile>({
    name: "",
    email: "",
    role: "user",
  });
  const [isPending, startTransition] = useTransition();
  const [isChanging, setIsChanging] = useState(false);

  // Password state
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
    errors: {
      new: "",
      current: "",
      confirm: "",
    },
  });

  // Track if user has made changes
  const hasUserChanges =
    user.name !== originalUser.name ||
    user.email !== originalUser.email ||
    user.role !== originalUser.role;

  useEffect(() => {
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/user", {
          credentials: "include",
        });
        const data = await res.json();

        const profile: UserProfile = {
          name: data.data.name,
          email: data.data.email,
          role: data.data.role,
        };

        setOriginalUser(profile); // Sync original state
        setUser(profile); // Sync editable state
      } catch (err) {
        toast.error("Failed to load profile");
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  // Discard changes - restore original values
  const handleDiscardChanges = useCallback(() => {
    setUser(originalUser);
    toast.success("Changes discarded");
  }, [originalUser]);

  // Update profile
  const handleProfileUpdate = useCallback(async () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/user`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            role: user.role,
          }),
        });

        if (res.ok) {
          setOriginalUser(user); // Update original
          toast.success("Profile updated successfully");
        } else {
          toast.error("Failed to update profile");
        }
      } catch (err) {
        toast.error("Network error");
        console.error(err);
      }
    });
  }, [user, startTransition]);

  // Update password - COMPLETE VALIDATION LOGIC
  const handlePasswordChange = useCallback(async () => {
    // Real-time validation before submit
    const currentError =
      password.current && password.new
        ? password.current === password.new
          ? "Current and new password cannot be the same"
          : ""
        : "";

    const newError = password.new
      ? password.new.length < 6
        ? "Password must be at least 6 characters"
        : ""
      : "";

    const confirmError = password.confirm
      ? password.confirm !== password.new
        ? "new and confirm passwords doesn't match"
        : ""
      : "";

    // Early validation exit
    if (
      currentError ||
      newError ||
      confirmError ||
      !password.current ||
      !password.new ||
      !password.confirm
    ) {
      toast.error(
        currentError ||
          newError ||
          confirmError ||
          "Please fill all fields correctly"
      );

      return;
    }

    try {
      setIsChanging(true);
      const form = {
        currentPassword: password.current,
        newPassword: password.new,
        confirmPassword: password.confirm,
      };

      const res = await fetch("/api/user/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Reset ALL password state
        setPassword({
          current: "",
          new: "",
          confirm: "",
          showCurrent: false,
          showNew: false,
          showConfirm: false,
          errors: { current: "", new: "", confirm: "" },
        });
        toast.success(data.message || "Password updated successfully");
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
      console.error(err);
    } finally {
      setIsChanging(false);
    }
  }, [password]);

  return (
    <div className="max-w-5xl w-full p-3 lg:p-4 space-y-2">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-['Playfair_Display'] text-foreground tracking-wide">
          Profile
        </h1>
        {hasUserChanges && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDiscardChanges}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Discard
            </Button>
          </div>
        )}
      </div>

      {/* Account Information Card */}
      <Card className="border border-border bg-background gap-2 p-4">
        <CardHeader className="px-0 flex items-center w-full justify-between flex-row">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Information
          </CardTitle>
          <Select
            value={user.role}
            onValueChange={(e: Roles) => setUser({ ...user, role: e })}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                placeholder="Enter your name"
                className="bg-background border-border"
                disabled={isPending}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="your@email.com"
                className="bg-background border-border"
                disabled={isPending}
              />
            </div>
          </div>

          <Button
            onClick={handleProfileUpdate}
            disabled={!hasUserChanges || isPending}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                {hasUserChanges ? "Save Changes" : "No Changes"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Password Change Card */}
      <Card className="border border-border bg-background gap-0 p-4">
        <CardHeader className="px-0">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          <div className="space-y-2">
            <PasswordField
              label="Current Password"
              value={password.current}
              handleChange={(e) => setPassword({ ...password, current: e })}
              show={password.showCurrent}
              setShow={() =>
                setPassword((prev) => ({
                  ...prev,
                  showCurrent: !prev.showCurrent,
                }))
              }
              placeholder="Enter current password"
              disabled={isChanging}
              error={password.errors.current}
            />
            <PasswordField
              label="New Password"
              value={password.new}
              handleChange={(e) => setPassword({ ...password, new: e })}
              show={password.showNew}
              setShow={() =>
                setPassword((prev) => ({ ...prev, showNew: !prev.showNew }))
              }
              placeholder="Enter new password"
              disabled={isChanging}
              error={password.errors.new}
            />
            <PasswordField
              label="Confirm Password"
              value={password.confirm}
              handleChange={(e) => setPassword({ ...password, confirm: e })}
              show={password.showConfirm}
              setShow={() =>
                setPassword((prev) => ({
                  ...prev,
                  showConfirm: !prev.showConfirm,
                }))
              }
              disabled={isChanging}
              placeholder="Confirm new password"
              error={password.errors.confirm}
            />
          </div>

          <Button
            onClick={handlePasswordChange}
            disabled={
              !password.current ||
              !password.new ||
              !password.confirm ||
              isChanging
            }
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isChanging ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
