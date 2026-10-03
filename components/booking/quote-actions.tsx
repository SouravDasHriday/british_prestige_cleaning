"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { acceptQuote } from "@/app/actions/dashboard";
import { Loader2, Check } from "lucide-react";
import CancelBookingButton from "@/components/booking/cancel-booking-button";
import { differenceInHours } from "date-fns";

export default function QuoteActions({ bookingId, booking }: { bookingId: string, booking?: any }) {
  const [loading, setLoading] = useState<"accept" | "reject" | null>(null);

  const handleAccept = async () => {
    setLoading("accept");
    try {
      await acceptQuote(bookingId);
    } catch (err) {
      console.error(err);
      alert("Failed to accept quote");
      setLoading(null);
    }
  };

  let disabledReason;
  if (booking) {
    const isPastDeadline = differenceInHours(new Date(`${booking.appointment_date}T${booking.start_time}`), new Date()) < 48;
    if (isPastDeadline) disabledReason = "Cannot cancel within 48 hours of appointment";
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-2">
      <CancelBookingButton bookingId={bookingId} className="h-9 px-3" disabledReason={disabledReason} />
      <Button 
        size="sm" 
        onClick={handleAccept} 
        disabled={loading !== null}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        {loading === "accept" ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-1" />}
        Accept & Confirm
      </Button>
    </div>
  );
}
