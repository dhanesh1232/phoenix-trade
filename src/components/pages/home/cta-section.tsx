import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export const CTASection = () => {
  return (
    <section className="bg-black py-28">
      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white font-['Playfair_Display']">
          Partner With Phoenix International Trading
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed">
          Reliable sourcing. Consistent quality. Trusted global supply.
        </p>

        {/* Actions */}
        <div className="mt-12 flex items-center justify-center gap-6">
          {/* CONTACT BUTTON */}
          <ButtonSweep href="/contact">Contact Us</ButtonSweep>

          {/* WHATSAPP BUTTON */}
          <ButtonSweep href="https://wa.me/917382675969" target="_blank">
            <FaWhatsapp className="inline-block text-xl" />
            WhatsApp
          </ButtonSweep>
        </div>
      </div>
    </section>
  );
};

/* PREMIUM BUTTON WITH ONE-WAY SWEEP */
function ButtonSweep({
  href,
  children,
  target,
}: {
  href: string;
  children?: React.ReactNode;
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      className="
        relative overflow-hidden inline-flex items-center
        px-10 py-4 text-sm font-medium
        bg-emerald-500 text-black hover:text-primary-foreground
        group sweep-button
      "
    >
      {/* Text */}
      <span className="z-1 flex items-center gap-1.5">{children}</span>
    </Link>
  );
}
