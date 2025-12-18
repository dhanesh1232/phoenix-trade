// Main layout component
import { ReactNode } from "react";
import Header from "./header";
import { AppProvider } from "@/context/handler";
import { Footer } from "./footer";
import { WhatsAppFloatingButton } from "../global/whatsapp-button";
import { WhatsAppFloatingV2 } from "../global/whatsapp-floating-v2";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <Header />
      <main className="min-h-screen z-0 bg-white text-black">{children}</main>
      <Footer />
      <WhatsAppFloatingButton />
      {/* <WhatsAppFloatingV2 /> */}
    </AppProvider>
  );
}
