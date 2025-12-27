"use client";

import Link from "next/link";
import { WhatsAppCTA } from "../global/whatsapp-cta";
import { EnquiryForm } from "../global/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-full bg-linear-to-br from-background via-card to-muted/30">
      {/* Hero */}
      <section className="pt-28 pb-20 bg-muted/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-2xl md:text-4xl font-semibold font-['Playfair_Display'] bg-linear-to-r from-foreground via-primary to-primary bg-clip-text text-transparent leading-tight">
            Product Enquiry
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Submit your export requirements. Receive tailored pricing and
            logistics within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 pb-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8 grid gap-8 lg:gap-14 lg:grid-cols-2 items-start">
          {/* Contact Info */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold font-['Playfair_Display'] text-foreground tracking-tight">
                Direct Contact
              </h2>
              <div className="h-px w-20 bg-linear-to-r from-primary/50 to-transparent" />
            </div>

            <div className="space-y-6">
              <div className="space-y-2 text-sm">
                <p className="text-foreground font-medium">
                  Kakinada, Andhra Pradesh
                </p>
                <p className="text-xs text-muted-foreground tracking-wide uppercase">
                  Export Headquarters, India
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <Link
                  href="mailto:info@phoenixinternationaltrading.com"
                  className="group flex items-center gap-3 p-4 bg-card hover:bg-primary/5 border border-border hover:border-primary/30 transition-all duration-200 "
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.27 7.27c.883.883 2.317.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Email Export Team
                    </p>
                    <p className="text-xs text-muted-foreground">
                      info@phoenixinternationaltrading.com
                    </p>
                  </div>
                </Link>

                <Link
                  href="https://wa.me/917382675969"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 p-4 bg-card hover:bg-primary/5 border border-border hover:border-primary/30 transition-all duration-200 "
                >
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      WhatsApp Business
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +91 7382675969
                    </p>
                  </div>
                </Link>

                <div className="p-4 bg-muted/50 border border-border ">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      Response Time
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mon–Sat 9AM–7PM IST
                  </p>
                  <p className="text-xs text-primary font-medium mt-1">
                    Replies within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          <EnquiryForm />
        </div>
      </section>
      <WhatsAppCTA
        variant="default"
        phoneNumber="917382675969"
        message="Hi, I'm interested in your export services and would like to discuss my requirements."
      />
    </main>
  );
}
