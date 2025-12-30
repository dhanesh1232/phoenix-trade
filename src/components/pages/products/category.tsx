// app/products/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import {
  ProductCardCompact,
  ProductCardDetail,
} from "@/components/pages/products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CategoryPage() {
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
    return <CategorySkeleton />;
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

      {/* CONTENT */}
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

          {products.length > 0 ? (
            <>
              <div className="mb-8">
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
            </>
          ) : (
            <NoProductsFound />
          )}
        </div>
      </section>

      {/* CTA - Only show when products exist */}
      {products.length > 0 && (
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
      )}
    </main>
  );
}

/* ================= NO PRODUCTS FOUND ================= */
function NoProductsFound() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-24 max-w-2xl mx-auto"
    >
      <div className="w-24 h-24 mx-auto mb-8 bg-muted/50 rounded-2xl flex items-center justify-center">
        <svg
          className="w-16 h-16 text-muted-foreground/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] mb-4">
        No Products Found
      </h2>

      <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
        This category is currently empty. Explore our full collection to find
        premium export-grade products.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          asChild
          variant="primary"
          size="default"
          className="px-4 md:px-8 tracking-[0.15em] uppercase font-semibold text-base h-12"
        >
          <Link href="/products">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Browse All Products
          </Link>
        </Button>
        <Link href="/contact">
          <Button
            variant="outline"
            size="default"
            className="px-4 md:px-8 tracking-[0.15em] uppercase font-semibold text-base h-12 border-2"
          >
            Request Custom Product
          </Button>
        </Link>
      </div>

      <p className="text-sm text-muted-foreground/70 mt-8">
        New products added regularly. Check back soon!
      </p>
    </motion.div>
  );
}

/* ================= SKELETON (unchanged) ================= */
function CategorySkeleton() {
  return (
    <div className="min-h-screen pt-14 pb-20 bg-linear-to-br from-background via-white to-muted/20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Header Skeleton */}
        <div className="text-center py-20 bg-muted/30 border-b border-border/50">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Breadcrumb + Stats Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-48" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden border-border/50 h-96">
              <div className="relative h-64 sm:h-72 md:h-80 shrink-0 overflow-hidden bg-muted/20">
                <Skeleton className="w-full h-full" />
                <Skeleton className="absolute top-4 left-4 h-6 w-20 rounded-full" />
              </div>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex flex-wrap gap-2 pt-2">
                  <Skeleton className="h-6 w-16 rounded-md" />
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>
              </CardContent>
              <CardContent className="p-6 pt-0 border-t border-border/50">
                <Skeleton className="h-10 w-full rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Skeleton */}
        <div className="text-center py-20 border-t border-border/50">
          <Skeleton className="h-12 w-80 mx-auto mb-6" />
          <Skeleton className="h-6 w-96 mx-auto mb-10" />
          <Skeleton className="h-12 w-48 mx-auto rounded-none" />
        </div>
      </div>
    </div>
  );
}
