import { Metadata } from "next";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { getPriceDisplay } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Leaf, 
  Award, 
  MessageCircle, 
  ChevronRight,
  Sparkles,
  ClipboardCheck,
  Zap,
  ThumbsUp
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";
import { prisma } from "@/lib/db";

const SERVICE_CONTENT_EXTRAS: Record<string, any> = {
  "custom-cleaning": {
    customQuoteTitle: "Tell Us What You Need",
    customQuoteText: "Have a cleaning requirement that doesn't fit into one of our standard services? Tell us what you need, and we'll work with you to create a cleaning solution tailored to your property.",
    customQuoteBtn: "Request Custom Quote →",
    finalCtaTitle: "Have a Specific Cleaning Requirement?",
    finalCtaText: "Tell us what you need and let our team create a cleaning solution around you.",
    finalCtaBtn: "Request Your Custom Quote →"
  },
  "office-cleaning": {
    customQuoteTitle: "Cleaning Solutions Tailored to Your Business",
    customQuoteText: "Every workplace has different cleaning requirements. Tell us about your office, preferred cleaning schedule and requirements, and we'll provide a personalised quote.",
    customQuoteBtn: "Request Office Cleaning Quote →",
    finalCtaTitle: "Need a Cleaner Workplace?",
    finalCtaText: "Let British Prestige Cleaning Solution take care of your office cleaning while you focus on your business.",
    finalCtaBtn: "Request Custom Quote →"
  },
  "end-of-tenancy-cleaning": {
    customQuoteTitle: "Get Your Move-Out Cleaning Quote",
    customQuoteText: "Every property has different requirements. Tell us about the size and condition of your property and any additional services you need, and we'll provide a personalised quote.",
    customQuoteBtn: "Request Custom Quote →",
    finalCtaTitle: "Moving Out? Let Us Handle the Cleaning.",
    finalCtaText: "Leave the cleaning to our professional team and focus on your move.",
    finalCtaBtn: "Book End of Tenancy Cleaning →"
  },
  "commercial-cleaning": {
    customQuoteTitle: "A Cleaning Plan Built Around Your Business",
    customQuoteText: "Every commercial property has different requirements. Tell us about your premises, cleaning schedule and specific needs, and we'll create a cleaning solution tailored to your business.",
    customQuoteBtn: "Request Commercial Cleaning Quote →",
    finalCtaTitle: "Keep Your Business Premises Clean & Professional",
    finalCtaText: "Let our team take care of your commercial cleaning requirements.",
    finalCtaBtn: "Request Custom Quote →"
  },
  "window-cleaning": {
    customQuoteTitle: "Get Your Window Cleaning Quote",
    customQuoteText: "Window cleaning requirements vary depending on the number, size and accessibility of your windows. Tell us about your property and we'll provide a personalised quote.",
    customQuoteBtn: "Request Window Cleaning Quote →",
    finalCtaTitle: "Give Your Windows a Fresh, Clear Finish",
    finalCtaText: "Let our professional team take care of your window cleaning.",
    finalCtaBtn: "Request Custom Quote →"
  },
  "domestic-cleaning": {
    customQuoteTitle: "A Cleaning Service Designed Around Your Home",
    customQuoteText: "Tell us about your home, preferred cleaning schedule and specific requirements, and we'll provide a personalised cleaning solution.",
    customQuoteBtn: "Request Domestic Cleaning Quote →",
    finalCtaTitle: "Want a Cleaner, Fresher Home?",
    finalCtaText: "Leave the household cleaning to our professional team.",
    finalCtaBtn: "Request Custom Quote →"
  },
  "gutter-cleaning": {
    customQuoteTitle: "Get Your Gutter Cleaning Quote",
    customQuoteText: "Every property is different. The size, height, accessibility and condition of your guttering can affect the work required. Send us your property details and we'll provide a personalised quote.",
    customQuoteBtn: "Request Gutter Cleaning Quote →",
    finalCtaTitle: "Keep Your Gutters Clear & Your Property Protected",
    finalCtaText: "Let our team take care of your gutter cleaning requirements.",
    finalCtaBtn: "Request Custom Quote →"
  },
  "carpet-cleaning": {
    customQuoteTitle: "Give Your Carpets a Fresh Start",
    customQuoteText: "Carpet cleaning requirements vary depending on carpet size, material, condition and level of soiling. Tell us about your carpets and we'll provide a personalised quote.",
    customQuoteBtn: "Request Carpet Cleaning Quote →",
    finalCtaTitle: "Ready for Fresher, Cleaner Carpets?",
    finalCtaText: "Give your carpets the professional clean they deserve.",
    finalCtaBtn: "Request Custom Quote →"
  },
  "regular-cleaning": {
    customQuoteTitle: "Create Your Regular Cleaning Plan",
    customQuoteText: "Tell us about your home, preferred cleaning frequency and specific requirements, and we'll create a cleaning plan that works for you.",
    customQuoteBtn: "Request Regular Cleaning Quote →",
    finalCtaTitle: "Keep Your Home Looking Its Best",
    finalCtaText: "Enjoy a cleaner, fresher home with a regular cleaning service tailored to your routine.",
    finalCtaBtn: "Request Custom Quote →"
  },
  "pressure-washing": {
    customQuoteTitle: "Refresh Your Outdoor Space",
    customQuoteText: "Every surface is different. Tell us about the area you want cleaned, including its size and condition, and we'll provide a personalised quote.",
    customQuoteBtn: "Request Pressure Washing Quote →",
    finalCtaTitle: "Give Your Outdoor Surfaces a Fresh Look",
    finalCtaText: "Remove built-up dirt and refresh your exterior spaces with professional pressure washing.",
    finalCtaBtn: "Request Custom Quote →"
  },
  "deep-cleaning": {
    customQuoteTitle: "Get a Personalised Deep Cleaning Quote",
    customQuoteText: "Every property is different. Tell us about your property and cleaning requirements, and we'll provide a personalised quote based on the level of service you need.",
    customQuoteBtn: "Request Custom Quote →",
    finalCtaTitle: "Ready for a Deep Clean?",
    finalCtaText: "Give your property the thorough clean it deserves.",
    finalCtaBtn: "Request Custom Quote →"
  }
};

