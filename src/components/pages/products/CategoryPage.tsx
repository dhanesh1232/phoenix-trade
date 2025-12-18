import { ProductCard } from "./ProductCard";

export default function CategoryPage({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: {
    image: string;
    title: string;
    description: string;
  }[];
}) {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header */}
      <section className="py-28 bg-gray-50 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold font-['Playfair_Display']">
          {title}
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700">{subtitle}</p>
      </section>

      {/* Product Grid */}
      <section className="py-28">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard
              key={p.title}
              image={p.image}
              title={p.title}
              description={p.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
