"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SECRET_ADMIN_PATH } from "@/lib/validators_client";

// Define custom labels for routes
const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  category: "Categories",
  products: "Products",
  enquiries: "Enquiries",
  profile: "Profile",
  settings: "Settings",
  orders: "Orders",
  customers: "Customers",
  analytics: "Analytics",
  // Add more custom labels as needed
};

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Remove the SECRET_ADMIN_PATH prefix from pathname
  const pathWithoutAdmin = pathname.replace(`/${SECRET_ADMIN_PATH}`, "");

  // Split pathname and filter out empty strings
  const segments = pathWithoutAdmin.split("/").filter((segment) => segment);

  // If we're on the dashboard page (just /admin with no additional segments)
  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-1.5">
              <Home className="h-3.5 w-3.5" />
              <span>Dashboard</span>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  // Build breadcrumb items
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${SECRET_ADMIN_PATH}/${segments
      .slice(0, index + 1)
      .join("/")}`;
    const isLast = index === segments.length - 1;

    // Get custom label or format the segment
    const label = routeLabels[segment] || formatSegment(segment);

    return {
      label,
      href,
      isLast,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home/Dashboard link */}
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/${SECRET_ADMIN_PATH}`}
            className="flex items-center gap-1.5"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbItems.map((item) => (
          <div key={item.href} className="flex items-center gap-2">
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              {item.isLast ? (
                <BreadcrumbPage className="font-medium">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Helper function to format segment names
function formatSegment(segment: string): string {
  // Check if it's a UUID or ID (common pattern)
  if (
    segment.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    )
  ) {
    return "Details";
  }

  // Check if it's a numeric ID
  if (/^\d+$/.test(segment)) {
    return "Details";
  }

  // Convert kebab-case or snake_case to Title Case
  return segment
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
