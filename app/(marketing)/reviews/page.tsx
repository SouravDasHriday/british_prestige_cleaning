import { Metadata } from "next";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Reviews | British Prestige Cleaning Solutions",
  description: "Customer reviews for British Prestige Cleaning Solutions",
};

export default function ReviewsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHero
        title="Customer"
        highlight="Reviews"
        description="What our clients say about our professional cleaning services."
        image="/images/reviews_hero.jpg"
      />

      <section className="w-full section-padding bg-white">
        <div className="container-tight mx-auto flex flex-col items-center">
          <Card className="max-w-2xl w-full mx-auto text-center glass-card border-primary/20">
            <CardHeader>
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-8 h-8 text-primary/40 stroke-[1.5]" />
                ))}
              </div>
              <CardTitle className="text-2xl">We're Building Our Reputation, One Clean at a Time</CardTitle>
              <CardDescription className="text-base mt-2">
                As a new business, we're focused on delivering outstanding results for every single client. Your satisfaction is our number one priority.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Be among our first customers and help us build our reviews. We guarantee you won't be disappointed.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-6 text-lg">
                <Link href="/book">Book Your First Clean</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
