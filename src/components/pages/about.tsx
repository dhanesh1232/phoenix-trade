export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Page Header */}
      <section className="py-28 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold font-['Playfair_Display']">
            About Phoenix International Trading
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700">
            Trusted Produce for Every Market
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-28">
        <div className="mx-auto max-w-5xl px-4 space-y-20">
          {/* Who We Are */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold font-['Playfair_Display']">
              Who We Are
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-700 pl-3 border-l-3 border-primary">
              Phoenix International Trading is a global export company
              specialising in fresh agricultural produce, premium marine goods,
              and high-quality dried & value-added food products. With trusted
              sourcing networks across India and strong logistics partnerships,
              we deliver products that meet international standards of
              freshness, safety, and reliability.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-semibold font-['Playfair_Display']">
                Our Vision
              </h2>
              <p className="text-base leading-relaxed text-gray-700 pl-3 border-l-3 border-primary">
                To become a globally trusted partner for the supply of fresh and
                processed food products through long-term relationships and
                dependable service.
              </p>
            </div>

            <div>
              <h2 className="mb-6 text-2xl font-semibold font-['Playfair_Display']">
                Our Mission
              </h2>
              <p className="text-base leading-relaxed text-gray-700 pl-3 border-l-3 border-primary">
                To deliver reliable, sustainable, and export-grade produce that
                meets international quality standards while supporting ethical
                sourcing and transparent trade practices.
              </p>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold font-['Playfair_Display']">
              What Makes Us Different
            </h2>
            <ul className="space-y-2 text-base list-decimal text-gray-700 pl-4">
              <li>Direct sourcing from certified farms and coastal hubs</li>
              <li>Structured quality checks at every stage</li>
              <li>Export-grade packaging and professional documentation</li>
              <li>Coordinated logistics for air and sea shipments</li>
            </ul>
          </div>

          {/* Closing */}
          <div className="border-l-2 border-emerald-500 pl-6">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              At Phoenix International Trading, we believe global trade is built
              on trust, consistency, and responsibility — values that guide
              every shipment we deliver.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
