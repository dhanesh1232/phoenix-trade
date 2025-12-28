"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  ProductCardCompact,
  ProductCardDetail,
} from "@/components/pages/products/ProductCard";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug?.toString();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/categories/products?slug=${slug}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.data.products || []);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-14 h-14 border-4 border-primary/20 border-t-primary rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="min-h-full bg-linear-to-br from-background via-white to-muted/20">
      {/* HEADER */}
      <div className="pt-14 pb-10 bg-muted/30 border-b border-border/50 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs tracking-[0.3em] uppercase text-primary mb-2"
        >
          {slug?.replace(/-/g, " ")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-semibold font-['Playfair_Display'] mb-2"
        >
          Export Product Collection
        </motion.h1>

        <p className="text-base text-muted-foreground max-w-3xl mx-auto">
          Premium export-grade {slug?.replace(/-/g, " ")} sourced from trusted
          origins, ready for global markets.
        </p>
      </div>

      {/* PRODUCT GRID */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4">
            <Link
              href="/products"
              className="hover:text-primary truncate transition-colors duration-200"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate font-medium max-w-xs capitalize">
              {slug?.replace(/-/g, " ")}
            </span>
          </nav>
          <div className="mb-4">
            <p className="text-xs tracking-[0.22em] uppercase text-primary">
              {products.length} Products
            </p>
            <h2 className="text-2xl font-semibold font-['Playfair_Display']">
              Export Ready Selection
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) =>
              product.detailPage ? (
                <ProductCardDetail
                  key={product._id}
                  product={product}
                  index={index}
                  href={`/products/${slug}/${product.slug}`}
                />
              ) : (
                <ProductCardCompact
                  key={product._id}
                  product={product}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border/50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-semibold font-['Playfair_Display'] mb-6"
        >
          Need Custom Specifications?
        </motion.h2>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Request tailored pricing, packaging, and logistics based on your
          destination market.
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center group gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-none text-sm font-semibold tracking-[0.25em] uppercase hover:opacity-90 transition"
        >
          Get Export Quote
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transform ease-in-out duration-150" />
        </Link>
      </section>
    </main>
  );
}
