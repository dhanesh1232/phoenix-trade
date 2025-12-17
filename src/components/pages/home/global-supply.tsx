import Image from "next/image";

export const GlobalSupplySection = () => {
  return (
    <section className="py-28 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 grid gap-16 md:grid-cols-2 items-center">
        {/* Text Content */}
        <div>
          <p className="mb-3 text-sm tracking-widest uppercase text-emerald-600">
            Global Supply
          </p>

          <h2 className="mb-6 text-3xl md:text-4xl font-semibold text-black font-['Playfair_Display']">
            Built for International Markets
          </h2>

          <p className="text-base md:text-lg leading-relaxed text-gray-700">
            Phoenix International Trading supports global buyers with a
            structured export process designed to meet international quality,
            safety, and compliance standards. From sourcing and packaging to
            documentation and dispatch, every shipment is handled with precision
            and accountability.
          </p>

          {/* Compliance */}
          <div className="mt-8 grid grid-cols-2 gap-y-3 text-sm text-gray-700">
            <span>• EU Trade Standards</span>
            <span>• USFDA Compliance</span>
            <span>• GCC Regulations</span>
            <span>• Asian & African Markets</span>
          </div>
        </div>

        {/* World Map Visual */}
        <div className="relative h-96">
          <Image
            src="/images/world-map.avif"
            alt="Global Export Capability"
            fill
            className="object-contain opacity-90"
          />
        </div>
      </div>
    </section>
  );
};
