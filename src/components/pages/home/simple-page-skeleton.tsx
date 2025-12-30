"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SimplePageSkeleton() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Header */}
      <div className="h-20 flex items-center px-6">
        <Skeleton className="h-6 w-40 rounded" />
      </div>

      {/* Hero */}
      <section className="h-screen w-full bg-muted/40 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <Skeleton className="h-10 w-80 rounded mx-auto" />
          <Skeleton className="h-5 w-60 rounded mx-auto" />
        </div>
      </section>

      {/* Content blocks */}
      <main className="max-w-7xl mx-auto px-4 py-20 space-y-20">
        {Array.from({ length: 3 }).map((_, i) => (
          <section key={i} className="space-y-6">
            <Skeleton className="h-8 w-64 rounded" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-56 rounded-lg" />
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="border-t border-border p-8 space-y-3">
        <Skeleton className="h-4 w-48 rounded" />
        <Skeleton className="h-4 w-32 rounded" />
      </footer>
    </div>
  );
}
