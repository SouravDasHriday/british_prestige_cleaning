import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Shield, Leaf, HeartHandshake, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "About Us | British Prestige Cleaning Solutions",
  description: "Learn about British Prestige Cleaning Solutions, our professional standards, eco-conscious approach, and commitment to delivering exceptional commercial and residential cleaning services across London, Kent, and the UK.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHero
        title="About"
        highlight="British Prestige"
        description="Your trusted, reliable cleaning specialists dedicated to delivering exceptional results across London and Kent."
        image="/images/about_hero.jpg"
      />

      {/* Story Section */}
      <section className="w-full section-padding bg-white">
        <div className="container-tight mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  British Prestige Cleaning Solutions is a dedicated local exterior cleaning business based in Birmingham. We pride ourselves on delivering professional, reliable, and high-quality cleaning services to both residential and commercial clients across the West Midlands.
                </p>
                <p>
                  We understand that finding a dependable cleaning service can be challenging. That's why we focus on consistent quality, punctuality, and clear communication. When we say we'll be there, we mean it.
                </p>
                <p>
                  Using modern equipment like pure water reach-and-wash systems, alongside traditional methods where appropriate, we ensure exceptional results every time while maintaining respect for your property.
                </p>
              </div>
            </div>
            
            {/* About Image */}
            <div className="flex flex-col rounded-2xl overflow-hidden shadow-xl bg-white border border-gray-100">
              <div className="aspect-square relative w-full bg-gray-50/50">
                <Image
                  src="/images/service-deep.jpg"
                  alt="British Prestige Cleaning Solutions team at work"
                  fill
                  className="object-contain p-8"
                />
              </div>
              <div className="bg-primary p-6 text-white text-center flex flex-col items-center justify-center">
                <Shield className="w-8 h-8 mb-2 opacity-90" />
                <h3 className="text-xl font-bold">Local Quality</h3>
                <p className="text-white/90 text-sm mt-1">Serving London & Kent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full section-padding bg-gray-50 border-y border-gray-100">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">The principles that guide every job we undertake.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-gray-100 hover:border-primary/30 transition-colors shadow-sm">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Professional Standards</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We invest in the right equipment and training to ensure we deliver a premium finish, safely and efficiently, on every single job.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-100 hover:border-primary/30 transition-colors shadow-sm">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Eco-Conscious</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We use pure water systems and minimize the use of harsh chemicals wherever possible, protecting your property and the environment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-100 hover:border-primary/30 transition-colors shadow-sm">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <HeartHandshake className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Customer First</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Friendly, approachable service. We respect your home or business, communicating clearly about arrival times and any issues.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-gray-100 hover:border-primary/30 transition-colors shadow-sm">
              <CardContent className="p-8 space-y-4 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Reliability</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We turn up when we say we will. Whether you're on a 4-weekly schedule or a one-off booking, you can count on us.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="w-full section-padding bg-white">
        <div className="container-tight mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Commitment to You</h2>
          <div className="max-w-3xl mx-auto text-gray-600 space-y-6 text-lg">
            <p>
              We don't believe in cutting corners. When you hire British Prestige Cleaning Solutions, you are paying for meticulous attention to detail and honest hard work. 
            </p>
            <p>
              If a job takes longer than expected to get it right, we take the time to do it properly. Our goal is not just to clean your property once, but to become your trusted regular exterior cleaner for years to come.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium text-gray-900">Satisfaction Focus</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium text-gray-900">Honest Pricing</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="font-medium text-gray-900">Quality Assured</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 gradient-bg text-white">
        <div className="container-tight mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to experience the difference?</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Contact us today for a free, no-obligation quote and let us bring the shine back to your property.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-50 text-lg px-8 h-14">
              <Link href="/book">
                Book Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
