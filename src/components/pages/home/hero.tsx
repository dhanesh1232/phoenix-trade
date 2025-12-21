"use client";
import { useApp } from "@/context/handler";
import Image from "next/image";

export const HeroBanner = () => {
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
          poster="/video_poster.png"
          className="w-full h-full object-cover"
        >
          <source src="/video_banner_2_optimized.mp4" type="video/mp4" />
        </video>
      );
    case "video-slide":
      return;
    default:
      return null;
  }
}
