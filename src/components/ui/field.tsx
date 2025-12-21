import { Eye, EyeOff } from "lucide-react";
import { Input } from "./input";
import { Label } from "./label";
import { cn } from "@/lib/utils";

/* ---------- Reusable Field ---------- */

export function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <Label className="text-sm font-medium" htmlFor={label.toLowerCase()}>
        {label}
      </Label>
      <Input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border px-3 py-2 focus:ring-primary"
      />
    </div>
  );
}

interface PasswordFieldProps {
  label?: string;
  value: string;
  handleChange: (value: string) => void;
  show: boolean;
  setShow: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string; // New prop for error display
}

export function PasswordField({
  show,
  setShow,
  value,
  handleChange,
  placeholder,
  label = "Password",
  disabled,
  error,
  ...props
}: PasswordFieldProps & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={label.toLowerCase()} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative mt-1">
        <Input
          tabIndex={0}
          id={label.toLowerCase()}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={cn(
            "w-full rounded-md border px-3 py-2 pr-10 focus:ring-primary",
            error && "border-destructive focus:border-destructive",
            disabled && "opacity-60 cursor-not-allowed"
          )}
          placeholder={placeholder || "Minimum 8 characters"}
          {...props}
        />
        {value.length > 0 && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShow()}
            className={cn(
              "absolute right-3 top-2.5 text-gray-500",
              disabled
                ? "text-muted-foreground cursor-not-allowed"
                : "cursor-pointer hover:text-primary"
            )}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive mt-1 px-2">{error}</p>}
    </div>
  );
}
