import { Hero } from "@/components/marketing/hero";
import { TrustBar } from "@/components/marketing/trust-bar";
import { ServicesPreview } from "@/components/marketing/services-preview";
import { WhyUs } from "@/components/marketing/why-us";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ReviewsPreview } from "@/components/marketing/reviews-preview";
import { AreasPreview } from "@/components/marketing/areas-preview";
import { FaqPreview } from "@/components/marketing/faq-preview";
import { CtaSection } from "@/components/marketing/cta-section";
import { BUSINESS } from "@/lib/constants";
import { Metadata } from "next";
import { prisma } from "@/lib/db";
import { getServices } from "@/app/actions/booking";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${BUSINESS.name} | Professional Cleaning Services in ${BUSINESS.city}`,
  description: BUSINESS.description,
};

export default async function HomePage() {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findFirst();
  } catch {
    // DB unavailable during build — use fallback constants
  }
  
  const services = await getServices();
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    description: BUSINESS.description,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: BUSINESS.website,
    address: { 
      '@type': 'PostalAddress', 
      addressLocality: BUSINESS.city, 
      addressRegion: BUSINESS.region, 
      addressCountry: 'GB' 
    },
    areaServed: BUSINESS.areas.map(a => ({ '@type': 'City', name: a })),
    priceRange: "££",
    openingHours: "Mo-Fr 08:00-18:00, Sa 09:00-14:00"
  };

  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      <main>
        <Hero 
          headline={settings?.heroHeadline}
          subtitle={settings?.heroSubtitle}
        />
        <TrustBar />
        <ServicesPreview services={services} />
        <WhyUs />
        <HowItWorks />
        <ReviewsPreview />
        <AreasPreview />
        <FaqPreview />
        <CtaSection />
      </main>
    </>
  );
}
