import { ReactNode } from "react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import Chatbot from "@/components/marketing/chatbot";
import { auth } from "@/lib/auth";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const session = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={session?.user} />
      <main className="flex-1 flex flex-col min-h-screen">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
