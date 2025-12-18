"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { navLinks } from "@/lib/static";
import { useApp } from "@/context/handler";
import { MenuMorphIcon } from "./svg/menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Header() {
  const { menuOpen, setMenuOpen } = useApp();
  const [scrolled, setScrolled] = React.useState(false);
  const path = usePathname();

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // run once on mount

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          path === "/" ? "fixed" : "sticky",
          "left-0 right-0 top-0 z-50 w-full border-b transition-all duration-300",
          scrolled || menuOpen
            ? "bg-background backdrop-blur supports-backdrop-filter:bg-background"
            : "bg-transparent",
          "text-foreground"
        )}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <LogoBlock />

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList className="gap-4">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.label}>
                    {!link.subPages ? (
                      <NavigationMenuLink
                        href={link.href}
                        className={`px-2 py-1 ${
                          path === link.href
                            ? "nav-link-active text-primary"
                            : "nav-link"
                        } text-sm font-medium tracking-wide transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                      >
                        {link.label}
                      </NavigationMenuLink>
                    ) : (
                      <>
                        <NavigationMenuTrigger
                          className={`px-2 ${
                            path === link.href || path.startsWith(link.href)
                              ? "nav-link-active text-primary"
                              : "nav-link"
                          } cursor-pointer py-0 nav-link text-sm font-medium tracking-wide transition-colors bg-transparent hover:text-primary`}
                        >
                          {link.label}
                        </NavigationMenuTrigger>

                        <NavigationMenuContent className="bg-background rounded-lg shadow-lg">
                          <ul className="w-72 py-2 space-y-1.5">
                            {link.subPages.map((sub) => (
                              <li key={sub.href}>
                                <NavigationMenuLink
                                  href={sub.href}
                                  className={`group block px-4 py-2 text-sm ease-in-out duration-300 transition-colors ${
                                    path === sub.href
                                      ? "bg-primary text-primary-foreground"
                                      : "hover:bg-primary/10 focus:bg-primary/10 hover:text-primary"
                                  } `}
                                >
                                  <span className="flex items-center justify-between">
                                    <span>{sub.label}</span>

                                    <ChevronRight
                                      className={`h-4 w-4 transition-all duration-300 ${
                                        path === sub.href
                                          ? "translate-x-0 opacity-100 text-primary-foreground animate-pulse"
                                          : "opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 group-hover:text-primary"
                                      } `}
                                    />
                                  </span>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-1 hover:bg-primary/75 hover:focus:bg-primary/80 transform transition-color cursor-pointer ease-in-out duration-200 hover:text-primary-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <MenuMorphIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function LogoBlock() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Phoenix International Trading"
        width={40}
        height={40}
        priority
      />
      <span className="-mb-1 -ml-2 text-sm font-bold uppercase tracking-[0.22em]">
        Pho<span className="text-primary">e</span>nix
      </span>
    </Link>
  );
}

function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const path = usePathname();
  const [active, setActive] = React.useState<string | null>(null);

  const toggle = (href: string) => {
    setActive((prev) => (prev === href ? null : href));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-16 right-0 z-50 h-[calc(100vh-4rem)] w-[75%] sm:w-full sm:max-w-sm bg-background md:hidden shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 240, damping: 28 }}
          >
            <nav className="px-3 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {/* Simple link */}
                  {!link.subPages ? (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`
                        block rounded-md
                        px-3 py-2
                        text-base
                        transition-colors
                       ${
                         path === link.href
                           ? "bg-primary text-primary-foreground"
                           : "hover:bg-primary hover:text-primary-foreground"
                       }
                      `}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <>
                      {/* Parent toggle */}
                      <button
                        type="button"
                        onClick={() => toggle(link.href)}
                        className={`
                          flex w-full items-center justify-between
                          rounded-md
                          px-3 py-2.5
                          text-xs font-semibold uppercase tracking-widest
                          transition-colors cursor-pointer
                          
                          ${
                            path === link.href || path.startsWith(link.href)
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-primary hover:text-primary-foreground"
                          }
                        `}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-300",
                            active === link.href && "rotate-180"
                          )}
                        />
                      </button>

                      {/* Sub navigation */}
                      <AnimatePresence initial={false}>
                        {active === link.href && (
                          <motion.div
                            className="pl-3 mt-1.5 overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="py-1 space-y-1 pl-0.5 border-l-[3px] border-emerald-500">
                              {link.subPages.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={onClose}
                                  className={`
                                    block rounded-md
                                    px-3 py-1.5
                                    text-sm
                                    transition-colors
                                    ${
                                      path === sub.href
                                        ? "bg-primary/85 text-primary-foreground"
                                        : "hover:bg-primary/10 focus:bg-primary/10 hover:text-primary"
                                    }
                                  `}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
