export const IntroSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* Section Label (Optional but premium) */}
        <p className="mb-4 text-sm tracking-widest uppercase text-emerald-600">
          About Phoenix
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-black font-['Playfair_Display']">
          Trusted Produce for Every Market
        </h2>

        {/* Divider */}
        <div className="mx-auto my-6 h-0.5 w-16 bg-emerald-500" />

        {/* Description */}
        <p className="mx-auto mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-gray-700">
          Phoenix International Trading is a globally focused export company
          delivering premium-grade agricultural produce, marine products, and
          value-added food commodities. We work directly with verified farms and
          coastal suppliers across India to ensure freshness, consistency, and
          reliability in every shipment.
        </p>
      </div>
    </section>
  );
};
