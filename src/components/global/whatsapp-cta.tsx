import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import { contact, message } from "@/lib/contact";

interface WhatsAppCTAProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  variant?: "default" | "compact" | "banner";
}

export function WhatsAppCTA({
  phoneNumber = contact.phone,
  message: msg = "Hello, I'd like to inquire about your export services.",
  className,
  variant = "default",
}: WhatsAppCTAProps) {
  const whatsappUrl = message(phoneNumber, msg);

  // Compact pill button
  if (variant === "compact") {
    return (
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-medium tracking-[0.16em] uppercase rounded-none transition-all duration-200 shadow-md hover:shadow-lg hover:bg-primary/90",
          className
        )}
      >
        <FaWhatsapp className="w-4 h-4 text-green-500" />
        <span>Chat on WhatsApp</span>
        <ArrowRight className="w-4 h-4 translate-x-0 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    );
  }

  // Banner bar
  if (variant === "banner") {
    return (
      <div
        className={cn("w-full border border-border bg-accent/10", className)}
      >
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center">
                <FaWhatsapp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  Need quick assistance?
                </h3>
                <p className="text-xs text-muted-foreground">
                  Connect with the export team instantly on WhatsApp.
                </p>
              </div>
            </div>
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-xs font-semibold tracking-[0.18em] uppercase rounded-none transition-all duration-200 hover:bg-primary/90"
            >
              <span>Start chat</span>
              <ArrowRight className="w-4 h-4 translate-x-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default block
  return (
    <div
      className={cn(
        "w-full border-y border-border bg-linear-to-br from-accent/10 via-primary/10 to-accent/10",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/40 mb-5">
          <FaWhatsapp className="w-7 h-7 text-green-500" />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold font-['Playfair_Display'] text-foreground mb-3">
          Prefer instant messaging?
        </h2>

        <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
          Connect with an export specialist directly on WhatsApp for quick
          clarifications, pricing, and shipment planning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <FeaturePoint label="Instant responses" />
          <FeaturePoint label="Direct communication" />
          <FeaturePoint label="Quick quotations" />
        </div>

        <Link
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary text-primary-foreground text-sm font-semibold tracking-[0.18em] uppercase rounded-none transition-all duration-200 shadow-md hover:shadow-lg group hover:bg-primary/90"
        >
          <FaWhatsapp className="w-4 h-4 text-green-500" />
          <span>Chat on WhatsApp</span>
          <ArrowRight className="w-4 h-4 translate-x-0 transition-transform duration-200 group-hover:translate-x-1 ease-in-out transform" />
        </Link>

        <p className="mt-4 text-[11px] text-muted-foreground">
          Mon–Sat, 9:00 – 19:00 IST • Typical response within 5 minutes
        </p>
      </div>
    </div>
  );
}

function FeaturePoint({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
      <Check className="w-4 h-4 text-primary" />
      <span>{label}</span>
    </div>
  );
}
