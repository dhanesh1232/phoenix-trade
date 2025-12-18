import Link from "next/link";
import Image from "next/image";

export default function ProductsMainPage() {
  const categories = [
    {
      title: "Fresh Agricultural Produce",
      description:
        "Farm-fresh vegetables and fruits sourced from certified growers.",
      image: "/images/category-fresh.jpg",
      href: "/products/fresh-agriculture-produce",
    },
    {
      title: "Marine Products",
      description:
        "High-quality shrimp and fish processed under international standards.",
      image: "/images/category-marine.avif",
      href: "/products/marine-products",
    },
    {
      title: "Dried & Value-Added Products",
      description: "Export-grade powders, nuts, and natural sweeteners.",
      image: "/images/category-dried.jpg",
      href: "/products/dried-value-added-products",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Page Header */}
      <section className="py-28 bg-gray-50 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold font-['Playfair_Display']">
          Our Products
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700">
          Trusted Produce for Every Market
        </p>
      </section>

      {/* Categories */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-4 grid gap-12 md:grid-cols-3">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8">
                <h3 className="text-xl font-medium text-black">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{item.description}</p>
                <span className="mt-4 block h-[2px] w-12 bg-emerald-500 group-hover:w-20 transition-all"></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
