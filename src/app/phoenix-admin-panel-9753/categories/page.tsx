"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CategoryDialog } from "@/components/pages/admin/pages/add-category";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CategoriesPage() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [onEdit, setOnEdit] = useState<CategoryFormValues | null>();
  const [categories, setCategories] = useState<CategoryFormValues[]>([]);

  // Filter categories based on search
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();

        setCategories(data.data.categories);
      } catch (err: unknown) {
        const er = err as Error;
        toast.error(er.message);
      }
    };
    fetchCategories();
  }, []);

  // Handle form submission
  const handleCreateCategory = async (values: CategoryFormValues) => {
    try {
      setIsCreating(true);
      // console.log(values);
      const res = await fetch("/api/categories", {
        method: onEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create category");
      }

      toast.success(data.message || "Category created successfully");
      // console.log(data.data);

      setCategories((prev) => {
        const exists = prev.some((cat) => cat._id === data.data._id);
        if (exists) {
          return prev.map((cat) =>
            cat._id === data.data._id ? data.data : cat
          );
        }
        return [...prev, data.data];
      });
      setOpen(false);
    } catch (err: unknown) {
      const er = err as Error;
      toast.error(er.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete category");
      }

      // API returns remaining categories
      setCategories(data.categories);
      toast.success(data.message || "Category deleted successfully");
    } catch (err: unknown) {
      const er = err as Error;
      toast.error(er.message);
    }
  };

  return (
    <div className="max-w-7xl w-full mr-auto space-y-4 px-3 py-4 sm:px-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display'] tracking-wide">
            Categories
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your product categories
          </p>
        </div>
        <CategoryDialog
          open={open}
          setOpen={() => {
            setOpen(!open);
            if (onEdit) {
              setOnEdit(null);
            }
          }}
          mode={onEdit ? "edit" : "create"}
          initialValues={
            onEdit ?? { name: "", slug: "", image: null, description: "" }
          }
          onSubmit={(values) => {
            handleCreateCategory(values);
          }}
          isSubmitting={isCreating}
        />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search categories by name or slug..."
          className="pl-10 bg-background border-border"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories Table */}
      <Card className="border-border bg-background py-0 p-0 gap-0 rounded w-full">
        <CardHeader className="px-4 py-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>All Categories ({filteredCategories.length})</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0 w-full">
          {/* Responsive wrapper */}
          <div className="w-full overflow-x-auto">
            <Table className="min-w-full text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Image</TableHead>
                  <TableHead className="whitespace-nowrap">Name</TableHead>
                  <TableHead className="whitespace-nowrap">
                    Description
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Slug</TableHead>

                  <TableHead className="whitespace-nowrap">
                    Created At
                  </TableHead>
                  <TableHead className="text-right whitespace-nowrap">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredCategories.length ? (
                  filteredCategories.map((category: CategoryFormValues) => (
                    <TableRow key={category._id} className="space-x-0">
                      <TableCell className="w-10 h-10">
                        <Avatar className="w-10 h-10 rounded-md border border-primary">
                          <AvatarImage
                            src={category.image?.url || ""}
                            alt={category.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="rounded-md bg-muted">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>

                      <TableCell className="font-medium max-w-16 truncate">
                        {category.name}
                      </TableCell>
                      <TableCell className="w-26 max-w-40 truncate">
                        <span className="text-muted-foreground">
                          {category.description}
                        </span>
                      </TableCell>

                      <TableCell className="text-muted-foreground max-w-32">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <code className="bg-muted px-2 py-1 rounded text-xs truncate inline-block max-w-full">
                              {category.slug}
                            </code>
                          </TooltipTrigger>
                          <TooltipContent>{category.slug}</TooltipContent>
                        </Tooltip>
                      </TableCell>

                      <TableCell className="text-muted-foreground whitespace-nowrap">
                        {category.createdAt
                          ? new Date(category.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-primary hover:bg-primary/10"
                            onClick={() => {
                              setOnEdit(category);
                              setOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() =>
                              category._id && handleDeleteCategory(category._id)
                            }
                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="flex flex-col items-center gap-2 py-10">
                        <Search className="w-10 h-10 text-muted-foreground/50" />
                        <p className="text-muted-foreground">
                          No categories found
                        </p>
                        <p className="text-sm text-muted-foreground/70">
                          Try adjusting your search query
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
  );
}
