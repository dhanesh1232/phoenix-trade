"use client";
import { useApp } from "@/context/handler";
import Image from "next/image";
import { useEffect, useState } from "react";

export const HeroBanner = () => {
  const [mounted, setMounted] = useState(false);

  // ✅ Standard pattern - ignore ESLint here
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative h-screen w-full overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-gray-800" />
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <div className="max-w-4xl text-center space-y-0 py-2 px-3 md:space-y-1 bg-linear-to-r from-transparent via-black/50 to-transparent backdrop-blur-[1px] rounded-md">
            <div className="h-10 sm:h-12 lg:h-14 bg-gray-700 rounded-md w-80 sm:w-96 lg:w-[32rem] mx-auto" />
            <div className="h-5 sm:h-6 lg:h-7 bg-gray-700 rounded-md w-60 sm:w-72 lg:w-80 mx-auto mt-2" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background media */}
      <MediaType />

      {/* Center content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <div className="max-w-4xl text-center space-y-0 py-2 px-3 md:space-y-1 bg-linear-to-r from-transparent via-black/50 to-transparent backdrop-blur-[1px] rounded-md">
          <h1
            className="
            text-3xl sm:text-4xl lg:text-5xl
            font-bold uppercase tracking-widest
            text-white
            font-['Playfair_Display']
          "
          >
            Phoenix International Trading
          </h1>

          <p
            className="
            text-sm sm:text-base md:text-lg lg:text-xl
            text-slate-200 tracking-wide
          "
          >
            Trusted Produce for Every Market
          </p>
        </div>
      </div>
    </section>
  );
};

function MediaType() {
  const { HeroPreview } = useApp();
  switch (HeroPreview) {
    case "gif":
      return (
        <Image
          src="/new_gif_template.gif"
          alt="Phoenix Trade Hub Hero Banner"
          unoptimized
          fill
        />
      );
    case "gif-slide":
      return;
    case "image":
      return;
    case "image-slide":
      return;
    case "video":
      return (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src="/video_banner_2.mp4" type="video/mp4" />
        </video>
      );
    case "video-slide":
      return;
    default:
      return null;
  }
}
