"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  return (
    <div className="max-w-6xl w-full mx-auto space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-['Playfair_Display'] tracking-wide">
          Products
        </h1>

        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          + Add Product
        </Button>
      </div>

      {/* Products Table */}
      <Card className="border border-border bg-background">
        <CardHeader>
          <CardTitle className="text-lg">All Products</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {/* Static placeholder */}
                <tr>
                  <td className="p-3">Fresh Banana</td>
                  <td className="p-3">Fresh Produce</td>
                  <td className="p-3">
                    <Badge className="bg-emerald-600 text-white">Active</Badge>
                  </td>
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
                  <td className="p-3">Vannamei Shrimp</td>
                  <td className="p-3">Marine Products</td>
                  <td className="p-3">
                    <Badge className="bg-gray-500 text-white">Inactive</Badge>
                  </td>
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
    </div>
  );
}
