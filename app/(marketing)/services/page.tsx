import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Sparkles, ShieldCheck, Leaf, Users2, Clock, Calculator } from "lucide-react";
import { prisma } from "@/lib/db";
import { getServices } from "@/app/actions/booking";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Our Services | ${BUSINESS.name}`,
  description: "Professional cleaning services across Birmingham and the West Midlands. We offer comprehensive tailored cleaning solutions.",
};

export default async function ServicesPage() {
  const displayServices = await getServices();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "provider": {
      "@type": "LocalBusiness",
      "name": BUSINESS.name,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": BUSINESS.city,
        "addressRegion": BUSINESS.region,
        "addressCountry": BUSINESS.country,
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cleaning Services",
      "itemListElement": displayServices.map((service: any, index: number) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description || service.shortDescription || ""
        },
        "position": index + 1
      }))
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Script
        id="services-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Header matching reference banner */}
      <section className="w-full relative pt-32 lg:pt-40 pb-20 lg:pb-32 min-h-[50vh] flex flex-col justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
           <Image src="/images/hero-services-new.jpg" alt="Background" fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/70 to-transparent" />
        
        <div className="container-wide mx-auto relative z-10 px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              Cleaning Solutions for Every Need
            </h1>
            <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-medium">
              From residential homes and educational settings to healthcare facilities and corporate offices, we deliver tailored cleaning solutions designed around the unique needs of your space.
            </p>
          </div>
        </div>
      </section>

      {/* Circular Services Grid */}
      <section className="w-full py-20 bg-white">
        <div className="container-wide mx-auto">
          <div className="flex flex-wrap justify-center gap-y-16 gap-x-8 max-w-5xl mx-auto">
            {displayServices.map((service: any) => {
              const bgImage = (service.image_url && service.image_url !== "/images/hero-cleaning-v4.jpg") 
                ? service.image_url 
                : `/images/service-${service.slug || service.id}.jpg`;
              return (
                <div key={service.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex justify-center">
                  <Link 
                    href={`/services/${service.id}`} 
                    className="flex flex-col items-center group cursor-pointer w-full"
                  >
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 border-4 border-transparent group-hover:border-primary/20 transition-all duration-300 shadow-md group-hover:shadow-xl">
                    <Image
                      src={bgImage}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Light overlay on hover */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
                  </div>
                  
                  <div className="bg-primary text-white font-medium text-lg py-3 px-6 shadow-md text-center w-full max-w-[280px] transition-all duration-300 group-hover:bg-primary/90 group-hover:-translate-y-1">
                    {service.name}
                  </div>
                </Link>
              </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Dark Testimonial/Quote Banner */}
      <section className="w-full bg-[#2a2a2a] text-white py-20 mt-8 rounded-sm">
        <div className="container-tight mx-auto text-center px-6">
          <p className="text-lg md:text-xl italic font-light max-w-4xl mx-auto leading-relaxed">
            "{BUSINESS.name} strive to provide a great level of service, with regular audits of their staff and their performance against the contracted scope of work. Staff are courteous and behave responsibly. Communication at all levels is excellent and holiday/absence cover is provided wherever possible."
          </p>
        </div>
      </section>

      {/* Why Choose Us Icon Grid */}
      <section className="w-full py-24 bg-white">
        <div className="container-wide mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-16">Why People Choose {BUSINESS.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-5">
              <Sparkles className="w-8 h-8 text-primary shrink-0 stroke-[1.5]" />
              <span className="text-gray-800 font-medium text-lg">Consistent Standards</span>
            </div>
            <div className="flex items-center gap-5">
              <ShieldCheck className="w-8 h-8 text-primary shrink-0 stroke-[1.5]" />
              <span className="text-gray-800 font-medium text-lg">Fully Insured & Accredited</span>
            </div>
            <div className="flex items-center gap-5">
              <Leaf className="w-8 h-8 text-primary shrink-0 stroke-[1.5]" />
              <span className="text-gray-800 font-medium text-lg">Eco-friendly Focus</span>
            </div>
            <div className="flex items-center gap-5">
              <Users2 className="w-8 h-8 text-primary shrink-0 stroke-[1.5]" />
              <span className="text-gray-800 font-medium text-lg">Dedicated Local Management</span>
            </div>
            <div className="flex items-center gap-5">
              <Clock className="w-8 h-8 text-primary shrink-0 stroke-[1.5]" />
              <span className="text-gray-800 font-medium text-lg">Bespoke Service Delivered On Time</span>
            </div>
            <div className="flex items-center gap-5">
              <Calculator className="w-8 h-8 text-primary shrink-0 stroke-[1.5]" />
              <span className="text-gray-800 font-medium text-lg">Fair & Transparent Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Information Box */}
      <section className="w-full pb-24 bg-white px-6">
        <div className="max-w-4xl mx-auto bg-[#9a9a9a] rounded-[32px] p-10 md:p-14 text-white text-center shadow-lg">
          <h3 className="text-3xl font-bold mb-6">Our Services</h3>
          <p className="text-base md:text-lg leading-relaxed font-light">
            Every client has different priorities when it comes to cleaning. The requirements of a busy office will be very different from those of a private home, healthcare setting or warehouse, which is why we never take a one-size-fits-all approach. We take the time to understand how your premises operate, the standards you need to maintain and the areas that matter most to you. From there, we create a tailored cleaning solution built around your schedule, budget and unique requirements.
          </p>
        </div>
      </section>

    </main>
  );
}
