"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoBlock } from "./header";
import { useApp } from "@/context/handler";
import { contact, contactDetails, message } from "@/lib/contact";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Contact", href: "/contact" },
];

const CategoryLinks = () => {
  const { categories } = useApp();
  return (
    <ul className="space-y-2.5 text-sm">
      {categories?.map((link) => {
        const href = `/products/${link.slug}`;
        return (
          <li key={link._id}>
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-300 transition-colors"
            >
              <span className="h-px w-4 bg-emerald-500/40 group-hover:w-6 transition-all duration-200" />
              <span>{link.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export const Footer = () => {
  const path = usePathname();

  if (path.startsWith("/phoenix-admin-panel-9753") || path === "/not-found") {
    return null;
  }

  return (
    <footer className="bg-[#050608] text-gray-300 border-t border-white/5">
      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-10 lg:py-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {/* Brand */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3">
            <LogoBlock />
          </div>

          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Curated agricultural, marine, and value‑added food products, crafted
            for discerning global buyers.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xs font-medium uppercase tracking-[0.28em] text-gray-400">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-300 transition-colors"
                >
                  <span className="h-px w-4 bg-emerald-500/40 group-hover:w-6 transition-all duration-200" />
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="space-y-4">
          <h4 className="text-xs font-medium uppercase tracking-[0.28em] text-gray-400">
            Product Range
          </h4>
          <CategoryLinks />
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-xs font-medium uppercase tracking-[0.28em] text-gray-400">
            Contact
          </h4>
          <ul className="space-y-3 text-sm">
            {contactDetails.map((item) => {
              const Icon = item.icon;
              const isEmail = item.label === "Email";
              const isWhatsApp = item.label === "WhatsApp";

              const content = (
                <>
                  <Icon className="h-4 w-4 text-emerald-500 shrink-0" />
                  <div className="space-y-0.5 -mt-1.5">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-gray-500">
                      {item.label}
                    </span>
                    <span className="block text-gray-300 hover:text-accent">
                      {item.value}
                    </span>
                  </div>
                </>
              );

              return (
                <li key={item.label}>
                  {isEmail ? (
                    <Link
                      href={`mailto:${item.value}`}
                      className="group inline-flex items-start gap-3 hover:text-emerald-300 transition-colors"
                    >
                      {content}
                    </Link>
                  ) : isWhatsApp ? (
                    <Link
                      href={message(item.value)}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-start gap-3 hover:text-emerald-300 transition-colors"
                    >
                      {content}
                    </Link>
                  ) : (
                    <div className="inline-flex items-start gap-3">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-5 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between text-[11px] tracking-[0.22em] text-center uppercase text-gray-500">
          <p>
            © {new Date().getFullYear()} Phoenix International Trading. All
            rights reserved.
            <span className="mx-2 opacity-40">|</span>
            <span>Developed by </span>
            <Link
              href="https://services.ecodrix.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition-colors font-bold"
            >
              ECODrIx
            </Link>
          </p>

          <div className="flex flex-wrap gap-4">
            <span>Global Sourcing. Refined Delivery.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
