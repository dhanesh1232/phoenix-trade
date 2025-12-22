"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Activity,
  Boxes,
  TrendingUp,
  PieChart as PieIcon,
  MoreVertical,
  ChevronRight,
  AlertCircle,
  Search,
  Filter,
  Download,
  Calendar,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Data
const monthlyData = [
  { month: "Jan", value: 12, target: 15 },
  { month: "Feb", value: 18, target: 16 },
  { month: "Mar", value: 9, target: 18 },
  { month: "Apr", value: 15, target: 20 },
  { month: "May", value: 22, target: 22 },
  { month: "Jun", value: 19, target: 25 },
  { month: "Jul", value: 24, target: 25 },
  { month: "Aug", value: 27, target: 28 },
];

const categoryData = [
  { name: "Fresh", value: 12, color: "oklch(0.696 0.17 162.48)" },
  { name: "Marine", value: 8, color: "oklch(0.646 0.222 41.116)" },
  { name: "Dried", value: 6, color: "oklch(0.627 0.194 16.439)" },
  { name: "Frozen", value: 4, color: "oklch(0.585 0.233 277.117)" },
];

const recentProducts = [
  {
    id: 1,
    name: "Fresh Banana",
    category: "Fresh Produce",
    status: "active",
    date: "12 Jan 2025",
    stock: 142,
    price: "$2.99/kg",
  },
  {
    id: 2,
    name: "Vannamei Shrimp",
    category: "Marine Products",
    status: "inactive",
    date: "10 Jan 2025",
    stock: 0,
    price: "$15.50/kg",
  },
  {
    id: 3,
    name: "Dried Anchovies",
    category: "Dried Products",
    status: "active",
    date: "08 Jan 2025",
    stock: 56,
    price: "$8.75/kg",
  },
  {
    id: 4,
    name: "Atlantic Salmon",
    category: "Marine Products",
    status: "active",
    date: "05 Jan 2025",
    stock: 23,
    price: "$22.99/kg",
  },
  {
    id: 5,
    name: "Organic Spinach",
    category: "Fresh Produce",
    status: "low",
    date: "03 Jan 2025",
    stock: 8,
    price: "$4.50/kg",
  },
];

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("6M");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = recentProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalProducts = 42;
  const activeProducts = 34;
  const inactiveProducts = 5;
  const lowStockProducts = 3;

  return (
    <div className="max-w-7xl w-full mx-auto space-y-6 px-4 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-700 flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-['Playfair_Display'] tracking-[0.12em] uppercase text-foreground">
                Product Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Inventory, categories and performance at a glance.
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Last updated{" "}
            <span className="font-medium text-foreground">Today, 10:42 AM</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Date
          </Button>
          <Button
            size="sm"
            className="gap-2 bg-emerald-600 hover:bg-emerald-700"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          change="+12%"
          trend="up"
          icon={<Package className="h-5 w-5" />}
          color="bg-sky-500"
          loading={isLoading}
        />
        <StatCard
          title="Active Products"
          value={activeProducts}
          change="+8%"
          trend="up"
          icon={<Activity className="h-5 w-5" />}
          color="bg-emerald-500"
          loading={isLoading}
        />
        <StatCard
          title="Low Stock"
          value={lowStockProducts}
          change="-2%"
          trend="down"
          icon={<AlertCircle className="h-5 w-5" />}
          color="bg-amber-500"
          loading={isLoading}
        />
        <StatCard
          title="Categories"
          value={categoryData.length}
          change="+1"
          trend="up"
          icon={<Boxes className="h-5 w-5" />}
          color="bg-purple-500"
          loading={isLoading}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Area chart */}
        <Card className="lg:col-span-2 border border-border/60 bg-card/95">
          <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
            <div>
              <CardTitle className="text-sm font-semibold tracking-[0.12em] uppercase">
                Product Growth Trend
              </CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Monthly additions compared to targets.
              </p>
            </div>

            {/* Time range pills */}
            <div className="inline-flex items-center gap-1 rounded-md bg-muted px-1 py-1">
              {["1M", "3M", "6M", "1Y"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "ghost"}
                  size="icon"
                  onClick={() => setTimeRange(range)}
                  className={
                    timeRange === range
                      ? "h-7 w-11 rounded-md bg-emerald-600 hover:bg-emerald-700 text-[11px] text-white"
                      : "h-7 w-11 rounded-md text-[11px] text-muted-foreground"
                  }
                >
                  {range}
                </Button>
              ))}
            </div>
          </CardHeader>

          {/* inline legend */}
          <div className="px-5 flex items-center gap-4 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.696_0.17_162.48)]" />
              <span>Actual</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[oklch(0.87_0.02_258.338)]" />
              <span>Target</span>
            </div>
          </div>

          <CardContent className="pt-3 pb-5 px-4">
            {/* ✅ full‑width, fixed height container for ResponsiveContainer */}
            <div className="w-full h-full" style={{ height: 260 }}>
              <ChartContainer
                config={{
                  value: {
                    label: "Products",
                    color: "hsl(var(--chart-1))",
                  },
                  target: {
                    label: "Target",
                    color: "hsl(var(--muted-foreground))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(148,163,184,0.18)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 11 }}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 11 }}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />

                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="oklch(0.87 0.02 258.338)"
                      fill="none"
                      strokeWidth={1.2}
                      strokeDasharray="4 4"
                    />

                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="oklch(0.696 0.17 162.48)"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="oklch(0.696 0.17 162.48)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="oklch(0.696 0.17 162.48)"
                      fill="url(#colorValue)"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "oklch(0.696 0.17 162.48)" }}
                      activeDot={{ r: 5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie chart */}
        <Card className="border border-border/60 bg-card/95">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold tracking-[0.12em] uppercase">
              Category Distribution
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Share of products by category.
            </p>
          </CardHeader>
          <CardContent className="pt-2 pb-5 px-4">
            {/* ✅ same fixed height pattern */}
            <div className="w-full" style={{ height: 220 }}>
              <ChartContainer
                config={{
                  value: {
                    label: "Products",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={78}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-y-2 text-[11px]">
              {categoryData.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {category.value} products
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="border border-border/60 bg-card/90 py-0 p-4 gap-2">
        <CardHeader className="px-0 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">
              Recent Products
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest items added to your inventory.
            </p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            View all
            <ChevronRight className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent className="px-0">
          <div className="rounded-md border border-border/60 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center">
                          <Package className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{product.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={Math.min((product.stock / 150) * 100, 100)}
                          className="h-1.5 w-20"
                        />
                        <span className="text-xs font-medium">
                          {product.stock}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {product.price}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.status === "active"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : product.status === "low"
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-slate-100 text-slate-800 border-slate-200"
                        }
                      >
                        {product.status.charAt(0).toUpperCase() +
                          product.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {product.date}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" side="left">
                          <DropdownMenuItem className="gap-2 text-xs">
                            <Eye className="h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs">
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-xs text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  change: string;
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
    <Card className="border p-4 border-border/60 bg-card/90 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0 px-0 space-y-3">
        {loading ? (
          <div className="space-y-3">
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
            <div className="h-6 w-2/3 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/3 rounded bg-muted animate-pulse" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div
                className={`h-10 w-10 rounded-lg ${color} flex items-center justify-center`}
              >
                <span className="text-white">{icon}</span>
              </div>
              <span
                className={
                  trend === "up"
                    ? "text-xs font-medium text-emerald-600"
                    : "text-xs font-medium text-red-600"
                }
              >
                {change}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {title}
              </p>
              <p className="text-2xl font-semibold">{value}</p>
              <p className="text-[11px] text-muted-foreground">
                {change} vs last month
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
