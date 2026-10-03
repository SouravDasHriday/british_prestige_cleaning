import { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/constants";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about our cleaning services.",
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex min-h-screen flex-col items-center">
        <PageHero
          title="Frequently Asked"
          highlight="Questions"
          description="Find answers to common questions about our services, booking process, and policies."
          image="/images/faq_hero.jpg"
        />

        <section className="w-full section-padding bg-white">
          <div className="container-tight mx-auto">
            <div className="bg-card glass-card rounded-xl p-6 md:p-8 mb-12">
              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-medium hover:text-primary transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="text-center bg-primary/5 rounded-2xl p-8 border border-primary/10">
              <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                We're here to help! Get in touch with our friendly team.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
