// app/components/pages/admin/pages/products/add-product.tsx
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2,
  Save,
  FileText,
  Eye,
  Trash2,
  Pen,
  MoveLeft,
  RefreshCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageModal } from "@/components/pages/admin/layout/image-modal";
import MultiWords from "@/components/pages/admin/pages/multi-words";
import { useApp } from "@/context/handler";
import { Skeleton } from "@/components/ui/skeleton";

// ========================
// Zod schema & types
// ========================

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  shortDescription: z.string().max(200, "Max 200 characters"),
  description: z.string().min(1, "Description is required"),
  specifications: z.object({
    origin: z.string().optional(),
    processingType: z.string().optional(),
    shelfLife: z.string().optional(),
    certifications: z.array(z.string()).optional(),
    applications: z.array(z.string()).optional(),
  }),
  availability: z.enum(["enquiry", "in_stock", "preorder"]),
  markets: z.array(z.enum(["EU", "GCC", "US", "ASEAN"])).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["active", "draft", "inactive"]),
  seo: z
    .object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    })
    .optional(),
});

type Status = z.infer<typeof productSchema>["status"];
type Availability = z.infer<typeof productSchema>["availability"];
type ProductFormData = z.infer<typeof productSchema>;

// ========================
// Constants
// ========================

const MARKETS = ["EU", "GCC", "US", "ASEAN"] as const;
const CERTIFICATIONS = ["HACCP", "EU", "USFDA", "ISO"] as const;
type Market = (typeof MARKETS)[number];

// ========================
// Mapping helper
// ========================

function mapInitialToFormValues(
  initial?: ProductFormValues
): ProductFormData | null {
  if (!initial) return null;

  const safeMarkets: Market[] = (initial.markets || []).filter(
    (m): m is Market => MARKETS.includes(m as Market)
  );

  const validAvailability: Availability[] = ["enquiry", "in_stock", "preorder"];
  const validStatus: Status[] = ["active", "draft", "inactive"];

  const availability: Availability = validAvailability.includes(
    initial.availability as Availability
  )
    ? (initial.availability as Availability)
    : "enquiry";

  const status: Status = validStatus.includes(initial.status as Status)
    ? (initial.status as Status)
    : "active";

  return {
    name: initial.name,
    slug: initial.slug || "",
    category: initial.category || "",
    shortDescription: initial.shortDescription || "",
    description: initial.description || "",
    specifications: initial.specifications || {
      origin: "",
      processingType: "",
      shelfLife: "",
      certifications: [],
      applications: [],
    },
    availability,
    markets: safeMarkets,
    tags: initial.tags || [],
    status,
    seo: initial.seo || { metaTitle: "", metaDescription: "" },
  };
}

// ========================
// Main component
// ========================

