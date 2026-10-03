import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ReviewsPreview() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div className="container-tight">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
            We're a new business committed to excellent service. Once we've completed jobs, we'll share genuine customer feedback here.
          </p>
        </div>

        <Card className="max-w-xl mx-auto glass-card border-dashed">
          <CardContent className="pt-8 flex flex-col items-center text-center space-y-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-8 h-8 text-muted/30 stroke-muted-foreground/30" />
              ))}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Customer reviews coming soon</h3>
              <p className="text-muted-foreground">
                We believe in 100% transparency. We never use fake reviews. Book your cleaning today and be the first to share your experience!
              </p>
            </div>

            <Button size="lg" className="mt-4" asChild>
              <Link href="/book">Be Our First Customer</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
