import { HOW_IT_WORKS } from "@/lib/constants";
import { CalendarPlus, CheckCircle, Sparkles, ThumbsUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  CalendarPlus,
  CheckCircle,
  Sparkles,
  ThumbsUp
};

export function HowItWorks() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg text-balance">
            A simple, seamless process from booking to a sparkling clean space.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border hidden lg:block -translate-y-1/2" />
          <div className="absolute top-0 left-6 w-0.5 h-full bg-border lg:hidden" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {HOW_IT_WORKS.map((step, index) => {
              const Icon = iconMap[step.icon] || Sparkles;
              return (
                <div key={index} className="relative flex lg:flex-col gap-6 lg:gap-4 lg:items-center lg:text-center pl-16 lg:pl-0">
                  {/* Number Circle */}
                  <div className="absolute left-0 lg:left-1/2 top-0 lg:top-auto lg:-translate-x-1/2 lg:-translate-y-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold shadow-lg shadow-primary/20 z-10 ring-4 ring-background">
                    {index + 1}
                  </div>

                  <div className="lg:mt-8 flex flex-col items-start lg:items-center">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-[250px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
