"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type EnquiryStatus = "new" | "in_review" | "closed";

const statusConfig: Record<
  EnquiryStatus,
  { label: string; color: string; description: string }
> = {
  new: {
    label: "New",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    description: "Fresh enquiry awaiting review",
  },
  in_review: {
    label: "In Review",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    description: "Currently being evaluated",
  },
  closed: {
    label: "Closed",
    color: "bg-slate-500/10 text-slate-600 border-slate-500/30",
    description: "Completed or archived",
  },
};

interface StatusPopoverProps {
  currentStatus: EnquiryStatus;
  onStatusChange: (status: EnquiryStatus) => void;
  disabled?: boolean;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

export function StatusPopover({
  currentStatus,
  onStatusChange,
  disabled = false,
  align = "end",
  side = "bottom",
}: StatusPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (status: EnquiryStatus) => {
    if (status !== currentStatus) {
      onStatusChange(status);
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "h-8 justify-between gap-2 text-xs font-medium transition-all",
            statusConfig[currentStatus].color,
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span className="truncate">{statusConfig[currentStatus].label}</span>
          <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align={align} side={side}>
        <Command>
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup heading="Pipeline Status">
              {(Object.keys(statusConfig) as EnquiryStatus[]).map((status) => (
                <CommandItem
                  key={status}
                  value={status}
                  onSelect={() => handleSelect(status)}
                  className="flex items-start gap-2 cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      currentStatus === status ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {statusConfig[status].label}
                      </p>
                      {currentStatus === status && (
                        <Badge
                          variant="secondary"
                          className="h-4 px-1 text-[10px]"
                        >
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {statusConfig[status].description}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Simple badge-only component for display purposes
export function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] tracking-wide uppercase rounded-full border px-2 py-0.5",
        statusConfig[status].color
      )}
    >
      {statusConfig[status].label}
    </Badge>
  );
}
