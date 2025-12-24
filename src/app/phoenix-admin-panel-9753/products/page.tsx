// app/phoenix-admin-panel-9753/products/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Pencil,
  Trash2,
  Image as ImageIcon,
  LayoutList,
  LayoutGrid,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { SECRET_ADMIN_PATH } from "@/lib/validators_client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type Filters = {
  search: string;
  category: string;
  status: string;
};
type CategoryOption = { id: string; name: string };

type ViewMode = "table" | "cards";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductFormValues[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  // Fetch products with filters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filters.search) params.append("search", filters.search);
      if (filters.category) params.append("category", filters.category);
      if (filters.status) params.append("status", filters.status);

      const url = `/api/products?${params.toString()}`;
      const prodRes = await fetch(url);
      const prodData = await prodRes.json();

      if (!prodRes.ok)
        throw new Error(prodData.message || "Failed to fetch products");

      setProducts(prodData.data?.products || []);
    } catch (error) {
      const e = error as Error;
      toast.error(e.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters.search, filters.category, filters.status]);

  // Initial load: products + categories
  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`/api/products`),
          fetch("/api/categories"),
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData.data.products);
        setCategories(
          catData.data.categories.map((c: CategoryFormValues) => ({
            id: c._id,
            name: c.name,
          }))
        );
      } catch (er: unknown) {
        const e = er as Error;
        toast.error(e.message);
      }
    };
    load();
  }, []);

  // Debounced filter fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product");
      setProducts(data.data.products);
      toast.success(data.message || "Product deleted");
    } catch (err: unknown) {
      const e = err as Error;
      toast.error(e.message);
    }
  };

  const activeCount = products.filter((p) => p.status === "active").length;
  const inactiveCount = products.length - activeCount;

  const renderStatusBadge = (status: string) =>
    status === "active" ? (
      <Badge
        variant="outline"
        className="border-emerald-600/40 text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-300"
      >
        Active
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="border-slate-500/40 text-slate-700 bg-slate-50 dark:bg-slate-900/40 dark:text-slate-300"
      >
        Inactive
      </Badge>
    );

  const thumbnailFor = (p: ProductFormValues) =>
    p.images?.featured?.thumbnail || p.images?.featured?.url || "";

  return (
    <div className="w-full mr-auto space-y-4 px-2 md:px-4 py-2">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] tracking-wide">
                Products{" "}
                <span className="text-muted-foreground font-sans text-base md:text-xl">
                  ({products.length})
                </span>
              </h1>
              <div className="flex gap-1 justify-start text-xs sm:text-sm">
                <Badge
                  variant="outline"
                  className="gap-1 border-emerald-500/40 text-xs"
                >
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Active
                </Badge>
                <Badge
                  variant="outline"
                  className="gap-1 border-slate-400/40 text-xs"
                >
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Inactive
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Add, edit and control product visibility on your website.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="hidden sm:flex items-center rounded-md border bg-background">
            <Button
              type="button"
              variant={viewMode === "table" ? "default" : "ghost"}
              size="icon-sm"
              className="rounded-r-none"
              onClick={() => setViewMode("table")}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="icon-sm"
              className="rounded-l-none"
              onClick={() => setViewMode("cards")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
          </div>

          <Button asChild variant="primary" size="sm">
            <Link href={`/${SECRET_ADMIN_PATH}/products/add`}>Add Product</Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, description or origin..."
            className="pl-9"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        {/* Category + Status filters */}
        <div className="flex flex-wrap gap-2 justify-end text-xs sm:text-sm">
          <Select
            value={filters.category}
            onValueChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                category: val === "all" ? "" : val,
              }))
            }
          >
            <SelectTrigger className="w-32.5">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem value={c.id} key={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                status: val === "all" ? "" : val,
              }))
            }
          >
            <SelectTrigger className="w-30">
              <SelectValue placeholder="All status" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <Card className="border-border bg-background py-0 gap-0 rounded-md">
          <CardContent className="py-3 px-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Total products</p>
              <p className="text-lg font-semibold">{products.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-background py-0 gap-0 rounded-md">
          <CardContent className="py-3 px-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Active</p>
              <p className="text-lg font-semibold text-emerald-600">
                {activeCount}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-background hidden md:flex gap-0 py-0 rounded-md">
          <CardContent className="py-3 px-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Inactive</p>
              <p className="text-lg font-semibold text-slate-600">
                {inactiveCount}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main list */}
      <Card
        className={`${
          viewMode === "cards" ? "shadow-none border-0 p-0" : "border-border"
        } bg-background py-0 gap-0 p-0 rounded-md`}
      >
        <CardContent className="p-0">
          {/* Table view (desktop) */}
          {viewMode === "table" && (
            <div className="w-full overflow-x-auto">
              <Table className="min-w-full text-sm table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-40">Product</TableHead>
                    <TableHead className="w-20">Category</TableHead>
                    <TableHead className="w-15">Status</TableHead>
                    <TableHead className="w-20">Markets</TableHead>
                    <TableHead className="w-10 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products.length ? (
                    products.map((p, ind) => (
                      <TableRow
                        key={(p?.id ?? ind.toString()) + ind.toString()}
                      >
                        <TableCell className="w-40">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 rounded-md">
                              <AvatarImage
                                src={thumbnailFor(p)}
                                alt={p.name}
                                className="object-cover"
                              />
                              <AvatarFallback className="rounded-md bg-muted">
                                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex flex-col gap-0.5 min-w-0">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="font-medium text-sm text-foreground truncate">
                                  {p.name}
                                </span>
                              </div>

                              <span className="text-xs text-muted-foreground truncate">
                                {p.shortDescription || p.description}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="text-muted-foreground w-20 truncate">
                          {p.categoryName || "-"}
                        </TableCell>
                        <TableCell className="w-15">
                          {renderStatusBadge(p.status)}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground w-20 truncate">
                          {p.markets?.length ? p.markets.join(", ") : "–"}
                        </TableCell>
                        <TableCell className="text-right w-10">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="hover:bg-primary/40 p-2 rounded cursor-pointer focus-visible:ring-0 focus-visible:outline-0 data-[active=true]:bg-accent/80">
                              <MoreVertical className="w-4 h-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="left" align="start">
                              <DropdownMenuLabel className="text-xs text-muted-foreground p-1">
                                Actions
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="flex items-center gap-1.5 group cursor-pointer"
                                asChild
                              >
                                <Link
                                  href={`/${SECRET_ADMIN_PATH}/products/${p.id}`}
                                >
                                  <Pencil className="w-4 h-4 group-hover:text-primary" />
                                  <span className="group-hover:text-primary">
                                    Edit
                                  </span>
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-500 group cursor-pointer w-full flex items-center gap-1.5 focus-visible:bg-red-500/30 focus-visible:text-red-600 hover:bg-red-500/40 dark:hover:bg-red-950"
                                onClick={() => p.id && handleDelete(p.id)}
                              >
                                <Trash2 className="w-4 h-4 group-hover:text-red-500" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <div className="flex flex-col items-center gap-2 py-10">
                          <Search className="w-10 h-10 text-muted-foreground/50" />
                          <p className="text-muted-foreground">
                            No products found
                          </p>
                          <p className="text-sm text-muted-foreground/70">
                            Try adjusting filters or create your first product.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Card view (good for mobile & visual browsing) */}
          {viewMode === "cards" && (
            <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {products.length ? (
                products.map((p, ind) => (
                  <Card
                    key={(p.id ?? ind.toString()) + ind.toString()}
                    className="flex py-0 flex-col overflow-hidden border-border"
                  >
                    <div className="relative h-32 w-full bg-muted">
                      {thumbnailFor(p) ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={thumbnailFor(p)}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground/60">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        {renderStatusBadge(p.status)}
                      </div>
                    </div>
                    <CardContent className="flex-1 p-3 flex flex-col gap-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold line-clamp-1">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {p.shortDescription || p.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {p.categoryName && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0"
                          >
                            {p.categoryName}
                          </Badge>
                        )}
                        {p.markets?.slice(0, 3).map((m: string) => (
                          <Badge
                            key={m}
                            variant="outline"
                            className="text-[10px] px-1.5 py-0"
                          >
                            {m}
                          </Badge>
                        ))}
                        {p.availability === "in_stock" && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-emerald-500/10 text-emerald-700">
                            In stock
                          </Badge>
                        )}
                        {p.availability === "enquiry" && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-amber-500/10 text-amber-700">
                            Enquiry
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <div className="flex items-center justify-between px-3 py-2 border-t border-border">
                      <span className="text-[11px] text-muted-foreground">
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-primary hover:bg-primary/10"
                        >
                          <Link href={`/${SECRET_ADMIN_PATH}/products/${p.id}`}>
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 cursor-pointer text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                          onClick={() => p.id && handleDelete(p.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center gap-2 py-10">
                  <Search className="w-10 h-10 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground/70">
                    Try adjusting filters or create your first product.
                  </p>
                </div>
              )}
            </div>
          )}

          {loading && (
            <div className="py-4 text-center text-xs text-muted-foreground">
              Loading products…
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
