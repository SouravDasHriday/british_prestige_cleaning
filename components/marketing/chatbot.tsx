"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Sparkles, ArrowRight, Clock, Phone, Mail, MapPin } from "lucide-react";
import { getChatbotServices, getChatbotSettings } from "@/app/actions/chatbot";
import Link from "next/link";

type Message = {
  id: string;
  role: "bot" | "user";
  content: string;
  options?: ChatOption[];
  services?: ServiceInfo[];
  contact?: ContactInfo | null;
};

type ChatOption = {
  label: string;
  action: string;
};

type ServiceInfo = {
  name: string;
  description: string | null;
  price: number;
  duration: number;
};

type ContactInfo = {
  businessName: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
};

const INITIAL_OPTIONS = [
  { label: "🧹 Our Services", action: "services" },
  { label: "📅 Book a Cleaning", action: "booking" },
  { label: "❓ FAQs", action: "faq" },
  { label: "📞 Contact Us", action: "contact" },
];

const FAQ_OPTIONS: ChatOption[] = [
  { label: "What areas do you cover?", action: "faq_areas" },
  { label: "Do I need to provide supplies?", action: "faq_supplies" },
  { label: "What's your cancellation policy?", action: "faq_cancel" },
  { label: "Are your cleaners insured?", action: "faq_insured" },
  { label: "← Back to main menu", action: "main" },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen && messages.length === 0 && !initialized.current) {
      // Show unread badge after 3 seconds
      const timer = setTimeout(() => setHasUnread(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  const addBotMessage = (content: string, options?: ChatOption[], extras?: Partial<Message>) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "bot",
          content,
          options,
          ...extras,
        },
      ]);
    }, 600);
  };

  const handleOpen = async () => {
    setIsOpen(true);
    setHasUnread(false);

    if (!initialized.current) {
      initialized.current = true;

      // Load data in parallel
      const [servicesData, settingsData] = await Promise.all([
        getChatbotServices(),
        getChatbotSettings(),
      ]);
      setServices(servicesData);
      setContact(settingsData);

      addBotMessage(
        "Hi there! 👋 Welcome to British Prestige Cleaning Solutions! I'm here to help you find the perfect cleaning service. What would you like to know?",
        INITIAL_OPTIONS
      );
    }
  };

  const handleOptionClick = (action: string) => {
    // Add the user's "message" based on what they clicked
    const optionLabels: Record<string, string> = {
      services: "Tell me about your services",
      booking: "How do I book?",
      faq: "I have some questions",
      contact: "How can I contact you?",
      main: "Back to main menu",
      faq_areas: "What areas do you cover?",
      faq_supplies: "Do I need to provide supplies?",
      faq_cancel: "What's your cancellation policy?",
      faq_insured: "Are your cleaners insured?",
    };

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: optionLabels[action] || action },
    ]);

    switch (action) {
      case "services":
        addBotMessage(
          "We offer a range of professional cleaning services tailored to your needs! Here's what we currently have available:",
          [
            { label: "📅 Book Now", action: "booking" },
            { label: "← Back", action: "main" },
          ],
          { services }
        );
        break;

      case "booking":
        addBotMessage(
          "Booking with us is easy! Here's how it works:\n\n**Step 1️⃣** — Click \"Book a Service\" and choose your cleaning type\n**Step 2️⃣** — Pick your preferred date and time slot\n**Step 3️⃣** — Enter your property details (address, floors, etc.)\n**Step 4️⃣** — Submit your request!\n\n📋 Our admin team will review your details and send you a **personalized quote**. You can then accept or modify the booking from your dashboard.\n\n🔒 You'll need to create a free account to track your bookings.",
          [
            { label: "🚀 Start Booking", action: "go_book" },
            { label: "← Back", action: "main" },
          ]
        );
        break;

      case "go_book":
        setMessages((prev) => [
          ...prev,
          { id: Date.now().toString(), role: "user", content: "Take me to booking!" },
        ]);
        addBotMessage("Great choice! I'm redirecting you to our booking page now... 🚀");
        setTimeout(() => {
          window.location.href = "/book";
        }, 1200);
        break;

      case "faq":
        addBotMessage(
          "Sure! Here are some common questions. Pick one to learn more:",
          FAQ_OPTIONS
        );
        break;

      case "faq_areas":
        addBotMessage(
          "We currently serve the greater London area and surrounding regions. If you're unsure whether we cover your area, just submit a booking request with your address and our team will confirm! 🗺️",
          FAQ_OPTIONS
        );
        break;

      case "faq_supplies":
        addBotMessage(
          "No, you don't need to provide any cleaning supplies! 🧹 Our professional team comes fully equipped with all the necessary cleaning products and equipment. However, if you have specific eco-friendly or hypoallergenic product preferences, just let us know in your booking notes!",
          FAQ_OPTIONS
        );
        break;

      case "faq_cancel":
        addBotMessage(
          "We understand plans change! ⏰ You can cancel or reschedule your booking **up to 24 hours before** your appointment at no charge. Cancellations within 24 hours may incur a small fee. You can manage everything from your Customer Dashboard.",
          FAQ_OPTIONS
        );
        break;

      case "faq_insured":
        addBotMessage(
          "Absolutely! ✅ All our cleaning professionals are fully insured and background-checked. We carry comprehensive liability insurance so you can have complete peace of mind while we take care of your home or office.",
          FAQ_OPTIONS
        );
        break;

      case "contact":
        addBotMessage(
          "You can reach our team through any of the following:",
          [
            { label: "📅 Book Online", action: "booking" },
            { label: "← Back", action: "main" },
          ],
          { contact }
        );
        break;

      case "main":
        addBotMessage(
          "Sure! What else can I help you with?",
          INITIAL_OPTIONS
        );
        break;

      default:
        addBotMessage("I'm not sure about that, but I can help with these topics:", INITIAL_OPTIONS);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-white shadow-2xl hover:shadow-primary/30 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <>
            <MessageCircle className="w-7 h-7" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold animate-bounce">
                1
              </span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">British Prestige Cleaning Assistant</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                Online — Ready to help
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${msg.role === "user" ? "order-1" : "order-2"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md"
                    }`}
                  >
                    {msg.content.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                        {line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
                          part.startsWith("**") && part.endsWith("**") ? (
                            <strong key={j}>{part.slice(2, -2)}</strong>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Service Cards */}
                  {msg.services && msg.services.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.services.map((s, i) => (
                        <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-gray-900">{s.name}</h4>
                            <span className="text-primary font-bold text-sm">£{s.price}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{s.description}</p>
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{s.duration} mins</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Contact Card */}
                  {msg.contact && (
                    <div className="mt-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm space-y-3">
                      {msg.contact.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Phone className="w-4 h-4 text-primary" />
                          <span>{msg.contact.phone}</span>
                        </div>
                      )}
                      {msg.contact.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Mail className="w-4 h-4 text-primary" />
                          <span>{msg.contact.email}</span>
                        </div>
                      )}
                      {msg.contact.address && (
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{msg.contact.address}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quick Reply Options */}
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(opt.action)}
                          className="bg-white border border-primary/20 text-primary text-xs font-medium px-3 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 bg-white flex-shrink-0">
            <div className="flex gap-2">
              <Link
                href="/book"
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                Book a Service <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              Powered by British Prestige Cleaning Solutions
            </p>
          </div>
        </div>
      )}
    </>
  );
}
