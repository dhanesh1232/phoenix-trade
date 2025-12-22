"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CategoriesPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-5xl w-full mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-['Playfair_Display'] tracking-wide">
          Categories
        </h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <Card className="border-border bg-background">
        <CardHeader>
          <CardTitle className="text-lg">All Categories</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Slug</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {/* Static Placeholder */}
                <tr>
                  <td className="p-3">Fresh Produce</td>
                  <td className="p-3">fresh-produce</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" className="text-primary">
                      Edit
                    </Button>
                    <Button variant="ghost" className="text-red-500">
                      Delete
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3">Marine Products</td>
                  <td className="p-3">marine-products</td>
                  <td className="p-3 text-right">
                    <Button variant="ghost" className="text-primary">
                      Edit
                    </Button>
                    <Button variant="ghost" className="text-red-500">
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Category Popup */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-background border-border">
            <CardHeader>
              <CardTitle>Add Category</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category Name</label>
                <Input className="mt-1 bg-background border-border" />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary text-primary-foreground">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
