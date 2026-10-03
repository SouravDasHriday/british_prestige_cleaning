import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions of service for British Prestige Cleaning Solutions.",
};

export default function TermsPage() {
  const lastUpdated = "September 2024";

  return (
    <div className="section-padding container-tight mx-auto">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start space-x-3 text-amber-800">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong>Disclaimer:</strong> These Terms & Conditions are a template and should be reviewed by a qualified legal professional before use to ensure they adequately protect the business.
        </p>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>
          Welcome to {BUSINESS.name}. These Terms & Conditions govern your use of our website and services. By booking a service with us, you agree to be bound by these terms.
        </p>

        <h2>1. Service Agreement</h2>
        <p>
          <strong>1.1.</strong> {BUSINESS.name} agrees to provide professional cleaning services as requested by the customer and confirmed by us.
        </p>
        <p>
          <strong>1.2.</strong> The customer must provide access to the property at the agreed time, along with access to running water and electricity necessary to perform the cleaning services.
        </p>
        <p>
          <strong>1.3.</strong> We reserve the right to refuse service if the property conditions pose a health or safety risk to our staff.
        </p>

        <h2>2. Booking and Quotes</h2>
        <p>
          <strong>2.1.</strong> Quotes are provided based on the information supplied by the customer. If the actual condition or size of the property differs significantly from the description, we reserve the right to amend the price.
        </p>
        <p>
          <strong>2.2.</strong> A booking is only confirmed once you receive a formal confirmation email or text message from us.
        </p>

        <h2>3. Payment Terms</h2>
        <p>
          <strong>3.1.</strong> Payment is due upon completion of the service, unless alternative arrangements have been agreed upon in advance.
        </p>
        <p>
          <strong>3.2.</strong> We accept payments via credit/debit card (processed securely) and bank transfer.
        </p>
        <p>
          <strong>3.3.</strong> Late payments may incur additional administrative charges.
        </p>

        <h2>4. Cancellations and Rescheduling</h2>
        <p>
          <strong>4.1.</strong> Please review our full <a href="/cancellation-policy" className="text-primary underline">Cancellation Policy</a> for detailed information.
        </p>
        <p>
          <strong>4.2.</strong> Generally, we require at least {BUSINESS.cancellationHours} hours' notice for cancellations or rescheduling to avoid a cancellation fee.
        </p>

        <h2>5. Liability and Complaints</h2>
        <p>
          <strong>5.1.</strong> We take great care when cleaning your property. In the unlikely event of damage caused by our staff, it must be reported within 24 hours of the service completion.
        </p>
        <p>
          <strong>5.2.</strong> We are not liable for pre-existing damage, wear and tear, or items that are intrinsically fragile. We recommend that valuable or highly fragile items be secured or moved prior to the cleaning.
        </p>
        <p>
          <strong>5.3.</strong> If you are dissatisfied with our service, you must report it within 24 hours. We will arrange to re-clean the disputed area at no extra cost. We do not generally offer refunds.
        </p>

        <h2>6. Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these Terms & Conditions at any time. The current version will always be posted on our website.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          These Terms & Conditions are governed by the laws of England and Wales.
        </p>
      </div>
    </div>
  );
}
