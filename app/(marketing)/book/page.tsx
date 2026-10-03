import { Metadata } from "next";
import { getServices } from "@/app/actions/booking";
import BookingWizard from "@/components/booking/booking-wizard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book a Service | British Prestige Cleaning Solutions",
  description: "Schedule your professional cleaning service today.",
};

export default async function BookPage() {
  const services = await getServices();
  
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 pb-12 bg-gray-50">
      <div className="container-tight mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Book Your Cleaning
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select a service, pick a time that works for you, and tell us where to go. It takes less than 60 seconds.
          </p>
        </div>
        
        {/* Client-side Multi-step Wizard */}
        <BookingWizard initialServices={services} />
      </div>
    </main>
  );
}
