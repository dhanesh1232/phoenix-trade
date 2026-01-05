import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ShieldCheck, BadgeCheck, Award, ExternalLink } from "lucide-react";

interface CertCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  idLabel: string;
  idValue: string;
  address: string;
  date: string;
  isPrimary?: boolean;
  badge?: string;
}

function CertCard({
  icon: Icon,
  title,
  subtitle,
  description,
  idLabel,
  idValue,
  address,
  date,
  isPrimary = false,
  badge,
}: CertCardProps) {
  return (
    <Card
      className={`relative border-border border flex h-full gap-4 flex-col justify-between overflow-hidden transition-all duration-300`}
      style={{
        ...(isPrimary && {
          background:
            "linear-gradient(to bottom right, var(--emerald-900), var(--emerald-800), var(--emerald-700))",
          color: "var(--white)",
        }),
        ...(isPrimary
          ? {}
          : {
              backgroundColor: "var(--white)",
              color: "var(--emerald-950)",
            }),
      }}
    >
      {badge && (
        <span
          className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
          style={{
            backgroundColor: "var(--emerald-500)",
            color: "var(--white)",
          }}
        >
          {badge}
        </span>
      )}

      <CardHeader className="flex flex-row items-start gap-2 px-2">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border"
          style={{
            ...(isPrimary
              ? {
                  backgroundColor: "rgba(5, 150, 105, 0.6)",
                  borderColor: "var(--emerald-400)",
                  color: "var(--emerald-50)",
                }
              : {
                  backgroundColor: "var(--emerald-50)",
                  borderColor: "var(--emerald-100)",
                  color: "var(--emerald-800)",
                }),
          }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <CardTitle
            className="text-base font-semibold"
            style={{ color: isPrimary ? "var(--white)" : "var(--foreground)" }}
          >
            {title}
          </CardTitle>
          <CardDescription
            className="text-[11px] font-medium uppercase tracking-[0.16em]"
            style={{
              color: isPrimary
                ? "rgba(167, 243, 208, 0.9)"
                : "rgba(4, 120, 87, 0.8)",
            }}
          >
            {subtitle}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-4">
        <CardDescription
          className="text-sm"
          style={{
            color: isPrimary
              ? "rgba(236, 253, 245, 0.9)"
              : "rgba(6, 78, 59, 0.8)",
          }}
        >
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto px-4 flex flex-col items-start border-t [.border-t]:pt-2">
        <div className="space-y-1">
          <p
            className="text-[11px] uppercase tracking-[0.16em]"
            style={{
              color: isPrimary
                ? "rgba(167, 243, 208, 0.9)"
                : "rgba(4, 120, 87, 0.9)",
            }}
          >
            {idLabel}
          </p>
          <p
            className="font-mono text-lg font-semibold"
            style={{
              color: isPrimary ? "var(--emerald-50)" : "var(--emerald-950)",
            }}
          >
            {idValue}
          </p>
        </div>
        <div className="space-y-1 text-xs">
          <p
            className="font-medium"
            style={{
              color: isPrimary
                ? "rgba(236, 253, 245, 0.85)"
                : "var(--emerald-800)",
            }}
          >
            {address}
          </p>
          <p
            className="text-[11px]"
            style={{
              color: isPrimary
                ? "rgba(167, 243, 208, 0.8)"
                : "rgba(5, 150, 105, 0.8)",
            }}
          >
            Issued {date}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

export function Certifications() {
  const certs = [
    {
      icon: ShieldCheck,
      title: "GST Registration",
      subtitle: "GST REG-06",
      description:
        "Phoenix International Trading (Proprietorship by Diddi Padmajakshi)",
      idLabel: "GSTIN",
      idValue: "37EXWPD8420C1ZA",
      address: "Pratap Nagar, Kakinada\nAndhra Pradesh 533004",
      date: "19/11/2025[file:219]",
      isPrimary: true,
      badge: "Primary",
    },
    {
      icon: BadgeCheck,
      title: "IEC Registration",
      subtitle: "DGFT Visakhapatnam",
      description: "Importer-Exporter Code for international trade compliance.",
      idLabel: "IEC",
      idValue: "EXWPD8420C[file:218]",
      address: "Pratap Nagar 64-6-1/1\nEast Godavari, AP 533004",
      date: "24/11/2025",
    },
    {
      icon: Award,
      title: "Udyam MSME Registration",
      subtitle: "Micro Enterprise",
      description:
        "Registered for government scheme benefits and priority sector lending.",
      idLabel: "Udyam Number",
      idValue: "UDYAM-AP-17-0052889[file:220]",
      address: "Golden Heights, Ramanayapeta\nKakinada, AP 533003",
      date: "13/05/2025",
    },
  ];

  return (
    <section className="py-16 bg-accent/10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p
            className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-1"
            style={{ color: "var(--emerald-700)" }}
          >
            Government Registrations
          </p>
          <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ color: "var(--emerald-950)" }}
          >
            Official Certifications & Compliance
          </h2>
          <p
            className="text-sm md:text-base mt-1"
            style={{ color: "rgba(6, 78, 59, 0.8)" }}
          >
            Phoenix International Trading is fully registered with GST, DGFT,
            and MSME authorities. All documents available for verification.
          </p>
        </div>

        {/* Reusable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          {certs.map((cert, index) => (
            <CertCard key={index} {...cert} />
          ))}
        </div>

        {/* Verification bar */}
        <div
          className="rounded-xl border p-6 px-3 shadow-sm"
          style={{
            borderColor: "rgba(167, 243, 208, 0.7)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-1">
              <div className="flex h-10 w-10 min-w-10 min-h-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <ExternalLink className="h-5 w-5" />
              </div>
              <div>
                <h3
                  className="text-sm font-semibold"
                  style={{ color: "var(--emerald-950)" }}
                >
                  Verify all registrations
                </h3>
                <p
                  className="text-xs"
                  style={{ color: "rgba(6, 78, 59, 0.8)" }}
                >
                  GST:{" "}
                  <a
                    href="https://gstinsearch.gst.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-[var(--emerald-300)] hover:underline"
                    style={{
                      color: "var(--emerald-700)",
                      textDecorationColor: "var(--emerald-300)",
                    }}
                  >
                    gst.gov.in
                  </a>{" "}
                  • IEC:{" "}
                  <a
                    href="https://dgft.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-[var(--emerald-300)] hover:underline"
                    style={{
                      color: "var(--emerald-700)",
                      textDecorationColor: "var(--emerald-300)",
                    }}
                  >
                    dgft.gov.in
                  </a>{" "}
                  • Udyam:{" "}
                  <a
                    href="https://udyamregistration.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline decoration-[var(--emerald-300)] hover:underline"
                    style={{
                      color: "var(--emerald-700)",
                      textDecorationColor: "var(--emerald-300)",
                    }}
                  >
                    udyamregistration.gov.in
                  </a>
                </p>
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{
                backgroundColor: "var(--emerald-50)",
                borderColor: "var(--emerald-200)",
                color: "var(--emerald-900)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--emerald-500)" }}
              />
              All active & verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
