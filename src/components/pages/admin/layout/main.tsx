"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider, useSession } from "next-auth/react";
import { AppSidebar } from "./admin-sidebar";
import { AppHeader } from "./admin-header";

export default function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainLayout>{children}</MainLayout>
    </>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="w-full h-full">
          <AppHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    );
  }
  return <div className="w-full h-full">{children}</div>;
}
