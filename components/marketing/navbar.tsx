"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, Phone } from "lucide-react";

import { BUSINESS, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

export function Navbar({ user }: { user?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-gray-200 shadow-md h-16 md:h-20"
          : "bg-transparent border-transparent h-20 md:h-24"
      )}
    >
      <div className="container-wide h-full mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 lg:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setIsOpen(false)}>
          <Image
            src="/logo-v2.png"
            alt={`${BUSINESS.name} Logo`}
            width={56}
            height={56}
            className="rounded-full shadow-md ring-2 ring-primary/20 group-hover:ring-primary/40 group-hover:scale-105 transition-all duration-300 bg-white/10"
            style={{ imageRendering: 'auto' }}
            quality={100}
            priority
          />
          <div className="hidden md:flex flex-col justify-center leading-none">
            <span className={cn("text-[15px] lg:text-base font-bold tracking-wide uppercase transition-colors", isScrolled ? "text-gray-900" : "text-white")}>British Prestige</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={cn("text-[11px] lg:text-xs font-medium tracking-[0.15em] uppercase transition-colors", isScrolled ? "text-gray-500" : "text-gray-200")}>Cleaning Solutions</span>
              <span className={cn("text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded transition-colors", isScrolled ? "text-primary bg-primary/10" : "text-white bg-white/20")}>BPCS</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5 justify-center flex-1">
          {NAV_LINKS?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-all relative whitespace-nowrap after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full hover:text-primary",
                isScrolled 
                  ? (pathname === link.href ? "text-primary after:w-full" : "text-gray-700")
                  : (pathname === link.href ? "text-primary after:w-full" : "text-white/90")
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div className={cn("hidden xl:flex items-center gap-1.5 text-sm font-medium mr-1 xl:mr-3 whitespace-nowrap transition-colors", isScrolled ? "text-muted-foreground" : "text-white/90")}>
            <Phone className={cn("w-4 h-4", isScrolled ? "text-primary" : "text-white")} />
            <a href={`tel:${BUSINESS.phone}`} className="hover:opacity-80 transition-opacity">{BUSINESS.phone}</a>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 xl:gap-4">
            {user ? (
              <Link href={user.role === 'ADMIN' ? "/admin" : "/dashboard"} className={cn("text-sm font-medium transition-colors flex items-center gap-2 whitespace-nowrap", isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/90 hover:text-white")}>
                <span className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0 transition-colors", isScrolled ? "bg-primary/10 text-primary" : "bg-white/20 text-white")}>
                  {user.name?.charAt(0) || 'U'}
                </span>
                <span className="hidden md:inline-block">Dashboard</span>
              </Link>
            ) : (
              <Link href="/login" className={cn("text-sm font-medium transition-colors whitespace-nowrap", isScrolled ? "text-muted-foreground hover:text-primary" : "text-white/90 hover:text-white")}>
                Log in
              </Link>
            )}
            <Button asChild className={cn("shadow-md transition-all hover:shadow-lg rounded-full px-5 xl:px-6 whitespace-nowrap shrink-0", isScrolled ? "bg-primary hover:bg-primary/90 text-primary-foreground" : "bg-white text-primary hover:bg-gray-100")}>
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu" className={cn("transition-colors", isScrolled ? "text-slate-700 hover:text-primary" : "text-white hover:text-white/80 hover:bg-white/10")}>
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm sm:max-w-md flex flex-col pt-16">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6">
                {NAV_LINKS?.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-4 pb-8">
                <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-lg">{BUSINESS.phone}</span>
                </a>
                {user ? (
                  <Button asChild size="lg" variant="outline" className="w-full rounded-full text-lg h-14">
                    <Link href={user.role === 'ADMIN' ? "/admin" : "/dashboard"} onClick={() => setIsOpen(false)}>Dashboard ({user.name || 'User'})</Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" variant="outline" className="w-full rounded-full text-lg h-14">
                    <Link href="/login" onClick={() => setIsOpen(false)}>Log in</Link>
                  </Button>
                )}
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-lg h-14">
                  <Link href="/book" onClick={() => setIsOpen(false)}>Book Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
