import { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie usage and tracking policy for British Prestige Cleaning Solutions.",
};

export default function CookiePolicyPage() {
  const lastUpdated = "September 2024";

  return (
    <div className="section-padding container-tight mx-auto">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start space-x-3 text-amber-800">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
        <p className="text-sm">
          <strong>Disclaimer:</strong> This Cookie Policy is a template and should be reviewed by a qualified professional to ensure compliance with PECR and UK GDPR.
        </p>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p>
          This Cookie Policy explains how our website uses cookies and similar technologies to recognise you when you visit our site, and why we use them.
        </p>

        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>

        <h2>Types of Cookies We Use</h2>
        
        <h3>1. Essential Cookies</h3>
        <p>
          These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. 
          For example, these are used for authentication if you log into a customer portal.
        </p>

        <h3>2. Analytics and Performance Cookies</h3>
        <p>
          These cookies are used to enhance the performance and functionality of our website but are non-essential to its use. However, without these cookies, certain functionality may become unavailable. They help us understand how the site is being used so we can improve it.
        </p>

        <h3>3. Third-Party Cookies</h3>
        <p>
          In some cases, we use cookies provided by trusted third parties. This includes:
        </p>
        <ul>
          <li><strong>Payment Processors:</strong> We use Stripe for secure payments. Stripe may use cookies for fraud prevention and to process transactions securely.</li>
        </ul>

        <h2>How to Manage Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through their settings preferences. You have the right to decide whether to accept or reject non-essential cookies.
        </p>
        <p>
          If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted. 
          To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutcookies.org</a>.
        </p>
      </div>
    </div>
  );
}
