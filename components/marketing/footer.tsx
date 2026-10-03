import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Clock, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { BUSINESS, FOOTER_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 py-16 md:py-24 border-t border-slate-800">
      <div className="container-wide mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <Image
                src="/logo-v2.png"
                alt={`${BUSINESS.name} Logo`}
                width={56}
                height={56}
                className="rounded-full shadow-md ring-2 ring-primary/20 group-hover:ring-primary/40 group-hover:scale-105 transition-all duration-300 bg-white"
                style={{ imageRendering: 'auto' }}
                quality={100}
              />
              <div className="hidden md:flex flex-col justify-center leading-none whitespace-nowrap">
                <span className="text-[15px] lg:text-base font-bold tracking-wide text-white uppercase">British Prestige</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] lg:text-xs font-medium tracking-[0.15em] text-slate-400 uppercase">Cleaning Solutions</span>
                  <span className="text-[10px] font-bold tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">BPCS</span>
                </div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mt-4">
              {BUSINESS?.description || "Premium cleaning services in Birmingham and surrounding areas. Professional, reliable, and thorough."}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href={BUSINESS?.socials?.facebook || "#"} className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href={BUSINESS?.socials?.instagram || "#"} className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS?.services?.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              )) || (
                <>
                  <li><Link href="/services/regular-cleaning" className="text-slate-400 hover:text-primary transition-colors text-sm">Regular Cleaning</Link></li>
                  <li><Link href="/services/deep-cleaning" className="text-slate-400 hover:text-primary transition-colors text-sm">Deep Cleaning</Link></li>
                  <li><Link href="/services/end-of-tenancy" className="text-slate-400 hover:text-primary transition-colors text-sm">End of Tenancy</Link></li>
                  <li><Link href="/services/commercial" className="text-slate-400 hover:text-primary transition-colors text-sm">Commercial Cleaning</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS?.company?.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              )) || (
                <>
                  <li><Link href="/about" className="text-slate-400 hover:text-primary transition-colors text-sm">About Us</Link></li>
                  <li><Link href="/areas-we-cover" className="text-slate-400 hover:text-primary transition-colors text-sm">Areas We Cover</Link></li>
                  <li><Link href="/reviews" className="text-slate-400 hover:text-primary transition-colors text-sm">Reviews</Link></li>
                  <li><Link href="/faq" className="text-slate-400 hover:text-primary transition-colors text-sm">FAQ</Link></li>
                  <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors text-sm">Contact Us</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${BUSINESS?.phone || "01211234567"}`} className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm group">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{BUSINESS?.phone || "0121 123 4567"}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS?.email || "hello@britishprestigecleaning.co.uk"}`} className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm group">
                  <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
                  <span>{BUSINESS?.email || "hello@britishprestigecleaning.co.uk"}</span>
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${BUSINESS?.whatsapp ? BUSINESS.whatsapp.replace(/[^0-9]/g, '') : "447424511242"}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors text-sm group">
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp Us</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>{BUSINESS?.city ? `${BUSINESS.city}, ${BUSINESS.region}` : "Birmingham, West Midlands, UK"}</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Clock className="w-4 h-4 mt-1 shrink-0" />
                <span>{BUSINESS?.openingHours?.display || "Mon-Sat: 8am - 6pm"}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} {BUSINESS?.name || "British Prestige Cleaning Solutions"}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
