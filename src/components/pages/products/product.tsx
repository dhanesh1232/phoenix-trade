"use client";
const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://phoenixtradeexports.com";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Globe,
  Package,
  Calendar,
  MapPin,
  CheckCircle,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  ProductCardCompact,
  ProductCardDetail,
} from "@/components/pages/products/ProductCard";
import { RichTextRenderer } from "@/components/pages/products/text-description-json";
import { WhatsAppCTA } from "@/components/global/whatsapp-cta";
import { FaWhatsapp } from "react-icons/fa";
import { useApp } from "@/context/handler";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";
import { Certifications } from "@/components/global/certifactes";
import { contact } from "@/lib/contact";

/* ================= PAGE ================= */

export function ProductDetailPage() {
  const { setWhatsappForm } = useApp();
  const params = useParams();
  const slug = params.slug?.toString();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/categories/products/${params.product}?category=${params.category}`
        );
        const data = await res.json();
        if (data.success) {
          setProduct(data.data.product);
          setRelatedProducts(data.data.relatedProducts);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.product, params.category]);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-full pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-semibold text-muted-foreground">
            Product not found
          </h1>
        </div>
      </div>
    );
  }

  const mainImage =
    product.images.featured?.url || product.images.gallery[0]?.url;
  const galleryImages = [
    mainImage,
    ...product.images.gallery
      .filter((f) => f.id !== product.images.featured?.id)
      .slice(0, 3)
      .map((img) => img.url),
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: productJsonLd({
            name: product.name,
            description: product.shortDescription,
            slug: product.slug,
            category: product?.category?.name,
            image: product?.images?.featured?.url || "/banana_fabric.webp",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            {
              name: "Products",
              url: `https://${SITE_URL}/products`,
            },
            {
              name: product.category.name,
              url: `https://${SITE_URL}/products/${product.category.slug}`,
            },
            {
              name: product.name,
              url: `https://${SITE_URL}/products/${product.category.slug}/${product.slug}`,
            },
          ]),
        }}
      />
      <div className="min-h-full bg-background">
        {/* ================= BREADCRUMB ================= */}
        <div className="pt-4 pb-8 border-b border-border/30 bg-linear-to-b from-muted/20 via-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-4">
              <Link
                href="/products"
                className="hover:text-primary truncate transition-colors duration-200"
              >
                Products
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href={`/products/${product.category.slug}`}
                className="hover:text-primary truncate transition-colors duration-200"
              >
                {product.category.name}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground truncate font-medium max-w-xs">
                {product.name}
              </span>
            </nav>

            <div className="flex items-center justify-between">
              <div>
                <Badge
                  variant={
                    product.availability === "in_stock"
                      ? "default"
                      : "secondary"
                  }
                  className="mb-1.5 capitalize"
                >
                  {product.availability.replace("_", " ")}
                </Badge>
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold font-['Playfair_Display'] leading-tight tracking-tight">
                  {product.name.split(/(\(.*?\))/g).map((part, idx) =>
                    part.startsWith("(") && part.endsWith(")") ? (
                      <span
                        key={idx}
                        className="text-xl md:text-2xl lg:text-4xl text-muted-foreground"
                      >
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </h1>
                <p className="text-base text-muted-foreground max-w-2xl">
                  {product.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PRODUCT STAGE ================= */}
        <div className="sm:py-4 py-2">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* LEFT SIDE - STICKY IMAGE GALLERY */}
              <div className="lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-4rem)]">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3 lg:overflow-y-auto lg:h-full lg:pr-2"
                >
                  {/* Main Image */}
                  <div className="relative aspect-4/3 rounded-md overflow-hidden border border-border bg-muted/20 group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={
                            galleryImages[selectedImage] ||
                            "/images/placeholder.jpg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-[1.02] ease-in-out transition-transform duration-700"
                          priority
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Image Badge */}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
                      Premium Quality
                    </div>
                  </div>

                  {/* Thumbnails */}
                  {galleryImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-3">
                      {galleryImages.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={cn(
                            "relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-200",
                            selectedImage === index
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <Image
                            src={img || "/images/placeholder.jpg"}
                            alt={`${product.name} view ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* RIGHT SIDE - SCROLLABLE CONTENT */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Quick Specs */}
                <div className="grid grid-cols-2 gap-4 p-6 rounded-md bg-card border border-border">
                  <SpecCard
                    icon={<MapPin className="w-5 h-5" />}
                    label="Origin"
                    value={product.specifications?.origin || "Multiple origins"}
                  />
                  <SpecCard
                    icon={<Package className="w-5 h-5" />}
                    label="Processing"
                    value={product.specifications?.processingType || "Custom"}
                  />
                  <SpecCard
                    icon={<Calendar className="w-5 h-5" />}
                    label="Shelf Life"
                    value={product.specifications?.shelfLife || "_"}
                  />
                  <SpecCard
                    icon={<Globe className="w-5 h-5" />}
                    label="Markets"
                    value={`${product.markets.length}+ countries`}
                  />
                </div>

                {/* Certifications */}
                {product.specifications?.certifications?.length ? (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      Certifications & Standards
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.specifications.certifications.map((cert) => (
                        <Badge
                          key={cert}
                          variant="secondary"
                          className="gap-2 py-2 px-4 rounded-full"
                        >
                          <CheckCircle className="w-4 h-4" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Applications */}
                {product.specifications?.applications?.length ? (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      Common Applications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.specifications.applications.map((app) => (
                        <Badge
                          key={app}
                          variant="outline"
                          className="bg-secondary/20"
                        >
                          {app}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* CTA Section */}
                <div className="p-6 rounded-md bg-linear-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Ready to Order?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Get competitive quotes and shipping details within 24
                        hours.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setWhatsappForm?.((prev: WhatsappFormData) => ({
                            ...prev,
                            name: product.name,
                            slug: product.slug,
                            category: product.category.name,
                          }));
                        }}
                        className="flex-1 h-9 w-full sm:h-10 cursor-pointer text-xs font-semibold uppercase tracking-wider group/btn border-primary/30 hover:border-primary flex items-center justify-center gap-1.5"
                      >
                        <FaWhatsapp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        WhatsApp
                      </Button>

                      <Button
                        size="sm"
                        className="flex-1 h-9 sm:h-10 text-xs font-semibold uppercase tracking-wider bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-1.5"
                        asChild
                      >
                        <Link href="/contact">
                          <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          Enquiry
                        </Link>
                      </Button>
                    </div>

                    <p className="text-xs text-center text-muted-foreground">
                      All quotes include FOB pricing, shipping estimates, and
                      documentation details.
                    </p>
                  </div>
                </div>

                {/* ================= DETAILED CONTENT TABS ================= */}
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="space-y-8"
                >
                  <TabsList className="bg-background border border-border p-1 rounded-md w-full max-w-md">
                    {[
                      { id: "overview", label: "Overview" },
                      { id: "specifications", label: "Specifications" },
                      { id: "markets", label: "Global Markets" },
                    ].map((t) => (
                      <TabsTrigger
                        value={t.id}
                        key={t.id}
                        className="rounded-md hover:bg-primary/20 cursor-pointer data-[state=active]:text-primary-foreground data-[state=active]:bg-primary"
                      >
                        {t.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="prose prose-lg max-w-none">
                      <RichTextRenderer content={product.description} />
                    </div>

                    {/* Additional Gallery */}
                    {product.images.gallery?.length > 0 && (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 pt-4">
                        {product.images.gallery.map((img, index) => (
                          <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative aspect-4/3 rounded-2xl overflow-hidden border border-border group"
                          >
                            <Image
                              src={img.url}
                              alt={img.name || product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="specifications">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">
                          Technical Specifications
                        </h3>
                        <div className="space-y-4">
                          {product.specifications?.grade && (
                            <SpecRow
                              label="Grade"
                              value={product.specifications.grade}
                            />
                          )}
                          {product.specifications?.moistureContent && (
                            <SpecRow
                              label="Moisture Content"
                              value={product.specifications.moistureContent}
                            />
                          )}
                          {product.specifications?.packaging && (
                            <SpecRow
                              label="Packaging"
                              value={product.specifications.packaging}
                            />
                          )}
                          {product.specifications?.origin && (
                            <SpecRow
                              label="Country of Origin"
                              value={product.specifications.origin}
                            />
                          )}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">
                          Quality Assurance
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span>Third-party lab testing</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span>Batch traceability</span>
                          </li>
                          <li className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                            <span>Quality control at every stage</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="markets">
                    <div className="space-y-8">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.markets.map((market, index) => (
                          <motion.div
                            key={market}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="p-4 rounded-xl border border-border bg-card hover:bg-card/80 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="font-medium">{market}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="p-6 rounded-2xl bg-card border border-border">
                        <h4 className="text-lg font-semibold mb-3">
                          Global Distribution Network
                        </h4>
                        <p className="text-muted-foreground">
                          We supply to {product.markets.length} countries
                          worldwide with reliable logistics partners ensuring
                          timely delivery and proper handling throughout the
                          supply chain.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Certifications & Compliance */}
        <Certifications />

        {/* ================= RELATED PRODUCTS ================= */}
        <section className="py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold font-['Playfair_Display']">
                  Related Products
                </h2>
                <p className="text-muted-foreground">
                  Explore similar products
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href={`/products/${product.category.slug}`}>
                  View All
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Placeholder for related products component */}
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {relatedProducts?.map((product, index) =>
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

        {/* ================= WHATSAPP CTA ================= */}
        <WhatsAppCTA
          variant="banner"
          phoneNumber={contact.phone}
          message="Hi, I'm interested in your export services and would like to discuss my requirements."
        />
      </div>
    </>
  );
}

/* ================= COMPONENTS ================= */

function SpecCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-border/30 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="min-h-full pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Product skeleton */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Image skeleton */}
          <div className="space-y-6">
            <Skeleton className="aspect-4/3 rounded-2xl" />
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          </div>

          {/* Details skeleton */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-20 rounded-xl" />
              ))}
            </div>

            <div className="space-y-4">
              <Skeleton className="h-4 w-40" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            </div>

            <Skeleton className="h-48 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
