// app/admin/media/page.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Upload,
  Trash2,
  Image as ImageIcon,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function MediaPage() {
  const [images, setImages] = useState<ImageFormat[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [folder, setFolder] = useState("phoenix");
  const [selectedImages, setSelectedImages] = useState(
    new Set<ImageFormat["id"]>()
  );

  // Filter images based on search
  const filteredImages = images.filter(
    (img) =>
      img?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img?.fileName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch images from server

  const fetchImages = useCallback(
    async (search = "", folderParam = "phoenix") => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          folder: folderParam,
          ...(search && { q: search }),
        });
        const res = await fetch(`/api/images?${params}`);
        const data = await res.json();
        setImages(data.data?.images || data.images || []);
      } catch (error) {
        toast.error("Failed to fetch images");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        e.target.value = "";
        toast.success("Image uploaded successfully");
        fetchImages(searchQuery, folder);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (fileId: ImageFormat["id"]) => {
    if (!confirm("Delete this image permanently?")) return;

    try {
      const res = await fetch(`/api/images?fileId=${fileId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Image deleted successfully");
        setImages((prev) => prev.filter((img) => img.id !== fileId));
        setSelectedImages((prev) => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const toggleSelect = (fileId: ImageFormat["id"]) => {
    setSelectedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  const bulkDelete = async () => {
    if (selectedImages.size === 0) return;
    if (!confirm(`Delete ${selectedImages.size} selected image(s)?`)) return;

    try {
      const res = await fetch("/api/images/bulk-delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileIds: Array.from(selectedImages) }),
      });

      if (res.ok) {
        toast.success(`Deleted ${selectedImages.size} images`);
        fetchImages(searchQuery, folder);
        setSelectedImages(new Set());
      } else {
        throw new Error("Bulk delete failed");
      }
    } catch (error) {
      toast.error("Bulk delete failed");
    }
  };

  const getUsageTooltip = (img: ImageFormat) => {
    if (!img.used || !img.usagePoints) return "Not used anywhere";

    const points: string[] = [];

    if (img.usagePoints.category)
      points.push(`Category (${img.usagePoints.category})`);

    if (img.usagePoints.productFeatured)
      points.push(`Product featured (${img.usagePoints.productFeatured})`);

    if (img.usagePoints.productGallery)
      points.push(`Product gallery (${img.usagePoints.productGallery})`);

    return `Used in:\n${points.join("\n")}`;
  };

  return (
    <div className="max-w-7xl w-full mr-auto space-y-6 p-3">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-['Playfair_Display'] tracking-wide">
            Media Library
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your ImageKit images ({filteredImages.length})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
          {selectedImages.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={bulkDelete}
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete {selectedImages.size}
            </Button>
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search images by name, filename, or URL..."
            className="pl-10 bg-background border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => fetchImages(searchQuery, folder)}
            disabled={loading}
            variant="outline"
            className="shrink-0"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Images Table */}
      <Card className="border-border bg-background rounded p-0 gap-0">
        <CardHeader className="px-2 py-1.5">
          <CardTitle className="text-base">
            All Images ({filteredImages.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-full text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
                  <TableHead className="whitespace-nowrap">Preview</TableHead>
                  <TableHead className="whitespace-nowrap">Name</TableHead>
                  <TableHead className="whitespace-nowrap">Filename</TableHead>
                  <TableHead className="whitespace-nowrap">Usage</TableHead>
                  <TableHead className="text-right whitespace-nowrap">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filteredImages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="flex flex-col items-center gap-2 py-12">
                        <ImageIcon className="w-10 h-10 text-muted-foreground/50" />
                        <p className="text-muted-foreground">No images found</p>
                        <p className="text-sm text-muted-foreground/70">
                          Try adjusting your search query or upload new images
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredImages.map((image: ImageFormat) => (
                    <TableRow key={image.id} className="hover:bg-accent/50">
                      <TableCell className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedImages.has(image.id)}
                          onChange={() => toggleSelect(image.id)}
                          className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </TableCell>
                      <TableCell className="w-16">
                        <Avatar className="w-12 h-12 rounded-md border">
                          <AvatarImage
                            src={image.thumbnail || image.url}
                            alt={image.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-muted">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell
                        className="font-medium max-w-[200px] truncate"
                        title={image.name}
                      >
                        {image.name}
                      </TableCell>
                      <TableCell
                        className="max-w-[150px] truncate capitalize"
                        title={image.fileName}
                      >
                        {image.fileName || image?.name?.split("/").pop()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {image.used ? (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-yellow-500/10 text-yellow-600 cursor-help"
                            title={getUsageTooltip(image)}
                          >
                            Used ({image.usageCount})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 text-xs rounded bg-green-500/10 text-green-600">
                            Free
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(image.id)}
                          className="text-destructive hover:bg-destructive/10 h-8 w-8"
                          title="Delete image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
