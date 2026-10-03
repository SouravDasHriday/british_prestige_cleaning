import { Metadata } from "next";
import { BUSINESS, SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageCircle, Clock, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with British Prestige Cleaning Solutions for professional commercial, office, and residential cleaning quotes across London, Kent, and the UK.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHero
        title="Get in"
        highlight="Touch"
        description="Have a question or ready to book? Reach out to our friendly team today."
        image="/images/contact_hero.jpg"
      />

      <section className="w-full section-padding bg-white">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="glass-card rounded-2xl p-6 md:p-8 border border-primary/10">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" required placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required placeholder="john@example.com" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="07123 456789" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service Interest</Label>
                <select 
                  id="service" 
                  name="service"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a service...</option>
                  {SERVICES.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea 
                id="message" 
                name="message" 
                required 
                placeholder="How can we help you?"
                className="min-h-[150px] resize-y"
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <Card className="glass-card hover:border-primary/30 transition-colors">
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Phone</h3>
                <Link href={`tel:${BUSINESS.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {BUSINESS.phone}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:border-primary/30 transition-colors">
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Email</h3>
                <Link href={`mailto:${BUSINESS.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                  {BUSINESS.email}
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:border-[#25D366]/30 transition-colors">
            <CardContent className="p-6 flex items-start space-x-4">
              <div className="bg-[#25D366]/10 p-3 rounded-full text-[#25D366]">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                <Link href={`https://wa.me/${BUSINESS.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#25D366] transition-colors">
                  {BUSINESS.whatsapp}
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Opening Hours</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Mon-Fri: {BUSINESS.openingHours.weekdays}</li>
                  <li>Saturday: {BUSINESS.openingHours.saturday}</li>
                  <li>Sunday: {BUSINESS.openingHours.sunday}</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Service Area</h4>
                <p className="text-sm text-muted-foreground">
                  {BUSINESS.city} and surrounding areas.
                </p>
              </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>
    </main>
  );
}
