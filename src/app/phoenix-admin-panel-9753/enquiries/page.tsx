"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import {
  Search,
  Mail,
  Clock,
  MapPin,
  Package,
  Calendar,
  Loader2,
  ArrowDownUp,
  MoreVertical,
  Trash2,
  Phone,
} from "lucide-react";
import { MdRefresh } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
  StatusPopover,
  StatusBadge,
} from "@/components/pages/admin/pages/status-popover";

type EnquiryStatus = "new" | "in_review" | "closed";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  product: string;
  quantity?: string;
  country: string;
  packaging?: string;
  timeline?: string;
  message?: string;
  phone?: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | EnquiryStatus>(
    "all"
  );

  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", { method: "GET" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to load enquiries.");
        return;
      }
      setEnquiries(data.data?.enquiries || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const filtered = enquiries.filter((enq) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      enq.name.toLowerCase().includes(q) ||
      enq.email.toLowerCase().includes(q) ||
      enq.product.toLowerCase().includes(q) ||
      enq.country.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" ? true : enq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, status: EnquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to update status.");
        return;
      }

      toast.success(data.message || "Status updated.");

      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      );

      setSelected((prev) =>
        prev && prev._id === id ? { ...prev, status } : prev
      );
    } catch (err) {
      console.error(err);
      toast.error("Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this enquiry? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete enquiry.");
        return;
      }

      toast.success(data.message || "Enquiry deleted successfully.");

      setEnquiries((prev) => prev.filter((e) => e._id !== id));

      if (selected?._id === id) {
        setSheetOpen(false);
        setSelected(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete enquiry.");
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const openSheetFor = (enq: Enquiry) => {
    setSelected(enq);
    setSheetOpen(true);
  };

  return (
    <>
      <main className="h-full bg-background text-foreground">
        {/* Header */}
        <section className="border-b border-border bg-card/60">
          <div className="w-full px-4 py-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] tracking-[0.28em] uppercase text-primary">
                  Enquiries
                </p>
                <h1 className="text-2xl md:text-3xl font-semibold font-['Playfair_Display']">
                  Product Enquiry Inbox{" "}
                  <span className="text-muted-foreground text-base">
                    ({enquiries.length})
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Work enquiries like a **CRM**: search, filter, inspect, and
                  act fast.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading}
                  onClick={fetchEnquiries}
                  className="cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <MdRefresh className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-4 border-b border-border bg-muted/10">
          <div className="w-full px-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, product, country…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex items-center gap-3">
                <Select
                  value={statusFilter}
                  onValueChange={(v) =>
                    setStatusFilter(v as "all" | EnquiryStatus)
                  }
                >
                  <SelectTrigger className="w-40 text-xs">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in_review">In review</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="py-2">
          <div className="w-full px-4">
            <div className="rounded-md border border-border bg-card/70 overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="border-b border-border/80">
                      <TableHead className="min-w-[200px]">Buyer</TableHead>
                      <TableHead className="min-w-[120px]">Phone</TableHead>
                      <TableHead className="min-w-[150px]">Product</TableHead>
                      <TableHead className="min-w-[120px]">Country</TableHead>
                      <TableHead className="min-w-[120px]">Received</TableHead>
                      <TableHead className="text-center min-w-[140px]">
                        Status
                      </TableHead>
                      <TableHead className="text-right min-w-[80px]">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="py-10 text-center">
                          <span className="text-sm text-muted-foreground">
                            Loading enquiries…
                          </span>
                        </TableCell>
                      </TableRow>
                    ) : filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="py-10">
                          <div className="flex flex-col items-center gap-2">
                            <Search className="w-10 h-10 text-muted-foreground/50" />
                            <p className="text-muted-foreground">
                              No enquiries found
                            </p>
                            <p className="text-sm text-muted-foreground/70">
                              Adjust filters or check again later.
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((enq) => (
                        <TableRow
                          key={enq._id}
                          className={cn(
                            "cursor-pointer hover:bg-muted/60 transition-colors",
                            selected?._id === enq._id && "bg-primary/5"
                          )}
                          onClick={() => openSheetFor(enq)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary shrink-0">
                                {getInitials(enq.name)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">
                                  {enq.name}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {enq.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            {enq.phone ? (
                              <span className="text-sm">{enq.phone}</span>
                            ) : (
                              "-"
                            )}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Package className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
                              <p className="text-xs md:text-sm text-muted-foreground truncate">
                                {enq.product}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
                              <p className="text-xs md:text-sm text-muted-foreground truncate">
                                {enq.country}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <p className="text-xs text-muted-foreground whitespace-nowrap">
                              {format(new Date(enq.createdAt), "dd MMM yyyy")}
                            </p>
                          </TableCell>

                          <TableCell
                            className="text-center"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex justify-center">
                              <StatusPopover
                                currentStatus={enq.status}
                                onStatusChange={(status) =>
                                  handleStatusChange(enq._id, status)
                                }
                                disabled={updatingId === enq._id}
                                align="center"
                              />
                            </div>
                          </TableCell>

                          <TableCell
                            className="text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" side="left">
                                <DropdownMenuLabel className="text-xs">
                                  Quick actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex items-center gap-1.5 cursor-pointer"
                                  onClick={() => openSheetFor(enq)}
                                >
                                  <ArrowDownUp className="w-3.5 h-3.5" />
                                  <span>View details</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="flex items-center gap-1.5 cursor-pointer text-destructive focus:text-destructive"
                                  onClick={() => handleDelete(enq._id)}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="flex flex-col gap-4 border-l border-border px-4"
        >
          {selected && (
            <>
              <SheetHeader className="space-y-2 px-0 border-b border-border pb-4">
                <SheetTitle className="flex items-center justify-start gap-2 flex-wrap">
                  <span>{selected.name}</span>
                  <StatusBadge status={selected.status} />
                </SheetTitle>
                <SheetDescription className="space-y-1 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <Link
                      href={`mailto:${selected.email}`}
                      className="underline underline-offset-2"
                    >
                      {selected.email}
                    </Link>
                  </span>
                  {selected.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selected.phone}</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {format(
                        new Date(selected.createdAt),
                        "dd MMM yyyy, HH:mm"
                      )}
                    </span>
                  </span>
                </SheetDescription>
              </SheetHeader>

              {/* Status selector with Popover */}
              <div className="flex items-center justify-between gap-2 rounded-md border bg-muted/40 px-3 py-2">
                <span className="text-xs text-muted-foreground">
                  Pipeline status
                </span>
                <StatusPopover
                  currentStatus={selected.status}
                  onStatusChange={(status) =>
                    handleStatusChange(selected._id, status)
                  }
                  disabled={updatingId === selected._id}
                  align="end"
                />
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Package className="w-4 h-4" /> Product
                  </span>
                  <span className="font-medium text-right">
                    {selected.product || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/60">
                  <span className="text-muted-foreground">Quantity</span>
                  <span className="font-medium">
                    {selected.quantity || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Country
                  </span>
                  <span className="font-medium">{selected.country || "-"}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/60">
                  <span className="text-muted-foreground">Packaging</span>
                  <span className="font-medium">
                    {selected.packaging || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border/60">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Timeline
                  </span>
                  <span className="font-medium">
                    {selected.timeline || "-"}
                  </span>
                </div>
              </div>

              {/* Buyer notes */}
              <div className="space-y-2 border-t border-border/60 pt-3">
                <p className="text-xs tracking-[0.22em] uppercase text-primary">
                  Buyer Notes
                </p>
                <div className="rounded-md bg-muted/60 p-3 max-h-56 overflow-auto">
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selected.message || "No additional message provided."}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto py-2 border-t border-border/60 flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-1.5 cursor-pointer"
                  onClick={() => handleDelete(selected._id)}
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </Button>
                <Button asChild size="sm" className="flex-1">
                  <a href={`mailto:${selected.email}`}>
                    <Mail className="w-4 h-4 mr-1.5" />
                    Reply via Email
                  </a>
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