export const dynamic = 'force-dynamic';

async function fetchService(idOrSlug: string) {
  let service = null;
  try {
    service = await prisma.service.findFirst({
      where: {
        OR: [
          { id: idOrSlug },
          { slug: idOrSlug }
        ]
      }
    });
  } catch {
    // DB offline fallback
  }

  const constantFallback = SERVICES.find(s => s.id === idOrSlug || s.slug === idOrSlug);

  if (!service && !constantFallback) {
    return null;
  }

  const name = service?.name || constantFallback?.name || "Cleaning Service";
  const slug = service?.slug || constantFallback?.slug || idOrSlug;
  const shortDescription = service?.shortDescription || constantFallback?.shortDescription || "Premium cleaning service.";
  const description = service?.description || constantFallback?.description || "Professional cleaning service tailored to your exact specifications.";
  const priceType = service?.priceType || constantFallback?.priceType || "FROM_PRICE";
  const basePrice = service ? Number(service.basePrice) : (constantFallback?.basePrice || 0);
  const durationMinutes = service?.durationMinutes || constantFallback?.duration || 120;
  
  let imageUrl = service?.imageUrl;
  if (!imageUrl || imageUrl === "/images/hero-cleaning-v4.jpg") {
    imageUrl = constantFallback?.image || `/images/service-${slug}.jpg`;
  }

  let features: string[] = [];
  if (service?.features && Array.isArray(service.features) && (service.features as string[]).length > 0) {
    features = service.features as string[];
  } else if (constantFallback?.features) {
    features = constantFallback.features;
  } else {
    features = [
      "Professional & vetted cleaning staff",
      "All eco-friendly products & equipment supplied",
      "Detailed checklist execution",
      "100% Satisfaction Guarantee",
    ];
  }

  return {
    id: service?.id || constantFallback?.id || slug,
    name,
    slug,
    shortDescription,
    description,
    priceType,
    basePrice,
    durationMinutes,
    imageUrl,
    features,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = await fetchService(id);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.name} | ${BUSINESS.name}`,
    description: service.shortDescription || service.description || "",
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await fetchService(id);

  if (!service) {
    notFound();
  }

  const extras = SERVICE_CONTENT_EXTRAS[service.slug] || {
    customQuoteTitle: "Cleaning Made Simple",
    customQuoteText: "Every property and cleaning requirement is different. Tell us what you need and we'll provide a personalised quote.",
    customQuoteBtn: "Request Custom Quote →",
    finalCtaTitle: "Ready to Book?",
    finalCtaText: "Get in touch with us to schedule your service.",
    finalCtaBtn: "Book Now →"
  };

  const whatsappCleanNumber = BUSINESS.whatsapp.replace(/[^0-9]/g, '');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
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
    "offers": {
      "@type": "Offer",
      "priceCurrency": "GBP",
      "price": service.basePrice || "0",
      "description": service.priceType === "QUOTE_REQUIRED" ? "Custom Quote" : "Starting price",
      "url": `https://britishprestigecleaning.co.uk/book?service=${service.id}`
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Script
        id={`service-jsonld-${service.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Header Section */}
      <section className="w-full relative min-h-[380px] md:min-h-[440px] bg-slate-900 overflow-hidden flex items-end">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="object-cover opacity-50 transition-transform duration-1000 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 w-full p-6 md:p-12 lg:p-16">
          <div className="container-wide mx-auto space-y-4">
            <span className="inline-flex items-center gap-2 bg-primary/90 text-white text-xs md:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-md">
              <Sparkles className="w-4 h-4" /> Professional Cleaning Service
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              {service.name}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl drop-shadow-md font-light leading-relaxed">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs Navigation */}
      <div className="w-full bg-slate-50 border-b border-slate-200 py-3">
        <div className="container-wide mx-auto px-4 sm:px-6 flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">{service.name}</span>
        </div>
      </div>

      {/* Highlights Bar */}
      <section className="w-full bg-slate-900 text-white border-t border-slate-800 py-4 px-4 sm:px-6">
        <div className="container-wide mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>Approx. {service.durationMinutes} mins</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>100% Insured & Vetted</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300">
            <Leaf className="w-4 h-4 text-primary shrink-0" />
            <span>Eco-Friendly Supplies</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300">
            <Award className="w-4 h-4 text-primary shrink-0" />
            <span>Spotless Guarantee</span>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <section className="w-full py-12 md:py-20 bg-white">
        <div className="container-wide mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Column: Details */}
          <div className="flex-1 space-y-12">
            
            {/* About Section */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                About This Service
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed whitespace-pre-line font-normal">
                {service.description}
              </p>
            </div>

            {/* What's Included Section */}
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <ClipboardCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">What's Included</h3>
                  <p className="text-sm text-slate-600">Comprehensive checklist items completed during your service visit</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {service.features.map((feature: string, fIndex: number) => (
                  <div key={fIndex} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium text-base leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works (3-Step Process) */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">Our 3-Step Cleaning Process</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm mb-4">1</span>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Initial Assessment</h4>
                  <p className="text-sm text-slate-600">We assess the property layout, surface materials, and high-priority areas before starting.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm mb-4">2</span>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Deep Execution</h4>
                  <p className="text-sm text-slate-600">Our trained team executes the thorough cleaning checklist using professional eco-friendly products.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm mb-4">3</span>
                  <h4 className="font-bold text-slate-900 text-lg mb-2">Quality Inspection</h4>
                  <p className="text-sm text-slate-600">A final walkthrough inspection ensures every corner meets our high British Prestige standard.</p>
                </div>
              </div>
            </div>

            {/* Final CTA Area */}
            <div className="bg-slate-900 text-white p-8 md:p-12 rounded-3xl mt-12 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">{extras.finalCtaTitle}</h3>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">
                {extras.finalCtaText}
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg relative z-10">
                <Link href="/contact">{extras.finalCtaBtn}</Link>
              </Button>
            </div>

            {/* Why Choose Us Badges */}
            <div className="bg-primary/5 rounded-3xl p-6 md:p-8 border border-primary/10 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" /> Why Choose British Prestige Cleaning?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <ThumbsUp className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-800 text-sm font-medium">Vetted, DBS-Checked Cleaners</span>
                </div>
                <div className="flex items-center gap-3">
                  <ThumbsUp className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-800 text-sm font-medium">Fully Insured Public Liability</span>
                </div>
                <div className="flex items-center gap-3">
                  <ThumbsUp className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-800 text-sm font-medium">All Equipment & Products Included</span>
                </div>
                <div className="flex items-center gap-3">
                  <ThumbsUp className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-slate-800 text-sm font-medium">Free Rescheduling with 24h Notice</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pricing & Booking Card */}
          <div className="lg:w-[380px] shrink-0">
            <div className="sticky top-28 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="bg-primary p-8 text-center text-white rounded-t-3xl">
                <span className="block text-white font-semibold text-xs uppercase tracking-wider mb-1">GET A CUSTOM QUOTE</span>
                <h2 className="text-2xl font-bold mb-2">{extras.customQuoteTitle}</h2>
                <p className="text-sm mb-4">{extras.customQuoteText}</p>
                <Button asChild size="lg" className="w-full bg-white text-primary hover:bg-white/90 rounded-xl shadow-md">
                  <Link href="/contact">{extras.customQuoteBtn}</Link>
                </Button>
              </div>

              <div className="p-6 md:p-8 space-y-4">
                <p className="text-center text-sm text-slate-600">
                  Select your preferred date and time slot to confirm your booking online in minutes.
                </p>

                <Button asChild size="lg" className="w-full text-base h-13 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition-all">
                  <Link href={`/book?service=${service.id}`}>
                    Book Service Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="w-full text-base h-13 rounded-xl text-slate-800 border-slate-300 hover:bg-slate-50">
                  <Link href="/contact">Request Bespoke Quote</Link>
                </Button>

                <a 
                  href={`https://wa.me/${whatsappCleanNumber}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 font-semibold text-sm rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ask Questions on WhatsApp
                </a>

                <div className="pt-4 border-t border-slate-100 text-center space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    100% Money-Back Satisfaction Guarantee
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Need help? Call us at <a href={`tel:${BUSINESS.phone}`} className="underline text-slate-600">{BUSINESS.phone}</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
