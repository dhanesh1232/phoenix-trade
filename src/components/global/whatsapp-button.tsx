"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppFloatingButton = () => {
  const path = usePathname();

  if (path.startsWith("/phoenix-admin-panel-9753") || path === "/not-found") {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="https://wa.me/917382675969"
        target="_blank"
        className="relative block"
      >
        {/* Tooltip on the left */}
        <span className="absolute pointer-events-none right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 text-sm text-white bg-gray-800 rounded-md shadow-lg whitespace-nowrap before:content-[''] before:absolute before:left-full before:top-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:border-4 before:border-transparent before:border-l-gray-800">
          Chat with us
        </span>

        {/* Animated border circle */}
        <svg
          className="absolute inset-0 w-10 h-10 md:w-14 md:h-14"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-accent"
            strokeWidth="5"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="283"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="283;0"
              dur="5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <span
          className="z-10
            w-10 md:w-14 h-10 md:h-14 rounded-full flex items-center justify-center
            bg-primary text-primary-foreground shadow-lg 
            hover:scale-110 transition-transform hover:bg-[#34d399] hover:text-[#064e3b]
          "
        >
          <FaWhatsapp className="text-xl md:text-2xl" />
        </span>
      </Link>
    </div>
  );
};
