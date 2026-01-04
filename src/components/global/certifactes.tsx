import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ShieldCheck, BadgeCheck, Globe2 } from "lucide-react";
import Link from "next/link";

export function Certifications() {
  return (
    <section className="py-16 border-t border-border bg-accent/20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-primary/80 uppercase mb-2">
            Trust &amp; Compliance
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Certifications &amp; Compliance
          </h2>
          <p className="text-sm md:text-base text-foreground/80 max-w-3xl mt-3">
            Phoenix International Trading is fully registered and certified by
            Indian authorities.
            <span className="font-semibold text-foreground">
              {" "}
              Documents available on request.
            </span>
          </p>
        </div>

        {/* Two-column layout: GST + EIC */}
        <div className="grid md:grid-cols-2 gap-6">
          <CertCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="GST Registration"
            description="Registered under Goods and Services Tax (GST), India."
            docLabel="GSTIN"
            docValue="37EXWPD8420C1ZA"
            highlight
            address="Pratap Nagar, Kakinada, Andhra Pradesh 533004"
            issuedDate="19/11/2025"
          />

          <CertCard
            icon={<BadgeCheck className="h-5 w-5" />}
            title="IEC Registered Exporter"
            description="Importer-Exporter Code issued by DGFT, Visakhapatnam."
            docLabel="IEC"
            docValue="EXWPD8420C"
            address="Pratap Nagar, Kakinada, East Godavari 533004"
            issuedDate="24/11/2025"
          />
        </div>

        {/* Verification note */}
        <div className="mt-12 rounded-xl border border-emerald-200/70 bg-emerald-50/80 p-6">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-primary/80 text-white">
              <Globe2 className="h-3.5 w-3.5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                Verify our credentials
              </h3>
              <p className="text-sm text-foreground/80">
                Check GSTIN at{" "}
                <Link
                  href="https://gstinsearch.gst.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-emerald-300 hover:no-underline"
                >
                  gst.gov.in
                </Link>{" "}
                or IEC at{" "}
                <Link
                  href="https://dgft.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline decoration-emerald-300 hover:no-underline"
                >
                  dgft.gov.in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type CertCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  docLabel: string;
  docValue: string;
  address: string;
  issuedDate: string;
  highlight?: boolean;
};

function CertCard({
  icon,
  title,
  description,
  docLabel,
  docValue,
  address,
  issuedDate,
  highlight,
}: CertCardProps) {
  return (
    <Card
      className={`flex h-full rounded-none gap-2 flex-col justify-between transition-all duration-150 ${
        highlight
          ? "border-emerald-500/80 bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white"
          : "border-emerald-100 bg-white text-emerald-950"
      }`}
    >
      <CardHeader className="flex flex-row items-start gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
            highlight
              ? "border-primary/80 bg-primary/80 text-primary-50"
              : "border-emerald-100 bg-emerald-50 text-emerald-800"
          }`}
        >
          {icon}
        </div>
        <div className="space-y-1">
          <CardTitle
            className={
              highlight
                ? "text-base font-semibold text-primary-foreground"
                : "text-base font-semibold text-foreground"
            }
          >
            {title}
          </CardTitle>
          <CardDescription
            className={
              highlight
                ? "text-[11px] font-medium uppercase tracking-[0.16em] text-accebt/80"
                : "text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/80"
            }
          >
            Verified certificate
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription
          className={
            highlight
              ? "text-sm text-emerald-100/90"
              : "text-sm text-muted-foreground"
          }
        >
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto flex justify-between items-end gap-2 border-t border-border/60 [.border-t]:pt-3">
        <div>
          {/* Doc number */}
          <div>
            <p
              className={`text-[11px] uppercase tracking-[0.16em] ${
                highlight ? "text-emerald-200/90" : "text-emerald-700/90"
              }`}
            >
              {docLabel}
            </p>
            <p
              className={`text-xs font-mono font-semibold ${
                highlight ? "text-emerald-50" : "text-emerald-900"
              }`}
            >
              {docValue}
            </p>
          </div>

          {/* Address & date */}
          <div className="text-xs space-y-0.5 mt-1">
            <p
              className={`font-medium ${
                highlight ? "text-emerald-100" : "text-emerald-800"
              }`}
            >
              {address}
            </p>
            <p
              className={`text-[11px] ${
                highlight ? "text-emerald-200/80" : "text-emerald-600/70"
              }`}
            >
              Issued {issuedDate}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            highlight
              ? "bg-emerald-600 text-white"
              : "bg-emerald-50 text-emerald-900 border border-emerald-100"
          }`}
        >
          Active &amp; Verified
        </span>
      </CardFooter>
    </Card>
  );
}
