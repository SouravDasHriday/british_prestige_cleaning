import { BUSINESS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AreasPreview() {
  return (
    <section className="section-padding bg-background border-t">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-12">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Areas We Cover</h2>
            <p className="text-muted-foreground text-lg text-balance">
              Serving {BUSINESS.city} & the {BUSINESS.region}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/areas">See all areas</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {BUSINESS.areas.slice(0, 15).map((area, index) => (
            <div 
              key={index} 
              className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
            >
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-medium truncate">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
