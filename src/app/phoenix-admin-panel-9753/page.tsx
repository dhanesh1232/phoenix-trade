"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Package,
  Activity,
  Boxes,
  PieChart as PieIcon,
  MoreVertical,
  ChevronRight,
  Search,
  Eye,
  Edit,
  RefreshCcw,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SECRET_ADMIN_PATH } from "@/lib/validators_client";

interface DashboardData {
  global: {
    totalProducts: number;
    totalCategories: number;
    activeProducts: number;
    draftProducts: number;
    inactiveProducts: number;
  };
  categories: Array<{
    _id: string;
    name: string;
    totalProducts: number;
    activeProducts: number;
    draftProducts: number;
    inactiveProducts: number;
  }>;
  latestProducts: Array<{
    id: string;
    name: string;
    category: string;
    status: string;
    createdAt: string;
    markets: string[];
    availability: string;
  }>;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<DashboardData | null>(null);
  const { data: session } = useSession();

  const fetchSummary = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/summary");
      const data = await res.json();

      if (data.success) {
        setSummary(data.data);
      }
    } catch (e: unknown) {
      const er = e as Error;
      console.error("Failed to fetch summary:", er.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchSummary();
    }
  }, [fetchSummary, session]);

  // Dynamic pie chart data from API
  const categoryChartData = useMemo(() => {
    if (!summary?.categories) return [];

    return summary.categories.slice(0, 4).map((cat) => ({
      name: cat.name,
      value: cat.totalProducts,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));
  }, [summary?.categories]);

  const filteredProducts = useMemo(() => {
    if (!summary?.latestProducts) return [];
    return summary.latestProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [summary?.latestProducts, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "draft":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "inactive":
        return "bg-slate-100 text-slate-800 border-slate-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleRefresh = () => {
    fetchSummary();
  };

  return (
    <div className="w-full mx-auto space-y-4 px-2 md:px-4 py-3">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 lg:w-10 lg:h-10 rounded bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-['Playfair_Display'] tracking-tight">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                {summary?.global.totalProducts || 0} products across{" "}
                {summary?.global.totalCategories || 0} categories
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Last updated{" "}
            <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded-full">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search recent products..."
              className="pl-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden lg:block">Refreshing....</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <RefreshCcw className={`h-4 w-4`} />
                <span className="hidden lg:block">Refresh</span>
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatCard
          title="Total Products"
          value={summary?.global.totalProducts || 0}
          trend="up"
          icon={<Package className="h-5 w-5" />}
          color="bg-linear-to-br from-blue-500 to-blue-600 text-white"
          loading={isLoading}
        />
        <StatCard
          title="Active"
          value={summary?.global.activeProducts || 0}
          trend="up"
          icon={<Activity className="h-5 w-5" />}
          color="bg-linear-to-br from-emerald-500 to-emerald-600 text-white"
          loading={isLoading}
        />
        <StatCard
          title="Draft"
          value={summary?.global.draftProducts || 0}
          trend="up"
          icon={<Boxes className="h-5 w-5" />}
          color="bg-linear-to-br from-amber-500 to-amber-600 text-white"
          loading={isLoading}
        />
        <StatCard
          title="Inactive Products"
          value={summary?.global.inactiveProducts || 0}
          trend="up"
          icon={<Package className="h-5 w-5" />}
          color="bg-linear-to-br from-orange-500 to-orange-600 text-white"
          loading={isLoading}
        />
        <StatCard
          title="Categories"
          value={summary?.global.totalCategories || 0}
          trend="up"
          icon={<PieIcon className="h-5 w-5" />}
          color="bg-linear-to-br from-purple-500 to-purple-600 text-white"
          loading={isLoading}
        />
      </div>

      {/* Charts & Table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Dynamic Category Pie Chart */}
        <Card className="border rounded py-0 md:p-4 p-2 xl:col-span-1">
          <CardHeader className="px-2">
            <CardTitle className="text-lg font-semibold tracking-wide uppercase text-muted-foreground/80">
              Category Breakdown
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribution of {summary?.global.totalProducts || 0} products
            </p>
          </CardHeader>
          <CardContent className="px-2">
            {isLoading ? (
              // Skeleton for Chart
              <div className="space-y-4">
                <div className="w-full h-[280px] flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full bg-muted animate-pulse" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
                        <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-4 w-8 bg-muted rounded animate-pulse ml-auto" />
                        <div className="h-3 w-12 bg-muted/70 rounded animate-pulse ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="w-full" style={{ height: 280 }}>
                  <ChartContainer
                    config={{ value: { color: "hsl(var(--chart-1))" } }}
                    className="w-full h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={85}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="mt-2">
                  {categoryChartData.map((category, idx) => {
                    const catData = summary?.categories[idx];
                    return (
                      <div
                        key={category.name}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="font-medium text-sm">
                            {category.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-sm font-semibold">
                            {category.value}
                          </p>
                          {catData && (
                            <p className="text-xs text-muted-foreground">
                              {catData.activeProducts} active
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Products Table */}
        <Card className="border rounded py-0 pt-2 gap-2 xl:col-span-2">
          <CardHeader className="px-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Recent Products ({filteredProducts.length})
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Latest {summary?.latestProducts.length || 0} additions
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link href={`/${SECRET_ADMIN_PATH}/products`}>
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0">
            <div className="overflow-x-auto">
              <Table className="border-t">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/50">
                    <TableHead className="w-32">Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Markets</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="w-16">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    // Skeleton rows
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
                            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <div className="h-5 w-12 bg-muted rounded animate-pulse" />
                            <div className="h-5 w-12 bg-muted rounded animate-pulse" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="h-6 w-16 bg-muted rounded-full animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                        </TableCell>
                        <TableCell>
                          <div className="h-9 w-9 bg-muted rounded animate-pulse" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : filteredProducts.length ? (
                    filteredProducts.map((product) => (
                      <TableRow
                        key={product.id}
                        className="group hover:bg-accent/30"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-linear-to-br from-muted to-muted-foreground/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <Package className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-sm truncate">
                                {product.name}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          <div className="flex flex-wrap gap-1">
                            {product.markets.slice(0, 2).map((market) => (
                              <Badge
                                key={market}
                                variant="secondary"
                                className="px-2 py-0.5 text-xs"
                              >
                                {market}
                              </Badge>
                            ))}
                            {product.markets.length > 2 && (
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-0.5"
                              >
                                +{product.markets.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(product.status)}>
                            {product.status.charAt(0).toUpperCase() +
                              product.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground">
                          {product.createdAt}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild className="gap-2">
                                <Link
                                  href={`/${SECRET_ADMIN_PATH}/products/${product.id}`}
                                >
                                  <Eye className="h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild className="gap-2">
                                <Link
                                  href={`/${SECRET_ADMIN_PATH}/products/${product.id}`}
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-32 text-center py-8">
                        <div className="space-y-2">
                          <Package className="h-12 w-12 mx-auto text-muted-foreground/50" />
                          <h3 className="text-lg font-medium text-muted-foreground">
                            No recent products
                          </h3>
                          <p className="text-sm text-muted-foreground/70">
                            Get started by adding your first product
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// StatCard component with skeleton loading
interface StatCardProps {
  title: string;
  value: number;
  change?: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
}

function StatCard({
  title,
  value,
  change,
  trend,
  icon,
  color,
  loading = false,
}: StatCardProps) {
  return (
    <Card className="group rounded border p-4 gap-0 transition-all duration-300 bg-linear-to-br from-background to-muted/30">
      <CardContent className="p-0 space-y-2 px-0">
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="h-6 w-12 rounded-full bg-muted animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-muted animate-pulse" />
              <div className="h-9 w-16 rounded bg-muted animate-pulse" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div
                className={`h-10 w-10 rounded-full ${color} flex items-center justify-center group-hover:scale-105 transition-transform`}
              >
                {icon}
              </div>
              {change && (
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    trend === "up"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {change}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                {title}
              </p>
              <p className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-foreground to-primary bg-clip-text text-transparent">
                {value}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
