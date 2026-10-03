import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "Cancellation and rescheduling policy for British Prestige Cleaning Solutions.",
};

export default function CancellationPolicyPage() {
  const lastUpdated = "September 2024";

  return (
    <div className="section-padding container-tight mx-auto">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start space-x-3 text-amber-800">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong>Disclaimer:</strong> This policy is a template and should be reviewed to ensure it aligns with your specific business practices.
        </p>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Cancellation Policy</h1>
        <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>
          At {BUSINESS.name}, we value our staff's time and our commitment to serving all our clients efficiently. We understand that circumstances may arise that require you to cancel or reschedule your cleaning appointment.
        </p>

        <h2>Notice Period</h2>
        <p>
          We kindly request a minimum of <strong>{BUSINESS.cancellationHours} hours' notice</strong> if you need to cancel or reschedule your booking.
        </p>

        <h2>How to Cancel or Reschedule</h2>
        <p>You can manage your booking by:</p>
        <ul>
          <li>Emailing us at: <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">{BUSINESS.email}</a></li>
          <li>Calling or texting us at: <a href={`tel:${BUSINESS.phone}`} className="text-primary hover:underline">{BUSINESS.phone}</a></li>
        </ul>

        <h2>Late Cancellations and No-Shows</h2>
        <p>
          Failure to provide the required {BUSINESS.cancellationHours} hours' notice may result in a cancellation fee. This fee helps compensate our cleaning professionals for lost time and travel expenses.
        </p>
        <ul>
          <li><strong>Late Cancellation:</strong> Cancellations made with less than {BUSINESS.cancellationHours} hours' notice may be charged up to 50% of the total booking cost.</li>
          <li><strong>No-Show / Inaccessible Property:</strong> If our cleaners arrive at the scheduled time but cannot access the property, this is considered a no-show and may be charged up to 100% of the total booking cost.</li>
        </ul>

        <h2>Refund Policy</h2>
        <p>
          If you have pre-paid for a service and cancel with more than {BUSINESS.cancellationHours} hours' notice, you will receive a full refund or credit towards a future booking.
        </p>

        <h2>Exceptions</h2>
        <p>
          We understand that genuine emergencies occur. Exceptions to this policy may be granted at our discretion in cases of severe illness, extreme weather conditions, or other verifiable emergencies.
        </p>
      </div>
    </div>
  );
}
