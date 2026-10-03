import Link from "next/link";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
  variant?: "default" | "gradient";
  className?: string;
}

export function CtaSection({ 
  title = "Ready for a Cleaner Space?", 
  subtitle = "Book your professional cleaning service today and enjoy clear results.", 
  variant = "default", 
  className 
}: CtaSectionProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container-wide mx-auto px-4 sm:px-6">
        <div 
          className={cn(
            "relative overflow-hidden rounded-3xl p-8 md:p-16 text-center z-10 shadow-xl",
            variant === "gradient" 
              ? "bg-gradient-to-br from-primary to-secondary text-white" 
              : "bg-primary text-primary-foreground"
          )}
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-full h-full">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>
            <Sparkles className="absolute top-8 left-10 w-12 h-12" />
            <Sparkles className="absolute bottom-10 right-16 w-8 h-8" />
            <Sparkles className="absolute top-20 right-1/4 w-6 h-6" />
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto text-balance">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                variant="secondary"
                className="w-full sm:w-auto rounded-full font-semibold px-8 h-14 text-base bg-white text-slate-900 hover:bg-white/90"
              >
                <Link href="/book">Book a Cleaning</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className={cn(
                  "w-full sm:w-auto rounded-full font-semibold px-8 h-14 text-base",
                  "border-white text-white hover:bg-white hover:text-primary bg-transparent"
                )}
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