export function AddProductPage({
  loading,
  initialProduct,
  onRefetchProduct,
}: {
  loading?: boolean;
  onRefetchProduct?: (value: string) => void;
  initialProduct?: ProductFormValues;
}) {
  const { categories } = useApp();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [images, setImages] = useState<{
    featured?: ImageFormat;
    gallery: ImageFormat[];
  }>({ featured: undefined, gallery: [] });
  const [imageModalOpen, setImageModalOpen] = useState({
    featured: false,
    gallery: false,
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      shortDescription: "",
      description: "",
      specifications: {
        origin: "",
        processingType: "",
        shelfLife: "",
        certifications: [],
        applications: [],
      },
      availability: "enquiry",
      markets: [],
      tags: [],
      status: "active",
      seo: { metaTitle: "", metaDescription: "" },
    },
  });

  const initialSnapshotRef = useRef<{
    form: ProductFormData | null;
    images: typeof images | null;
  }>({ form: null, images: null });

  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = form;

  // SEO touched flags
  const [metaTitleTouched, setMetaTitleTouched] = useState(false);
  const [metaDescriptionTouched, setMetaDescriptionTouched] = useState(false);
  const watchedFormValues = watch();
  const [isChanged, setIsChanged] = useState(false);

  const markets = watch("markets") || [];
  const certifications = watch("specifications.certifications") || [];
  const applications = watch("specifications.applications") || [];
  const nameValue = watch("name");
  const shortDescValue = watch("shortDescription");

  // Hydrate for edit mode
  useEffect(() => {
    if (!initialProduct || hydrated) return;

    const mapped = mapInitialToFormValues(initialProduct);
    if (!mapped) return;

    reset(mapped, {
      keepDirty: false,
      keepTouched: false,
    });

    const imageState = {
      featured: initialProduct.images?.featured,
      gallery: initialProduct.images?.gallery || [],
    };

    setImages(imageState);

    // 🔒 freeze baseline
    initialSnapshotRef.current = {
      form: mapped,
      images: imageState,
    };

    setHydrated(true);
  }, [initialProduct, reset, hydrated]);

  useEffect(() => {
    const snap = initialSnapshotRef.current;
    if (!initialProduct || !snap.form || !snap.images) {
      // create mode: rely on RHF's isDirty
      setIsChanged(isDirty);
      return;
    }

    const current = watchedFormValues;

    // shallow compare fields (can be replaced with deep-equal lib)
    const sameForm = JSON.stringify(current) === JSON.stringify(snap.form);

    const sameImages =
      JSON.stringify({
        featured: images.featured,
        gallery: images.gallery,
      }) === JSON.stringify(snap.images);

    setIsChanged(!(sameForm && sameImages));
  }, [watchedFormValues, images, isDirty, initialProduct]);

  // Auto SEO title/description
  useEffect(() => {
    if (initialProduct) return;
    if (!metaTitleTouched) {
      const autoTitle = nameValue?.trim() || "";
      setValue("seo.metaTitle", autoTitle, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }

    if (!metaDescriptionTouched) {
      const autoDesc = shortDescValue?.trim() || "";
      setValue("seo.metaDescription", autoDesc, {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [
    nameValue,
    shortDescValue,
    metaTitleTouched,
    metaDescriptionTouched,
    setValue,
    initialProduct,
  ]);

  // Toggle helpers
  const toggleArray = useCallback(
    (field: keyof ProductFormData, value: string) => {
      const current = form.getValues(field) || [];
      const newValue =
        Array.isArray(current) && current.includes(value)
          ? current.filter((v) => v !== value)
          : Array.isArray(current)
          ? [...current, value]
          : [value];
      setValue(field, newValue);
    },
    [setValue, form]
  );

  const toggleSpecArray = useCallback(
    (field: keyof ProductFormData["specifications"], value: string) => {
      const current = form.getValues(`specifications.${field}`) || [];
      const newValue = current.includes(value)
        ? (current as string[]).filter((v) => v !== value)
        : [...current, value];
      setValue(`specifications.${field}`, newValue);
    },
    [setValue, form]
  );

  const removeGalleryImage = useCallback((imageId: string) => {
    setImages((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((img) => img.id !== imageId),
    }));
  }, []);

  const removeFeaturedImage = useCallback(() => {
    setImages((prev) => ({ ...prev, featured: undefined }));
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, "-"),
        images,
      };

      const url = initialProduct
        ? `/api/products/${initialProduct.id}`
        : "/api/products";
      const method = initialProduct && initialProduct.id ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        toast.error(error.message || "Failed to create product");
        return;
      }

      toast.success(
        initialProduct
          ? "Product updated successfully!"
          : "Product created successfully!"
      );
      router.push("/phoenix-admin-panel-9753/products");
    } catch (error: unknown) {
      const e = error as Error;
      console.log(e.message);
      toast.error(e.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReload = () => {
    if (!initialProduct) return;
    if (initialProduct.id) onRefetchProduct?.(initialProduct?.id);
    const snap = initialSnapshotRef.current;
    if (!snap.form || !snap.images) return;

    // reset form back to original mapped values
    reset(snap.form, {
      keepDirty: false,
      keepTouched: false,
    });

    // reset images back to original
    setImages(snap.images);

    // also clear SEO touched so auto-fill can work again if needed
    setMetaTitleTouched(false);
    setMetaDescriptionTouched(false);

    toast.success("Changes reverted to last loaded product");
  };

  const isLoadingUI = loading || !hydrated;

  if (isLoadingUI) {
    return <AddProductSkeleton />;
  }

  return (
    <div className="min-h-full bg-background">
      {/* Header */}
      <div className="border-b border-border py-2 px-4 sticky bg-background top-12.5 z-50">
        <div className="max-w-full flex items-start flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <Button
              size="icon-sm"
              variant="outline"
              onClick={() => history.back()}
              className="cursor-pointer"
            >
              <MoveLeft className="text-muted-foreground" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">
                {initialProduct && initialProduct?.id
                  ? "Update Product"
                  : "Add New Product"}
              </h1>
              <p className="text-muted-foreground -mt-1 text-sm max-w-md">
                Fill in the product details to create a new listing for your
                store.
              </p>
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3">
            {initialProduct && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleReload}
                disabled={isSubmitting || !isChanged}
              >
                <RefreshCcw className="w-4 h-4 mr-2 hidden sm:inline-block" />
                Reload
              </Button>
            )}

            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleSubmit((data) =>
                onSubmit({ ...data, status: "draft" })
              )}
              disabled={isSubmitting || !isChanged}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              Save Draft
            </Button>
            <Button
              type="submit"
              size="sm"
              form="product-form"
              disabled={isSubmitting || !isChanged}
              className="cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {initialProduct ? "Update Product" : "Publish Product"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="w-full max-w-5xl mr-auto p-4 space-y-4">
        <form
          id="product-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Basic Information */}
          <Card className="p-4 gap-2 rounded-md">
            <CardHeader className="px-0">
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-0">
              <div className="space-y-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Enter product name"
                    className={cn({ "ring-2 ring-destructive": errors.name })}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    onValueChange={(value) => setValue("category", value)}
                    value={form.watch("category")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((e) => (
                        <SelectItem value={e._id} key={e._id}>
                          {e.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    {...form.register("shortDescription")}
                    rows={3}
                    className={cn({
                      "ring-2 ring-destructive": errors.shortDescription,
                    })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* Featured Image */}
                <div className="space-y-2">
                  <Label>Featured Image *</Label>
                  <div className="relative">
                    {images.featured ? (
                      <div className="group relative w-full h-64 rounded-xl overflow-hidden border-2 border-muted hover:border-primary transition-colors">
                        <Image
                          src={images.featured.url}
                          alt={images.featured.fileName || "Featured image"}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFeaturedImage();
                              }}
                              className="hover:bg-accent/20 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>

                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="hover:bg-accent/20 cursor-pointer"
                              asChild
                            >
                              <ImageModal
                                icon={Pen}
                                trigger
                                open={imageModalOpen.featured}
                                setOpen={() =>
                                  setImageModalOpen((prev) => ({
                                    ...prev,
                                    featured: !prev.featured,
                                  }))
                                }
                                selected={
                                  images.featured ? [images.featured] : []
                                }
                                onInsert={(imgs) => {
                                  if (imgs[0])
                                    setImages((prev) => ({
                                      ...prev,
                                      featured: imgs[0] as ImageFormat,
                                    }));
                                }}
                                className="w-9 h-9"
                                size="size-4"
                              />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <ImageModal
                        trigger
                        open={imageModalOpen.featured}
                        setOpen={() =>
                          setImageModalOpen((prev) => ({
                            ...prev,
                            featured: !prev.featured,
                          }))
                        }
                        selected={images.featured ? [images.featured] : []}
                        onInsert={(imgs) => {
                          if (imgs[0])
                            setImages((prev) => ({
                              ...prev,
                              featured: imgs[0] as ImageFormat,
                            }));
                        }}
                        className="w-full h-64 border-2 border-dashed border-muted rounded-xl flex items-center justify-center hover:border-primary transition-colors cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content & Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4 rounded-md gap-2">
              <CardHeader className="px-0">
                <CardTitle>Product Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-0">
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...form.register("description")}
                    rows={10}
                    className={cn("h-48 min-h-46 max-h-65 overflow-y-auto", {
                      "ring-2 ring-destructive": errors.description,
                    })}
                    placeholder="Tell your customers about this product..."
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <MultiWords
                  defaultWords={form.watch("tags") || []}
                  placeholder="product, organic, fresh, natural"
                  label="Product Tags"
                  clearAll={() => setValue("tags", [])}
                  onChange={(tags: string[]) => setValue("tags", tags)}
                />
              </CardContent>
            </Card>

            <Card className="p-4 gap-2 rounded-md">
              <CardHeader className="px-0">
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 px-0">
                <div className="space-y-3">
                  <Input
                    {...form.register("specifications.origin")}
                    placeholder="Origin (e.g., Andhra Pradesh, India)"
                  />
                  <Input
                    {...form.register("specifications.processingType")}
                    placeholder="Processing Type"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Certifications</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {CERTIFICATIONS.map((cert) => (
                      <CheckboxCard
                        key={cert}
                        label={cert}
                        checked={certifications.includes(cert)}
                        onChange={() => toggleSpecArray("certifications", cert)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Applications</Label>
                  <MultiWords
                    defaultWords={applications}
                    placeholder="Sustainable fashion, Home textiles..."
                    onChange={(apps) =>
                      setValue("specifications.applications", apps)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gallery */}
          <Card className="p-4 gap-2 rounded-md">
            <CardHeader className="px-0">
              <CardTitle>Gallery Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-0">
              <div className="flex items-center gap-2 justify-start overflow-x-auto">
                {(images.gallery?.length ?? 0) > 0 &&
                  images.gallery.map((img) => (
                    <div
                      key={img.id}
                      className="group relative w-20 h-20 rounded-md border-2 border-muted hover:border-primary transition-all duration-200 overflow-hidden"
                    >
                      <Image
                        src={img.url}
                        alt={img.fileName || img.name || "Product image"}
                        fill
                        className="object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        className="absolute top-1 right-1 h-5 w-5 bg-background hover:bg-accent/20 border border-red-500 rounded-full p-0 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all"
                        onClick={() => img?.id && removeGalleryImage(img.id)}
                      >
                        <Trash2 className="text-red-500" />
                      </Button>
                    </div>
                  ))}

                {/* Add more tile */}
                <div className="w-20 h-20">
                  <ImageModal
                    trigger
                    open={imageModalOpen.gallery}
                    setOpen={() =>
                      setImageModalOpen((prev) => ({
                        ...prev,
                        gallery: !prev.gallery,
                      }))
                    }
                    selected={images.gallery}
                    multiple
                    onInsert={(imgs) =>
                      setImages((prev) => ({
                        ...prev,
                        gallery: imgs as ImageFormat[],
                      }))
                    }
                    className="w-20 h-20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <div className="flex items-center justify-between rounded-md border px-3 py-2">
            <div>
              <p className="text-sm font-medium">Availability</p>
              <p className="text-xs text-muted-foreground">
                Sustainable materials are enquiry-based by default.
              </p>
            </div>

            <Select
              value={form.watch("availability")}
              onValueChange={(v: "in_stock" | "enquiry" | "preorder") =>
                setValue("availability", v)
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" side="bottom" align="end">
                <SelectItem value="in_stock">In Stock</SelectItem>
                <SelectItem value="enquiry">Enquiry Based</SelectItem>
                <SelectItem value="preorder">Pre-order</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Markets & Status */}
          <Card className="rounded-md gap-2 p-4">
            <CardHeader className="px-0 border-b [.border-b]:pb-0">
              <CardTitle>Target Markets</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="flex items-center justify-start gap-4 lg:gap-0">
                <div className="flex items-center gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={form.watch("status") === "active"}
                        onCheckedChange={(checked) =>
                          setValue("status", checked ? "active" : "draft")
                        }
                      />
                      <span
                        className={cn(
                          "text-xs font-medium",
                          form.watch("status") === "active"
                            ? "text-emerald-600"
                            : "text-muted-foreground"
                        )}
                      >
                        {form.watch("status") === "active"
                          ? "Published"
                          : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-2" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {MARKETS.map((market) => (
                  <CheckboxCard
                    key={market}
                    label={market}
                    checked={markets.includes(market)}
                    onChange={() => toggleArray("markets", market)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card className="p-4 gap-2 rounded-md">
            <CardHeader className="px-0">
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-0">
              <div className="space-y-1">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  {...form.register("seo.metaTitle")}
                  onChange={(e) => {
                    setMetaTitleTouched(true);
                    setValue("seo.metaTitle", e.target.value);
                  }}
                  placeholder="Meta title for search engines"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  rows={3}
                  {...form.register("seo.metaDescription")}
                  onChange={(e) => {
                    setMetaDescriptionTouched(true);
                    setValue("seo.metaDescription", e.target.value);
                  }}
                  placeholder="Short description for search engines"
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}

// ========================
// Reusable CheckboxCard
// ========================

function CheckboxCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer">
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        className="mr-3 h-4 w-4"
      />
      <span className="text-sm font-medium group-hover:text-primary">
        {label}
      </span>
    </label>
  );
}

function AddProductSkeleton() {
  return (
    <div className="min-h-full bg-background">
      {/* Header skeleton */}
      <div className="border-b border-border py-2 px-4 sticky bg-background top-12.5 z-50">
        <div className="max-w-full flex items-start flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-8 w-8 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-28 rounded-md" />
            <Skeleton className="h-8 w-32 rounded-md" />
          </div>
        </div>
      </div>

      {/* Main form skeleton */}
      <div className="w-full max-w-5xl mr-auto p-4 space-y-4">
        {/* Basic info card */}
        <Card className="p-4 gap-2 rounded-md">
          <CardHeader className="px-0">
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {/* Description + specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4 rounded-md gap-2">
            <CardHeader className="px-0">
              <Skeleton className="h-5 w-40" />
            </CardHeader>
            <CardContent className="space-y-3 px-0">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full" />
            </CardContent>
          </Card>

          <Card className="p-4 rounded-md gap-2">
            <CardHeader className="px-0">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="space-y-3 px-0">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery */}
        <Card className="p-4 gap-2 rounded-md">
          <CardHeader className="px-0">
            <Skeleton className="h-5 w-36" />
          </CardHeader>
          <CardContent className="space-y-2 px-0">
            <div className="flex items-center gap-2">
              <Skeleton className="h-20 w-20 rounded-md" />
              <Skeleton className="h-20 w-20 rounded-md" />
              <Skeleton className="h-20 w-20 rounded-md" />
              <Skeleton className="h-20 w-20 rounded-md" />
            </div>
          </CardContent>
        </Card>

        {/* Availability */}
        <div className="flex items-center justify-between rounded-md border px-3 py-2">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-9 w-40 rounded-md" />
        </div>

        {/* Markets & SEO */}
        <Card className="rounded-md gap-2 p-4">
          <CardHeader className="px-0">
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-4 px-0">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Separator />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 gap-2 rounded-md">
          <CardHeader className="px-0">
            <Skeleton className="h-5 w-16" />
          </CardHeader>
          <CardContent className="space-y-3 px-0">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
