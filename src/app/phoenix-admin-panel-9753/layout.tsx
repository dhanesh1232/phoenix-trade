"use client";

import { useState, useEffect } from "react";
import SessionLayout from "@/components/pages/admin/layout/main";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with actual data fetch)
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-6 space-y-4">
            {/* Logo skeleton */}
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-8"></div>

            {/* Nav items skeleton */}
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header skeleton */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Dashboard content skeleton */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse w-3/4"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-1/2 mb-4"></div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>

            {/* Chart skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-6 animate-pulse"></div>
              <div className="space-y-3">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return <SessionLayout>{children}</SessionLayout>;
}
