"use client";

import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/handler";
import { MoveRight } from "lucide-react";
import { WhatsAppCTA } from "@/components/global/whatsapp-cta";

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
    <main className="min-h-full bg-background text-foreground">
      {/* Page Header */}
      <section className="py-20 md:py-24 bg-muted/60 border-b border-border">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="mb-1.5 text-[11px] md:text-xs tracking-[0.25em] uppercase text-primary">
            Product Range
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold font-['Playfair_Display'] leading-tight">
            Our Products
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Trusted agricultural and marine produce for global buyers, curated
            by category for clear and efficient sourcing decisions.
          </p>
        </div>
      </section>

      <CategoryShow />

      <WhatsAppCTA
        variant="default"
        phoneNumber="917382675969"
        message="Hi, I'm interested in your export services and would like to discuss my requirements."
      />
    </main>
  );
}

/* Categories */
export function CategoryShow() {
  const { categories } = useApp() as { categories?: Category[] };
  const hasCategories = Array.isArray(categories) && categories.length > 0;

  return (
    <section className="pb-20 pt-10 md:pt-12 bg-transparent">
      <div className="mx-auto max-w-7xl px-4">
        {!hasCategories && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            Categories will appear here once they are published.
          </div>
        )}

        {hasCategories && (
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs tracking-[0.22em] uppercase text-primary/80">
                Product Categories
              </p>
              <p className="text-sm text-muted-foreground">
                Explore key export lines grouped by product type.
              </p>
            </div>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-primary hover:text-primary/80"
            >
              Request Detailed Product List
              <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {hasCategories && (
          <div className="grid gap-5 lg:gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {categories!.map((item) => {
              const href = `/products/${item.slug}`;
              const imgSrc =
                item.image?.url || "/images/placeholder-category.jpg";
              const imgAlt = item.image?.name || `${item.name} category image`;

              return (
                <Link
                  key={item._id}
                  href={href}
                  className="group flex flex-col overflow-hidden rounded-none border border-border bg-card/70 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-56 overflow-hidden border-b border-border/60 bg-muted">
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="flex-1 p-5 md:p-6 flex flex-col">
                    <h3 className="text-lg md:text-xl font-medium text-foreground">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-xs md:text-sm text-primary">
                      <span className="flex items-center gap-1">
                        View products
                        <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <span className="h-0.5 w-10 bg-primary group-hover:w-16 transition-all duration-500" />
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
