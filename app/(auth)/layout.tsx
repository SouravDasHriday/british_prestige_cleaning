import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { BUSINESS } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Image & Branding (hidden on small screens) */}
      <div className="hidden md:flex flex-1 relative bg-primary">
        <Image 
          src="/images/hero-cleaning-v4.jpg" 
          alt={`${BUSINESS.name} team at work`} 
          fill 
          className="object-contain opacity-40 mix-blend-overlay bg-white"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute inset-0 p-12 flex flex-col justify-between text-white z-10">
          <Link href="/" className="flex items-center gap-3 group w-max">
            <Image
              src="/logo-v2.png"
              alt={`${BUSINESS.name} Logo`}
              width={48}
              height={48}
              className="rounded-full bg-white p-1"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-[17px] font-bold tracking-wide uppercase text-white">British Prestige</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-white/90">Cleaning Solutions</span>
                <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white">BPCS</span>
              </div>
            </div>
          </Link>
          
          <div className="space-y-4 max-w-md">
            <h1 className="text-4xl font-bold text-balance">
              {BUSINESS.tagline}
            </h1>
            <p className="text-lg text-white/80">
              Manage your bookings, reschedule appointments, and view your payment history all in one place.
            </p>
          </div>
        </div>
      </div>
      
      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        <div className="absolute top-6 left-6 md:top-12 md:left-12">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-medium transition-colors bg-white/80 p-2 pr-4 rounded-full shadow-sm md:shadow-none md:bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <div className="w-full max-w-md space-y-8 mt-12 md:mt-0">
          <div className="md:hidden flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo-v2.png"
                alt={`${BUSINESS.name} Logo`}
                width={48}
                height={48}
                className="rounded-full shadow-md"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="text-[17px] font-bold tracking-wide uppercase text-gray-900">British Prestige</span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-gray-500">Cleaning Solutions</span>
                  <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary">BPCS</span>
                </div>
              </div>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
