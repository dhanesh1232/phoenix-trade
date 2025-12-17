import Link from "next/link";

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

        {/* Action */}
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-block bg-emerald-500 px-10 py-4 text-sm font-medium text-black transition hover:bg-emerald-400"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};
