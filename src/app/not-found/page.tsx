import Link from "next/link";

export default function CustomNotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center bg-background text-foreground">
      {/* Icon Circle */}
      <div className="lg:h-24 lg:w-24 h-16 w-16 rounded-full border-4 border-primary/40 flex items-center justify-center mb-8 animate-pulse">
        <span className="text-3xl lg:text-5xl font-light text-primary">!</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-['Playfair_Display'] font-semibold tracking-wide">
        Page Not Found
      </h1>

      {/* Subtitle */}
      <p className="mt-2 max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
        The page you’re trying to reach doesn’t exist or may have been moved.
      </p>

      {/* Divider */}
      <div className="h-0.5 w-16 bg-primary/70 mt-8 mb-6 rounded-full" />

      {/* CTA Button */}
      <Link
        href="/"
        className="
          relative inline-block mt-2 px-8 py-3
          text-sm font-medium uppercase tracking-wide
          text-foreground rounded-md overflow-hidden
          border border-primary/40
          transition-all duration-300 group
        "
      >
        <span className="relative z-10 group-hover:text-primary-foreground ease-in-out duration-1000 transform transition-transform">
          Go Back Home
        </span>

        {/* Sweep Effect */}
        <span
          className="
            absolute inset-0 bg-primary -translate-x-full
            group-hover:translate-x-0 transition-transform duration-500 ease-in-out
          "
        />
      </Link>

      {/* Extra Hint */}
      <p className="mt-10 text-xs text-muted-foreground">
        Phoenix International Trading © {new Date().getFullYear()}
      </p>
    </section>
  );
}
