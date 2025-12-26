import { CategoryShow } from "../products/main";

export const ProductCategoriesSection = () => {
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
        <CategoryShow />
      </div>
    </section>
  );
};
