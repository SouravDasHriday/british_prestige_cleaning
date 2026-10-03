import { TRUST_INDICATORS } from "@/lib/constants";
import { ShieldCheck, Star, Clock, ThumbsUp, Sparkles, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck,
  Star,
  Clock,
  ThumbsUp,
  Sparkles,
  Award
};

export function TrustBar() {
  return (
    <section className="bg-card border-y py-8">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {TRUST_INDICATORS.slice(0, 4).map((item, index) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
