"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (path.startsWith("/phoenix-admin-panel-9753") || path === "/not-found") {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "fixed left-1/2 bottom-4 z-40 -translate-x-1/2 rounded-full bg-primary text-primary-foreground shadow-md hover:shadow-lg",
            "flex items-center justify-center gap-1.5 px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase",
            "backdrop-blur-sm border border-primary/40 cursor-pointer hover:bg-primary/50"
          )}
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
