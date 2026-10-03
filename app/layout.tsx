import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { BUSINESS } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${BUSINESS.name}`,
    default: `${BUSINESS.name} — Professional Commercial & Residential Cleaning in ${BUSINESS.city}`,
  },
  description: BUSINESS.description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bpcs.shop"
  ),
  keywords: [
    "commercial cleaning UK",
    "office cleaning London",
    "residential cleaners Kent",
    "end of tenancy cleaning",
    "deep cleaning services",
    "professional cleaning",
    "eco-friendly cleaning",
    BUSINESS.city,
    BUSINESS.region,
  ],
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: BUSINESS.name,
    title: `${BUSINESS.name} — Professional Cleaning Services in ${BUSINESS.city}`,
    description: BUSINESS.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} — Professional Cleaning Services`,
    description: BUSINESS.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            },
          }}
        />
      </body>
    </html>
  );
}
