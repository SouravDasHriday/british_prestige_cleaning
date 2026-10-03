"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BUSINESS, TRUST_INDICATORS } from "@/lib/constants";
import { ShieldCheck, Star, Clock, ThumbsUp, Sparkles, ChevronDown, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Shield: ShieldCheck,
  Star,
  Clock,
  ThumbsUp,
  Sparkles,
  Leaf: Sparkles,
  CalendarCheck: Clock,
  BadgePoundSterling: Star,
};

export function Hero({ headline, subtitle }: { headline?: string, subtitle?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse headline
  const defaultHeadline1 = "Professional Cleaning";
  const defaultHeadline2 = "Services You Can Trust.";
  
  let hl1 = defaultHeadline1;
  let hl2 = defaultHeadline2;
  
  if (headline) {
    const parts = headline.split('.');
    hl1 = parts[0] ? parts[0].trim() : headline;
    hl2 = parts[1] ? parts[1].trim() + '.' : '';
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-interior.jpg"
          alt="Beautifully cleaned luxury interior"
          fill
          className="object-cover"
          quality={95}
          priority
          sizes="100vw"
        />
        {/* Refined gradient overlay: left-heavy for text readability, light on right to show image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a12]/85 via-[#0a1a12]/60 to-transparent" />
        {/* Bottom gradient for smooth section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent" />
      </div>

      {/* ── Main Content ── */}
      <div className="container-wide relative z-10 px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl lg:max-w-3xl">

          {/* Trust Badge Strip */}
          <div className={cn(
            "flex items-center gap-3 mb-8 transition-all duration-700 delay-200",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white/90 text-sm font-medium tracking-wide">Trusted Across London &amp; Kent</span>
            </div>
          </div>

          {/* Headline */}
          <div className={cn(
            "transition-all duration-1000 delay-300",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              <span className="block">{hl1}</span>
              {hl2 && (
                <span className="block mt-2 text-emerald-400">
                  {hl2}
                </span>
              )}
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className={cn(
            "transition-all duration-1000 delay-500",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl mb-10">
              {subtitle || "Experience the difference with our expert cleaning team. We provide top-quality residential and commercial cleaning services tailored to your needs."}
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-1000 delay-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            <Button size="lg" className="group text-base md:text-lg px-8 py-7 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:-translate-y-0.5" asChild>
              <Link href="/book">
                Book a Cleaning
                <ChevronDown className="ml-2 w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" className="group text-base md:text-lg px-8 py-7 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 hover:-translate-y-0.5" asChild>
              <a href={`tel:${BUSINESS.phone}`}>
                <Phone className="mr-2 w-4 h-4" />
                {BUSINESS.phone}
              </a>
            </Button>
          </div>

          {/* Trust Indicators Row */}
          <div className={cn(
            "flex flex-wrap gap-6 transition-all duration-1000 delay-1000",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}>
            {TRUST_INDICATORS.map((indicator, index) => {
              const Icon = iconMap[indicator.icon] || ShieldCheck;
              return (
                <div key={index} className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/70 font-medium">{indicator.title}</span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className={cn(
        "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-[1200ms]",
        mounted ? "opacity-60" : "opacity-0"
      )}>
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/50" />
        </div>
      </div>
    </section>
  );
}
