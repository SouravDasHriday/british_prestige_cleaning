import { SERVICES as defaultServices, BUSINESS } from "@/lib/constants";
import { getPriceDisplay } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sparkles, Building2, Droplets, Waves, Home, Key, Briefcase, LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Building2,
  Droplets,
  Waves,
  Home,
  Key,
  Briefcase
};

export function ServicesPreview({ services }: { services?: any }) {
  const displayServices = Array.isArray(services) && services.length > 0 ? services : defaultServices;
  
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Premium Services</h2>
          <p className="text-muted-foreground text-lg text-balance">
            Exceptional cleaning solutions tailored to your unique needs. We deliver pristine results for every environment.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {displayServices.slice(0, 3).map((service: any) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const bgImage = service.image_url && service.image_url !== "/images/hero-cleaning-v4.jpg"
              ? service.image_url 
              : `/images/service-${service.slug || service.id}.jpg`;
            
            return (
              <div key={service.id} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.35rem)] flex justify-center">
                <Link 
                  href={`/services/${service.id}`} 
                  className="w-full group relative flex flex-col h-[400px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-900"
                >
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 w-full h-full">
                  <Image 
                    src={bgImage} 
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75"
                  />
                  {/* Dark Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Content Area */}
                <div className="relative z-10 flex flex-col h-full justify-end p-6 md:p-8 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 border border-white/20">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-white">{service.name}</h3>
                  <p className="text-white/80 line-clamp-2 mb-6">
                    {service.shortDescription}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-semibold text-lg text-white">
                      Request a Quote
                    </span>
                    <span className="inline-flex items-center text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                      Learn more
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
                </Link>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="rounded-full px-8" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
