"use client";

import { useState, useEffect } from "react";
import SessionLayout from "@/components/pages/admin/layout/main";
import { useSession } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession(); // ✅ status is a string
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // console.log({ session, status });
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const showSkeleton = isLoading || status === "loading"; // ✅ compare string with string

  if (showSkeleton) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-64 bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="p-4 md:p-6 space-y-4">
            <div className="h-8 md:h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4 md:mb-8" />
            <div className="grid grid-cols-2 md:block md:space-y-3 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 p-2 md:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  <div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 md:w-32 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="h-5 md:h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 md:w-48 animate-pulse" />
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                <div className="h-3 md:h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 md:w-24 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Dashboard content */}
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-3 md:mb-4 animate-pulse w-1/2" />
                  <div className="h-7 md:h-8 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-1/3 mb-3 md:mb-4" />
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
                </div>
              ))}
            </div>

            {/* Chart / list skeleton */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="h-5 md:h-6 bg-gray-200 dark:bg-gray-700 rounded w-40 md:w-64 mb-4 md:mb-6 animate-pulse" />
              <div className="space-y-2 md:space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 md:w-32 animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16 md:w-20 animate-pulse" />
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
