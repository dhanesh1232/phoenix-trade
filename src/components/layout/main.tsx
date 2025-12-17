// Main layout component
import { ReactNode } from "react";
import Header from "./header";
import { AppProvider } from "@/context/handler";
import { Footer } from "./footer";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <Header />
      <main className="min-h-screen z-0 bg-white text-black">{children}</main>
      <Footer />
    </AppProvider>
  );
}
