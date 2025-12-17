"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
};

type Phase = "menu" | "close";

export function MenuMorphIcon({ open }: Props) {
  const [phase, setPhase] = useState<Phase>("menu");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (open) {
      // ☰ → –
      // Phase change scheduled via setTimeout to avoid synchronous setState in effect

      // – → ✕
      timer = setTimeout(() => {
        setPhase("close");
      }, 50);
    } else {
      // ✕ → –
      // Phase change scheduled via setTimeout to avoid synchronous setState in effect

      // – → ☰
      timer = setTimeout(() => {
        setPhase("menu");
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* TOP LINE */}
      <motion.line
        x1="3"
        x2="21"
        variants={{
          menu: { y1: 6, y2: 6, rotate: 0 },
          close: { y1: 12, y2: 12, rotate: 45 },
        }}
        initial={phase}
        animate={phase}
        transition={{ duration: 0.25 }}
      />

      {/* MIDDLE LINE */}
      <motion.line
        x1="3"
        x2="21"
        variants={{
          menu: { y1: 12, y2: 12, opacity: 1, scaleX: 1 },
          close: { y1: 12, y2: 12, opacity: 0, scaleX: 0 },
        }}
        animate={phase}
        transition={{ duration: 0.2 }}
      />

      {/* BOTTOM LINE */}
      <motion.line
        x1="3"
        x2="21"
        variants={{
          menu: { y1: 18, y2: 18, rotate: 0 },
          close: { y1: 12, y2: 12, rotate: -45 },
        }}
        animate={phase}
        transition={{ duration: 0.25 }}
      />
    </motion.svg>
  );
}
