"use client";

import { FaWhatsapp } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useApp } from "@/context/handler";

/* ================= COMPONENTS ================= */

const AVAILABILITY_VARIANTS = {
  in_stock: "bg-emerald-500/10 text-emerald-600 border-emerald-200/50",
  preorder: "bg-amber-500/10 text-amber-600 border-amber-200/50",
  enquiry: "bg-primary/10 text-primary border-primary/20",
} as const;

export function ProductCardDetail({
  product,
  index,
  href,
}: {
  product: Product;
  index: number;
  href: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="group/card w-full"
    >
      <Card className="overflow-hidden rounded p-0 transition-all duration-500 border-border/50 hover:border-primary/50 bg-linear-to-br from-background to-muted/20 h-full flex flex-col">
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 shrink-0 overflow-hidden">
          <Link href={href} className="block h-full">
            <Image
              src={product.images.featured?.url || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-1000 group-hover/card:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
          </Link>

          <Badge
            className={cn(
              "absolute top-3 left-3 uppercase text-xs font-bold z-10",
              AVAILABILITY_VARIANTS[product.availability]
            )}
          >
            {product.availability.replace("_", " ")}
          </Badge>
        </div>

        <CardContent className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-3 sm:space-y-4">
            <Link href={href} className="block group/link">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Playfair_Display'] leading-tight group-hover/link:text-primary transition-all duration-300 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3 mt-2">
                {product.shortDescription}
              </p>
            </Link>

            <div className="flex flex-wrap gap-2 pt-2 opacity-90">
              {product.specifications?.origin && (
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  🌍 {product.specifications.origin}
                </span>
              )}
              {product.markets.length > 0 && (
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  🌐 {product.markets.length}+ Markets
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 sm:p-6 pt-0 bg-linear-to-r from-primary/5 to-secondary/5 border-t border-border/50">
          <motion.div
            className="w-full flex items-center justify-between group/footer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-xs sm:text-sm font-medium text-muted-foreground hidden md:block">
              Explore
            </span>
            <Link
              href={href}
              className="group/link flex items-center gap-2 text-primary font-semibold uppercase text-xs sm:text-sm tracking-wider"
            >
              View Details
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function ImageSlideshow({
  images,
  className = "",
  productName,
}: {
  images: ImageFormat[];
  className?: string;
  productName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = images.length;

  useEffect(() => {
    if (imageCount <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
    }, 3000);
    return () => clearInterval(interval);
  }, [imageCount]);

  if (imageCount === 0) return null;

  const allImages =
    images.length > 0 ? images : [{ url: "/images/placeholder.jpg" }];
  const currentImage = allImages[currentIndex % allImages.length];

  return (
    <div className={cn("relative shrink-0 overflow-hidden", className)}>
      <div className="h-64 sm:h-72 md:h-80 lg:h-96 w-full">
        <motion.div
          key={currentImage.url}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={currentImage.url}
            alt={`${productName} - ${
              currentImage?.fileName || "Image " + (currentIndex + 1)
            }`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent" />

        {imageCount > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
            {Array.from({ length: imageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300",
                  idx === currentIndex
                    ? "w-5 sm:w-6 bg-white scale-110 shadow-lg"
                    : "bg-white/60 hover:bg-white hover:scale-110"
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductCardCompact({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { setWhatsappForm } = useApp();
  const allImages = [product.images.featured, ...product.images.gallery].filter(
    Boolean
  ) as ImageFormat[];

  // Detect if content is short (single line)
  const isShortContent = product.shortDescription.split(" ").length <= 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      viewport={{ once: true }}
      className="group/card w-full"
    >
      <Card className="overflow-hidden rounded p-0 transition-all duration-500 border-border/30 hover:border-primary/40 flex flex-col h-full">
        {/* Auto-sliding Image Slideshow - Responsive height */}
        <ImageSlideshow images={allImages} productName={product.name} />

        {/* Availability badge */}
        <Badge
          className={cn(
            "absolute top-2 left-2 uppercase text-xs font-bold z-30",
            AVAILABILITY_VARIANTS[product.availability]
          )}
        >
          {product.availability.replace("_", " ")}
        </Badge>

        <CardContent className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-center">
          {/* Certifications badges */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.specifications?.certifications?.slice(0, 2).map((cert) => (
              <Badge
                key={cert}
                variant="secondary"
                className="text-xs px-2 py-0.5"
              >
                {cert}
              </Badge>
            ))}
          </div>

          {/* Product info - Centered when short */}
          <div
            className={cn(
              "space-y-1.5",
              isShortContent &&
                "flex-1 flex flex-col justify-center text-center"
            )}
          >
            <h3 className="font-semibold text-base sm:text-lg md:text-xl leading-tight line-clamp-2 transition-all duration-200">
              {product.name}
            </h3>
            <p
              className={cn(
                "text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed",
                isShortContent ? "opacity-80" : ""
              )}
            >
              {product.shortDescription}
            </p>
          </div>
        </CardContent>

        {/* Smart Footer - Only shows when content is longer */}
        {!isShortContent && (
          <CardFooter className="p-3 sm:p-4 md:p-5 pt-0 bg-linear-to-r from-muted/40 to-background/60 border-t border-border/40 gap-2 px-3 sm:px-4 md:px-5">
            <Button
              onClick={() => {
                setWhatsappForm?.((prev: WhatsappFormData) => ({
                  ...prev,
                  name: product.name,
                  slug: product.slug,
                  category: product.category.name,
                }));
              }}
              size="sm"
              variant="outline"
              className="flex-1 h-9 cursor-pointer sm:h-10 text-xs font-semibold uppercase tracking-wider group/btn border-primary/30 hover:border-primary flex items-center justify-center gap-1.5"
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
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
