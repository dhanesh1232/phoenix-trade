import Image from "next/image";

export function BananaFiberShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        {/* Label */}
        <p className="mb-3 text-xs md:text-sm tracking-[0.2em] uppercase text-emerald-600 text-center">
          Banana Fiber Fabric
        </p>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-black font-['Playfair_Display']">
          From Banana Plant to Elegant Textile
        </h2>

        {/* Divider */}
        <div className="mx-auto my-6 h-0.5 w-16 bg-emerald-500" />

        {/* Main grid */}
        <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr,0.9fr] items-start">
          {/* Left: image + intro + quick facts */}
          <div className="space-y-3">
            {/* Image */}
            <div className="relative w-full aspect-6/3 overflow-hidden border bg-emerald-900/5">
              <Image
                src="/banana_fabric.webp" // image4_1024x1024.jpg
                alt="Banana plant and naturally woven banana fiber fabric"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/35 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2 text-[11px] text-emerald-50">
                <span className="rounded-full bg-black/40 px-3 py-1 backdrop-blur">
                  Upcycled from banana stems • Zero fruit waste
                </span>
                <span className="hidden sm:inline-flex rounded-full bg-black/30 px-3 py-1 backdrop-blur">
                  Natural sheen • Linen-like character
                </span>
              </div>
            </div>

            {/* Story */}
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Banana fiber fabric is created from the pseudostem of the banana
              plant—material that is usually discarded after harvest. By
              transforming this agricultural waste into fabric, producers add
              value at farm level while offering a distinctly natural, quietly
              luxurious textile.
            </p>

            {/* Two quick cards */}
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div className="border bg-emerald-50/60 p-4">
                <p className="text-xs font-semibold tracking-wide text-emerald-800 uppercase mb-2">
                  At a glance
                </p>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Fiber extracted from banana plant stems</li>
                  <li>Spun into yarn, then woven or knitted</li>
                  <li>Ideal for apparel, home textiles, and crafts</li>
                </ul>
              </div>

              <div className="border bg-white p-4">
                <p className="text-xs font-semibold tracking-wide text-emerald-800 uppercase mb-2">
                  How it’s made
                </p>
                <ol className="space-y-1.5 list-decimal list-inside">
                  <li>Stems are cut after fruit harvest</li>
                  <li>Fibers extracted manually or mechanically</li>
                  <li>Fibers cleaned, dried, and spun into yarn</li>
                  <li>
                    Yarn woven pure or blended with cotton / silk for softness
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Right: properties, uses, sustainability */}
          <div className="space-y-3">
            <div className="border bg-white p-5 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-black">
                Key Properties
              </h3>
              <ul className="text-sm text-gray-700 space-y-1.5">
                <li>Strong and durable, comparable to hemp or jute</li>
                <li>Breathable and comfortable in warm climates</li>
                <li>Subtle natural sheen with a softly silky surface</li>
                <li>Biodegradable and fully plant-based</li>
                <li>Good moisture absorption and quick drying</li>
              </ul>
            </div>

            <div className="border bg-white p-5 shadow-sm space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-black">
                  Refined Applications
                </h3>
                <ul className="mt-2 text-sm text-gray-700 space-y-1.5">
                  <li>
                    Heritage textiles across India, Japan, and Southeast Asia
                  </li>
                  <li>Shirts, scarves, sarees, dresses, and kidswear</li>
                  <li>Rugs, mats, curtains, and upholstery blends</li>
                  <li>Handcrafted accessories and eco-fashion collections</li>
                </ul>
              </div>

              <div className="bg-emerald-950 text-emerald-50 p-4 space-y-2">
                <h4 className="text-sm font-semibold tracking-wide uppercase">
                  Sustainability Benefits
                </h4>
                <ul className="text-xs md:text-sm space-y-1.5">
                  <li>
                    Uses agricultural waste instead of new cultivated land
                  </li>
                  <li>Lower water footprint compared to conventional cotton</li>
                  <li>Naturally biodegradable and renewable fiber source</li>
                  <li>
                    Creates additional income streams for local farming
                    communities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
