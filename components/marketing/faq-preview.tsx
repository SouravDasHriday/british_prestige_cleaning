import { FAQ_ITEMS } from "@/lib/constants";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FaqPreview() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/30">
      <div className="container-tight">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Quick answers to questions you may have.
          </p>
        </div>

        <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.slice(0, 3).map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/faq">View all FAQs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
