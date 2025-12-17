export const WhyChooseSection = () => {
  const points = [
    {
      title: "Direct Farm & Coastal Sourcing",
      description:
        "We source directly from certified farms and trusted coastal suppliers, ensuring freshness, traceability, and consistent quality at origin.",
    },
    {
      title: "Multilayer Quality Control",
      description:
        "Every product passes through multiple quality checks, from sourcing and processing to final packaging and dispatch.",
    },
    {
      title: "Export-Grade Packaging & Compliance",
      description:
        "All shipments are handled with professional packaging and complete export documentation in line with international standards.",
    },
    {
      title: "Reliable Global Logistics",
      description:
        "We manage air and sea freight operations with precision, ensuring timely delivery and smooth coordination until final destination.",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm tracking-widest uppercase text-emerald-600">
            Why Phoenix
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-black font-['Playfair_Display']">
            Built for Global Trade
          </h2>
        </div>

        {/* Points */}
        <div className="grid gap-6 md:grid-cols-4">
          {points.map((item) => (
            <div
              key={item.title}
              className="border-l-2 border-emerald-500 ml-6 md:ml-0 pl-4"
            >
              <h3 className="text-lg font-medium text-black">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
