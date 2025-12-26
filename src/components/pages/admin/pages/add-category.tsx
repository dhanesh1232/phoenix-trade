// components/admin/categories/category-dialog.tsx
"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, X } from "lucide-react";
import { ImageModal } from "@/components/pages/admin/layout/image-modal";
import { Textarea } from "@/components/ui/textarea";

export function CategoryDialog({
  open,
  setOpen,
  mode,
  initialValues,
  onSubmit,
  isSubmitting,
}: CategoryDialogProps) {
  const [name, setName] = React.useState<string>();
  const [slug, setSlug] = React.useState<string>();
  const [image, setImage] = React.useState<ImageFormat | null>();
  const [imageModal, setImageModal] = React.useState<boolean>(false);
  const [description, setDescription] = React.useState<string>();

  React.useEffect(() => {
    if (initialValues) {
      setName(initialValues.name);
      setSlug(initialValues.slug);
      setImage(initialValues.image || null);
      setDescription(initialValues.description);
    } else {
      setName("");
      setSlug("");
      setImage(null);
      setDescription("");
    }
  }, [initialValues]);

  // regenerate slug only while typing name in create mode
  const handleNameChange = (value: string) => {
    setName(value);
    if (mode === "create") {
      const s = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(s);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setSlug("");
    setImage(null);
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) {
      return;
    }
    const data = {
      name: name.trim(),
      slug: slug.trim(),
      image,
      description,
    };
    if (initialValues?._id) {
      (data as any)._id = initialValues._id;
    }
    onSubmit(data);
  };

  // --- computed flags ---

  const hasAllRequired =
    (name?.trim().length ?? 0) > 0 &&
    (slug?.trim().length ?? 0) > 0 &&
    (description?.trim().length ?? 0) > 0 &&
    (mode === "create" ? !!image : true); // require image only on create if you want

  const isSameAsInitial =
    !!initialValues &&
    name?.trim() === (initialValues.name ?? "").trim() &&
    slug?.trim() === (initialValues.slug ?? "").trim() &&
    description?.trim() === (initialValues.description ?? "").trim() &&
    (initialValues.image?.url ?? null) === (image?.url ?? null);

  const isSubmitDisabled =
    isSubmitting || !hasAllRequired || (mode === "edit" && isSameAsInitial);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 bg-background overflow-hidden zoom-in duration-200 animate-in">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
            <DialogTitle className="text-xl">
              {mode === "edit" ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>

          <div className="px-5 py-6 space-y-4">
            {/* Image picker */}
            <div className="space-y-2">
              <Label>Category Image</Label>
              {image ? (
                <div className="flex relative group items-center gap-4">
                  <Avatar className="w-full max-h-40 min-h-32 rounded-lg">
                    <AvatarImage
                      src={image.url}
                      alt="Preview"
                      className="object-cover"
                    />
                  </Avatar>
                  <Button
                    className="absolute group-hover:opacity-100 opacity-0 rounded-full right-2 top-2 z-10"
                    type="button"
                    variant="outline-destructive"
                    size="icon-xs"
                    aria-label="Remove image"
                    onClick={() => setImage(null)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ) : (
                <div className="w-full max-h-40 min-h-32 flex items-center justify-center border border-dashed rounded-md">
                  <ImageModal
                    trigger
                    open={imageModal}
                    setOpen={setImageModal}
                    onInsert={(images) => {
                      setImage(images[0]);
                    }}
                    className="h-32 max-h-40"
                  />
                </div>
              )}
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="category-name">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category-name"
                placeholder="e.g., Fresh Produce"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="category-description"
                placeholder="e.g., Locally sourced organic fruits and vegetables"
                className="font-mono text-sm"
                rows={3}
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="category-slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category-slug"
                className="font-mono text-sm"
                placeholder="fresh-produce"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                URL‑friendly version (auto‑generated, editable)
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 px-5 py-4 border-t border-border bg-muted/10">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitDisabled}>
              {mode === "edit" ? "Update Category" : "Create Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
