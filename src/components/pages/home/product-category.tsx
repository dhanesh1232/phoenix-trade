import Link from "next/link";
import Image from "next/image";

export const ProductCategoriesSection = () => {
  const categories = [
    {
      title: "Fresh Agricultural Produce",
      description:
        "Farm-fresh fruits and vegetables sourced directly from certified growers.",
      image: "/images/category-fresh.jpg",
      href: "/products/fresh",
    },
    {
      title: "Marine Products",
      description:
        "High-quality shrimp and fish processed under international standards.",
      image: "/images/category-marine.avif",
      href: "/products/marine",
    },
    {
      title: "Dried & Value-Added Products",
      description:
        "Processed powders, nuts, and natural sweeteners for global markets.",
      image: "/images/category-dried.jpg",
      href: "/products/dried",
    },
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm tracking-widest uppercase text-emerald-600">
            Our Products
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-black font-['Playfair_Display']">
            Export Categories
          </h2>
        </div>

        {/* Category Cards */}
        <div className="grid gap-4 lg:gap-8 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {/* Image */}
              <div className="relative h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-lg font-medium text-black">{item.title}</h3>

                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                <span className="mt-5 block h-0.5 w-12 bg-emerald-500 transition-all duration-300 group-hover:w-20" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
