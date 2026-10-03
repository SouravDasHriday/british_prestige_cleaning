import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { MapPin, PhoneCall, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import Script from "next/script";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Areas We Cover | British Prestige Cleaning Solutions",
  description: "Professional cleaning services across Birmingham and the West Midlands. Check our service coverage area.",
};

export default async function AreasPage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch {
    // DB unavailable during build — use fallback constants
  }
  const dbAreas = settings?.coveredAreas 
    ? settings.coveredAreas.split(',').map(a => a.trim()).filter(Boolean)
    : BUSINESS.areas;
  const availableWindow = settings?.availableWindow;

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
    "areaServed": dbAreas.map(area => ({
      "@type": "City",
      "name": area
    }))
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Script
        id="areas-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title="Areas We"
        highlight="Cover"
        description="For now, our professional cleaning services are exclusively available across London and Kent. We will be expanding to cover more areas later on!"
        image="/images/areas_hero.jpg"
      />

      {/* Areas Grid & Map Section */}
      <section className="w-full section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Areas List */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Service Areas</h2>
                <p className="text-gray-600 mb-4">
                  We provide professional domestic, commercial and specialist cleaning services across London and selected surrounding areas. If your location isn't listed, contact us with your postcode and we'll be happy to check availability.
                </p>
                {availableWindow && (
                  <div className="flex items-center gap-2 text-primary font-medium bg-primary/5 p-3 rounded-lg border border-primary/10 inline-flex mt-2 mb-4">
                    <Clock className="w-5 h-5" />
                    <span>Availability: {availableWindow}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dbAreas.map((area, index) => {
                  const slug = area.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <Link 
                      key={index} 
                      href={`/areas#${slug}`}
                      className="block group"
                      id={slug}
                    >
                      <Card className="border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 shadow-sm h-full">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                            <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                            {area}
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Coverage Map</h2>
              <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78234.13540678396!2d-1.970359!3d52.486244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870942d1b417173%3A0xca81fef0aeee7998!2sBirmingham!5e0!3m2!1sen!2suk!4v1"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Service Coverage Area Map"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Can't Find Your Area Section */}
      <section className="w-full section-padding bg-gray-50 border-t border-gray-100">
        <div className="container-tight mx-auto text-center space-y-8">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 border border-gray-100">
            <MapPin className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Can't find your area?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We are constantly expanding our service routes. If you live just outside these areas or have a large commercial requirement, we may still be able to help. Contact us to discuss your location.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact">
                <PhoneCall className="w-4 h-4 ml-2 mr-2" />
                Contact Us
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white">
              <a href={`mailto:${BUSINESS.email}`}>
                <Mail className="w-4 h-4 ml-2 mr-2" />
                Email Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
