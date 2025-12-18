"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export const WhatsAppFloatingV2 = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative flex flex-col items-center justify-center">
        {/* Radial Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute -top-32 right-0 space-y-3"
            >
              {/* Call */}
              <FloatingMiniButton
                href="tel:+91XXXXXXXXXX"
                icon={<FaPhoneAlt size={18} />}
                label="Call"
              />

              {/* Email */}
              <FloatingMiniButton
                href="mailto:info@phoenixinternational.com"
                icon={<FaEnvelope size={18} />}
                label="Email"
              />

              {/* WhatsApp */}
              <FloatingMiniButton
                href="https://wa.me/91XXXXXXXXXX"
                icon={<FaWhatsapp size={18} />}
                label="Chat"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="
            relative w-16 h-16 rounded-full 
            bg-emerald-500 text-white flex items-center justify-center shadow-xl
          "
        >
          {/* Sweep Ring */}
          <svg
            className="absolute w-20 h-20 -top-2 -left-2"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="#34d399"
              strokeWidth="4"
              fill="none"
              strokeDasharray="290"
              strokeDashoffset="290"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="290;0"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* Outer Orbit Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="w-20 h-20 rounded-full border border-emerald-600/50" />
          </motion.div>

          {/* Ripple Pulse */}
          <motion.div
            className="absolute w-full h-full rounded-full bg-emerald-500"
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeOut" }}
          />

          {/* WhatsApp Icon */}
          <FaWhatsapp size={28} className="relative z-20" />
        </motion.button>
      </div>
    </div>
  );
};

const FloatingMiniButton = ({ href, icon, label }: any) => (
  <motion.div
    whileHover={{ scale: 1.08 }}
    className="flex items-center gap-3 px-4 py-2 bg-black/80 text-white rounded-full shadow-lg backdrop-blur
               hover:bg-emerald-600 transition-colors"
  >
    <Link href={href} target="_blank" className="flex items-center gap-3">
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  </motion.div>
);
