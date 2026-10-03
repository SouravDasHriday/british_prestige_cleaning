import { Wrench, Leaf, GraduationCap, Clock, Award, PoundSterling } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

const REASONS = [
  {
    icon: Wrench,
    title: "Professional Equipment",
    description: "We use industrial-grade cleaning equipment to ensure a deep and thorough clean every time."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly Products",
    description: "Safe for your family, pets, and the environment. We use premium eco-friendly cleaning solutions."
  },
  {
    icon: GraduationCap,
    title: "Fully Trained",
    description: "Our staff undergo rigorous training and background checks before they enter your property."
  },
  {
    icon: Clock,
    title: "Reliable & Punctual",
    description: "We respect your time. Our cleaners arrive on schedule and complete the job efficiently."
  },
  {
    icon: Award,
    title: "Satisfaction Guarantee",
    description: "Not happy with the clean? Let us know within 24 hours and we'll re-clean the area for free."
  },
  {
    icon: PoundSterling,
    title: "Competitive Pricing",
    description: "Premium service without the premium price tag. Transparent pricing with no hidden fees."
  }
];

export function WhyUs() {
  return (
    <section className="section-padding bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose {BUSINESS.name}?</h2>
          <p className="text-muted-foreground text-lg text-balance">
            We don't just clean; we care for your space. Here is what sets us apart from the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="flex gap-4 items-start group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="w-6 h-6 text-primary group-hover:text-current" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
