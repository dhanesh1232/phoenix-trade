"use client";

import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/handler";
import { MoveRight } from "lucide-react";
import { BananaFiberShowcase } from "../home/banana-fabric";

type Category = {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  image?: {
    url: string;
    name?: string;
  };
};

export default function ProductsMainPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Page Header */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mb-3 text-xs md:text-sm tracking-[0.25em] uppercase text-emerald-600">
            Product Range
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold font-['Playfair_Display']">
            Our Products
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Trusted agricultural and marine produce for global buyers, curated
            by category for easier discovery.
          </p>
        </div>
      </section>
      <CategoryShow />

      <BananaFiberShowcase />
    </main>
  );
}

/* Categories */
export function CategoryShow() {
  const { categories } = useApp() as { categories?: Category[] };
  const hasCategories = Array.isArray(categories) && categories.length > 0;
  return (
    <section className="pb-16 pt-10">
      <div className="mx-auto max-w-7xl px-4">
        {!hasCategories && (
          <div className="py-16 text-center text-gray-500 text-sm">
            Categories will appear here once they are published.
          </div>
        )}

        {hasCategories && (
          <div className="grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories!.map((item) => {
              const href = `/products/${item.slug}`;
              const imgSrc =
                item.image?.url || "/images/placeholder-category.jpg";
              const imgAlt = item.image?.name || `${item.name} category image`;

              return (
                <Link
                  key={item._id}
                  href={href}
                  className="group flex flex-col overflow-hidden bg-white border border-gray-100 duration-300"
                >
                  <div className="relative h-56 overflow-hidden border-b border-border/50 bg-gray-100">
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="flex-1 p-6 md:p-7 flex flex-col">
                    <h3 className="text-lg md:text-xl font-medium text-black">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-sm text-emerald-700">
                      <span className="flex items-center gap-1">
                        View products
                        <MoveRight className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <span className="h-0.5 w-10 bg-emerald-500 group-hover:w-16 transition-all duration-500" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
