"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "ghost" | "filled";
type IconPosition = "left" | "right";

export interface StyledPhoneProps
  extends Omit<React.ComponentProps<typeof PhoneInput>, "onChange" | "value"> {
  value?: string;
  onChange?: (value: string | undefined) => void;
  size?: Size;
  variant?: Variant;
  error?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  className?: string;
  country?: string;
  helperText?: string;
}

/**
 * Inner input so we can reuse shadcn input text styles and sizes.
 */
const CustomPhoneInputField = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { size?: Size }
>(({ size = "md", className, ...inputProps }, ref) => {
  return (
    <input
      ref={ref}
      {...inputProps}
      data-slot="input"
      className={cn(
        "w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "focus-visible:outline-none focus-visible:ring-0",
        size === "sm" && "h-8 text-xs",
        size === "md" && "h-9 text-sm",
        size === "lg" && "h-10 text-base",
        className
      )}
    />
  );
});
CustomPhoneInputField.displayName = "CustomPhoneInputField";

export const StyledPhoneInput = React.forwardRef<any, StyledPhoneProps>(
  (
    {
      className,
      value,
      onChange,
      size = "md",
      variant = "default",
      error,
      success,
      icon,
      iconPosition = "left",
      country = "IN",
      helperText,
      ...props
    },
    ref
  ) => {
    const sizeClasses: Record<Size, string> = {
      sm: "h-8 text-xs",
      md: "h-9 text-sm",
      lg: "h-10 text-base",
    };

    const variantClasses: Record<Variant, string> = {
      default: "border-input bg-transparent dark:bg-input/30 hover:bg-accent/5",
      ghost: "border-transparent bg-transparent hover:bg-input/30",
      filled: "border-transparent bg-input hover:bg-input/80",
    };

    const stateClasses = (opts: { error?: boolean; success?: boolean }) =>
      opts.error
        ? "border-destructive aria-invalid:border-destructive aria-invalid:ring-destructive/20"
        : opts.success
        ? "border-emerald-500 focus-visible:border-emerald-500 focus-visible:ring-emerald-500/40"
        : "";

    const iconPadding =
      icon && iconPosition === "left"
        ? "pl-9"
        : icon && iconPosition === "right"
        ? "pr-9"
        : "";

    return (
      <div className="w-full space-y-1.5">
        <div className="relative w-full">
          {icon && iconPosition === "left" && (
            <div className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}

          <PhoneInput
            {...props}
            ref={ref}
            international
            defaultCountry={country}
            value={value}
            onChange={onChange}
            inputComponent={CustomPhoneInputField as any}
            className={cn(
              "PhoneInput flex w-full items-center gap-2 rounded-md border bg-transparent px-3 py-0",
              "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
              "transition-[color,box-shadow] outline-none shadow-xs",
              // 🔥 focus ring here (same as shadcn Input)
              "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background",
              "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
              sizeClasses[size as Size],
              variantClasses[variant as Variant],
              stateClasses({ error, success }),
              iconPadding,
              className
            )}
          />

          {icon && iconPosition === "right" && (
            <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
        </div>

        {helperText && (
          <p
            className={cn(
              "text-[11px]",
              error
                ? "text-destructive"
                : success
                ? "text-emerald-400"
                : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
        <style jsx>{`
          /* react-phone-number-input → shadcn-ish look */
          .PhoneInput {
            /* container classes already handled by Tailwind in className */
          }

          .PhoneInputCountry {
            @apply flex items-center gap-1.5 pr-2 border-r border-border/60;
          }

          .PhoneInputCountrySelect {
            @apply bg-transparent text-foreground text-xs border-none cursor-pointer focus:outline-none focus:ring-0;
          }

          .PhoneInputCountryIcon {
            @apply w-5 h-4 rounded-[3px] shadow-sm overflow-hidden;
          }

          .PhoneInputCountrySelectArrow {
            @apply text-muted-foreground ml-1 transition-transform;
          }
          .PhoneInput--focus {
            @apply border-ring ring-ring/50 ring-[3px] ring-offset-2 ring-offset-background;
          }
        `}</style>
      </div>
    );
  }
);

StyledPhoneInput.displayName = "StyledPhoneInput";
