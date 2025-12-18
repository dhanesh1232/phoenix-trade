import Image from "next/image";

export const WhoWeAre = () => {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 grid gap-4 md:grid-cols-2 items-center">
        {/* Image */}
        <div className="relative h-80 md:h-[420px] rounded-lg overflow-hidden shadow-sm">
          <Image
            src="/images/about-export.jpg"
            alt="Phoenix International Trading - Export Operations"
            fill
            className="object-cover"
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-sm tracking-widest uppercase text-emerald-600 mb-3">
            Who We Are
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-black font-['Playfair_Display'] leading-snug">
            Rooted in India. Reaching the World.
          </h2>

          <div className="h-0.5 w-16 bg-emerald-500 my-6"></div>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Phoenix International Trading is a global export company
            specialising in fresh agricultural produce, premium marine goods,
            and high-quality dried & value-added food products. With trusted
            sourcing networks across India and strong logistics partnerships, we
            deliver products that meet international standards of freshness,
            safety, and reliability.
          </p>

          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed">
            Every shipment reflects our commitment to consistency, care, and
            long-term relationships with buyers across Asia, the Middle East,
            Europe, and Africa.
          </p>
        </div>
      </div>
    </section>
  );
};
