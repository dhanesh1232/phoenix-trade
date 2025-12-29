// app/phoenix-admin-panel-9753/products/[id]/page.tsx
"use client";

import { AddProductPage } from "@/components/pages/admin/pages/products/add-product";
import { useParams } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";

export default function Page() {
  const [loading, setLoading] = React.useState<boolean>();
  const [product, setProduct] = React.useState<ProductFormValues>();
  const params = useParams();

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      // console.log(data.data.product);
      setProduct(data.data.product);
    } catch (err: unknown) {
      const e = err as Error;
      console.log(e.message);
      toast.error(e.message || `Unable to access ${id}, please try again!`);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (params.id) {
      fetchProduct(Array.isArray(params.id) ? params.id[0] : params.id);
    }
  }, [params.id]);
  return (
    <AddProductPage
      loading={loading}
      initialProduct={product}
      onRefetchProduct={fetchProduct}
    />
  );
}
