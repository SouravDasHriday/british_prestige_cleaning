"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cancelBooking } from "@/app/actions/booking";
import { Loader2, X, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CancelBookingButton({ bookingId, className, disabledReason }: { bookingId: string, className?: string, disabledReason?: string }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleCancel = async () => {
    if (!reason.trim()) {
      alert("Please provide a reason for cancellation.");
      return;
    }

    setLoading(true);
    try {
      await cancelBooking(bookingId, reason);
      window.location.reload(); // Refresh the page to reflect the new status
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to cancel booking");
      setLoading(false);
    }
  };

  return (
    <div className="relative group w-full sm:w-auto">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline" 
            className={`text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 w-full sm:w-auto ${className || ''}`}
            disabled={!!disabledReason}
          >
            <X className="w-4 h-4 mr-2" />
            Cancel Order
          </Button>
        </DialogTrigger>
        {disabledReason && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            {disabledReason}
          </div>
        )}
        <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" /> Cancel Booking
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this booking? This action cannot be undone, and the time slot will be released.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Cancellation Reason (Required)
            </Label>
            <Textarea
              id="reason"
              placeholder="Please provide a brief reason for cancelling this order..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] bg-white"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
            Close
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleCancel}
            disabled={loading || !reason.trim()}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Confirm Cancellation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  );
}
