"use client";
// Main layout component
import { ReactNode } from "react";
import Header from "./header";
import { AppProvider } from "@/context/handler";
import { Footer } from "./footer";
import { WhatsAppFloatingButton } from "../global/whatsapp-button";
import { WhatsAppFloatingV2 } from "../global/whatsapp-floating-v2";
import { Toaster } from "../ui/sonner";
import { SessionProvider } from "next-auth/react";
import { BackToTop } from "../global/back-to-top";
import { WhatsappDialogForm } from "../global/whatsapp-form";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider>
        <Header />
        <main className="min-h-screen z-0 bg-background text-foreground">
          {children}
        </main>
        <Footer />
        <Toaster position="top-right" />
        <WhatsAppFloatingButton />
        {/* <WhatsAppFloatingV2 /> */}
        <BackToTop />
        <WhatsappDialogForm />
      </AppProvider>
    </SessionProvider>
  );
}
