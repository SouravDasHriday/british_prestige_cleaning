import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data handling practices for British Prestige Cleaning Solutions.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2024";

  return (
    <div className="section-padding container-tight mx-auto">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start space-x-3 text-amber-800">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong>Disclaimer:</strong> This privacy policy is a template and should be reviewed by a qualified legal professional before use to ensure full compliance with UK GDPR and other applicable laws.
        </p>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>
          At {BUSINESS.name}, we are committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect personal data that you provide directly to us, including:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number, and physical address.</li>
          <li><strong>Booking Details:</strong> Information related to the cleaning services you request, property access instructions, and preferences.</li>
          <li><strong>Communication Data:</strong> Records of correspondence when you contact us via email, phone, or contact forms.</li>
          <li><strong>Payment Information:</strong> Handled securely by our payment processors (e.g., Stripe). We do not store full credit card details on our servers.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our cleaning services.</li>
          <li>Process transactions and send related information, including booking confirmations and invoices.</li>
          <li>Communicate with you regarding appointments, customer service inquiries, and updates.</li>
          <li>Comply with legal obligations and resolve any disputes.</li>
        </ul>

        <h2>3. Data Storage and Security</h2>
        <p>
          We implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk of processing your personal data. Your data is stored on secure servers, and we use services like Supabase for reliable database management.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>We may share your data with trusted third-party service providers who assist us in operating our business, including:</p>
        <ul>
          <li><strong>Payment Processors:</strong> Such as Stripe, for processing transactions securely.</li>
          <li><strong>Communication Providers:</strong> Such as Resend, for sending transactional and marketing emails.</li>
          <li><strong>Database and Hosting:</strong> Services used to host our website and manage data.</li>
        </ul>
        <p>These third parties are bound by strict confidentiality agreements and are prohibited from using your data for any other purpose.</p>

        <h2>5. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience on our website. For more details, please review our <a href="/cookie-policy" className="text-primary underline">Cookie Policy</a>.
        </p>

        <h2>6. Your Rights (UK GDPR)</h2>
        <p>Under the UK General Data Protection Regulation, you have rights regarding your personal data, including the right to:</p>
        <ul>
          <li>Request access to your personal data.</li>
          <li>Request correction of inaccurate or incomplete data.</li>
          <li>Request erasure of your personal data (the "right to be forgotten").</li>
          <li>Object to or restrict the processing of your data.</li>
          <li>Request data portability.</li>
        </ul>

        <h2>7. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
        <p>
          <strong>{BUSINESS.name}</strong><br />
          Email: <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline">{BUSINESS.email}</a><br />
          Phone: <a href={`tel:${BUSINESS.phone}`} className="text-primary hover:underline">{BUSINESS.phone}</a><br />
          Address: {BUSINESS.city}, UK
        </p>
      </div>
    </div>
  );
}
