import Link from "next/link";
import { WhatsAppCTA } from "../global/whatsapp-cta";
import { organizationJsonLd } from "@/lib/seo";
import { Certifications } from "../global/certifactes";

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: organizationJsonLd(),
        }}
      />
      <div className="min-h-full bg-background text-foreground">
        {/* Page Header */}
        <section className="py-24 md:py-28 bg-muted/60 border-b border-border">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-5">
            <p className="text-[11px] tracking-[0.28em] uppercase text-primary">
              About Phoenix International
            </p>
            <h1 className="text-2xl md:text-4xl font-semibold font-['Playfair_Display'] leading-tight">
              Trusted Produce.
              <span className="block md:inline">
                {" "}
                Consistent Global Delivery.
              </span>
            </h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              A focused export partner for agricultural, marine, and value‑added
              food products, built around quality, traceability, and dependable
              service.
            </p>
          </div>
        </section>

        {/* Who We Are + Snapshot */}
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4 space-y-14">
            <div className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-start">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold font-['Playfair_Display']">
                  Who We Are
                </h2>
                <p className="text-base md:text-lg leading-relaxed text-muted-foreground pl-3 border-l-2 border-primary">
                  Phoenix International Trading is a specialist export company
                  for fresh agricultural produce, premium marine goods, and
                  high‑quality dried & value‑added food products from India.
                  Through curated sourcing networks and disciplined logistics,
                  each shipment is aligned to international expectations on
                  freshness, safety, and reliability.
                </p>
              </div>

              {/* Company Snapshot */}
              <div className="rounded-xl border border-border bg-card/70 p-5 space-y-3 text-sm text-muted-foreground">
                <p className="text-xs tracking-[0.22em] uppercase text-primary">
                  At a Glance
                </p>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium text-foreground">
                      Headquartered:
                    </span>{" "}
                    Kakinada, Andhra Pradesh, India
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Focus:</span>{" "}
                    Agriculture, Marine, Dried & Value‑Added Products
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Buyers:</span>{" "}
                    Importers, distributors, and institutional buyers worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold font-['Playfair_Display']">
                  Our Vision
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground pl-3 border-l-2 border-primary">
                  To be recognised as a preferred global partner for responsibly
                  sourced fresh and processed food products, known for
                  consistent quality and long‑term relationships.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl font-semibold font-['Playfair_Display']">
                  Our Mission
                </h2>
                <p className="text-base leading-relaxed text-muted-foreground pl-3 border-l-2 border-primary">
                  To deliver export‑grade produce that meets or exceeds
                  international standards, while supporting ethical sourcing,
                  transparent trade practices, and value for both producers and
                  buyers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications & Compliance */}
        <Certifications />

        {/* How We Operate / What Makes Us Different */}
        <section className="py-20 md:py-24 bg-muted/40 border-y border-border">
          <div className="mx-auto max-w-5xl px-4 space-y-10">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold font-['Playfair_Display']">
                How We Operate
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
                Phoenix is structured around a simple principle: source
                correctly, document precisely, and deliver reliably. Each pillar
                of the operation is designed for export buyers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 text-sm text-muted-foreground">
              <div className="space-y-2 rounded-xl border border-border bg-card/60 p-4">
                <p className="text-xs tracking-[0.22em] uppercase text-primary">
                  Sourcing
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Direct ties with certified farms & coastal hubs</li>
                  <li>Seasonal and region‑specific product planning</li>
                  <li>Traceability from origin to shipment</li>
                </ul>
              </div>
              <div className="space-y-2 rounded-xl border border-border bg-card/60 p-4">
                <p className="text-xs tracking-[0.22em] uppercase text-primary">
                  Quality & Compliance
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Layered quality checks at each stage</li>
                  <li>Export‑grade packing & handling</li>
                  <li>Documentation aligned with destination norms</li>
                </ul>
              </div>
              <div className="space-y-2 rounded-xl border border-border bg-card/60 p-4">
                <p className="text-xs tracking-[0.22em] uppercase text-primary">
                  Logistics
                </p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Coordinated sea and air freight</li>
                  <li>Schedule planning for sensitive cargo</li>
                  <li>Support through to port of loading</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold font-['Playfair_Display']">
                What Makes Us Different
              </h3>
              <ul className="space-y-2 text-base text-muted-foreground list-decimal pl-4">
                <li>Direct sourcing from certified farms and coastal hubs</li>
                <li>Structured quality checks from harvest to dispatch</li>
                <li>Export‑grade packaging and professional documentation</li>
                <li>Logistics planned for both speed and product integrity</li>
                <li>
                  Transparent, relationship‑driven approach to global trade
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values + CTA */}
        <section className="py-24 md:py-28">
          <div className="mx-auto max-w-5xl px-4 space-y-10">
            <div className="grid gap-10 md:grid-cols-[3fr,2fr] md:items-center">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold font-['Playfair_Display']">
                  The Values Behind Every Shipment
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-emerald-500 pl-4">
                  At Phoenix International Trading, global trade is grounded in
                  trust, consistency, and responsibility. Every order is treated
                  as a long‑term relationship, not a one‑time transaction.
                </p>
              </div>

              <div className="space-y-2 rounded-xl border border-border bg-card/70 p-5 text-sm text-muted-foreground">
                <p className="text-xs tracking-[0.22em] uppercase text-primary">
                  Core Principles
                </p>
                <ul className="mt-1 space-y-1 list-disc list-inside">
                  <li>Transparent communication at every stage</li>
                  <li>Ethical sourcing and fair producer partnerships</li>
                  <li>Commitment to repeat‑worthy quality and service</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center items-center flex-col sm:flex-row gap-2 pt-4">
              <WhatsAppCTA
                variant="compact"
                phoneNumber="917382675969"
                message="Hi, I'm interested in your export services and would like to discuss my requirements."
              />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium tracking-[0.18em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Discuss
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
