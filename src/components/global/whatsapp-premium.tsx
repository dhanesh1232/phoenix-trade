"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { contact, message } from "@/lib/contact";

export const WhatsAppPremium = () => {
  const [glow, setGlow] = useState(false);

  // Glow after each circle loop
  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(true);
      setTimeout(() => setGlow(false), 1000);
    }, 5000); // must match SVG animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      <Link href={message(contact.phone)} target="_blank">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* --- OUTER ANIMATED RING (with padding gap) --- */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="#10B981" // Emerald 500
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="339" // 2πr for r=54
                strokeDashoffset="339"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="339;0"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* --- BUTTON (separate visual layer, clean padding) --- */}
          <motion.div
            animate={{
              boxShadow: glow
                ? "0 0 22px rgba(16,185,129,0.8)"
                : "0 0 0px rgba(0,0,0,0)",
              scale: glow ? 1.05 : 1,
              backgroundColor: glow ? "#059669" : "#25D366", // Dark emerald on glow
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="
              w-16 h-16 rounded-full 
              bg-emerald-500 flex items-center justify-center 
              shadow-lg text-white 
              transition-transform
            "
          >
            <FaWhatsapp size={28} />
          </motion.div>
        </div>
      </Link>
    </div>
  );
};
