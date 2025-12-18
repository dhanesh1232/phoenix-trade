export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Page Header */}
      <section className="py-28 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold font-['Playfair_Display']">
            Why Choose Phoenix International Trading
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700">
            Trusted Produce for Every Market
          </p>
        </div>
      </section>

      {/* Core Reasons */}
      <section className="py-28">
        <div className="mx-auto max-w-5xl px-4 space-y-20">
          <div>
            <h2 className="mb-2 text-2xl font-semibold font-['Playfair_Display']">
              Direct Farm & Coastal Sourcing
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 pl-3 border-l-3 border-primary">
              Phoenix International Trading works directly with certified farms
              and trusted coastal suppliers across India. This direct sourcing
              model ensures product freshness, traceability, and consistency
              while maintaining strong control over quality at the origin.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold font-['Playfair_Display']">
              Multilayer Quality Control
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 pl-3 border-l-3 border-primary">
              Every product undergoes structured quality checks at multiple
              stages, including sourcing, processing, packaging, and final
              dispatch. This multilayer approach ensures that only export-grade
              products reach international buyers.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold font-['Playfair_Display']">
              Export-Grade Packaging & Documentation
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 pl-3 border-l-3 border-primary">
              All shipments are handled with professional packaging solutions
              suitable for international transport. Phoenix manages complete
              export documentation, including phytosanitary certificates, health
              certificates, and certificates of analysis, in compliance with
              destination market requirements.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold font-['Playfair_Display']">
              Reliable Global Logistics
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 pl-3 border-l-3 border-primary">
              Phoenix coordinates air and sea freight operations to ensure
              timely and secure delivery. Our logistics planning focuses on
              maintaining product integrity throughout transit while meeting
              delivery timelines.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-semibold font-['Playfair_Display']">
              Ethical & Transparent Trade Practices
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 pl-3 border-l-3 border-primary">
              We believe long-term global trade is built on transparency,
              ethical sourcing, and responsible operations. Phoenix maintains
              clear communication, accurate documentation, and dependable
              service with every buyer and partner.
            </p>
          </div>
        </div>
      </section>

      {/* Global Supply Capability */}
      <section className="py-28 bg-gray-100">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-3xl font-semibold font-['Playfair_Display']">
            Global Supply Capability
          </h2>

          <p className="mb-3 text-base md:text-lg leading-relaxed text-gray-700">
            Phoenix International Trading supports global buyers with a
            structured export process designed to meet international quality,
            safety, and compliance standards. Our supply operations are aligned
            with the regulatory requirements of multiple international markets,
            ensuring smooth customs clearance and reliable delivery.
          </p>

          <p className="mb-6 text-base md:text-lg leading-relaxed text-gray-700">
            From sourcing and packaging to documentation and dispatch, every
            shipment is managed with precision and accountability to support
            long-term partnerships across borders.
          </p>

          <ul className="grid gap-2 md:grid-cols-2 list-disc text-sm text-gray-700">
            <li>EU Trade Standards</li>
            <li>USFDA Regulations</li>
            <li>GCC Market Requirements</li>
            <li>Asian & African Market Compliance</li>
          </ul>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-28">
        <div className="mx-auto max-w-4xl px-4">
          <div className="border-l-2 border-emerald-500 pl-6">
            <p className="text-base md:text-lg leading-relaxed text-gray-700">
              Phoenix International Trading is committed to building reliable,
              long-term global partnerships through consistency, quality, and
              responsible trade practices.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
