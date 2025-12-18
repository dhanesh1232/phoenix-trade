"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppFloatingButton = () => {
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
        <svg className="absolute inset-0 w-16 h-16" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-emerald-500"
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
            w-16 h-16 rounded-full flex items-center justify-center
            bg-emerald-600 text-white shadow-lg 
            hover:scale-110 transition-transform hover:bg-[#34d399] hover:text-[#064e3b]
          "
        >
          <FaWhatsapp size={28} />
        </span>
      </Link>
    </div>
  );
};
