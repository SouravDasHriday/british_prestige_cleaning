// =============================================================================
// British Prestige Cleaning Solutions — Business Constants & Content Data
// =============================================================================
// All placeholder values marked with XXX should be updated with real business
// information before production launch.

export const BUSINESS = {
  name: "BRITISH PRESTIGE CLEANING SOLUTIONS",
  tagline: "Professional Cleaning. Clear Results.",
  description:
    "British Prestige Cleaning Solutions provides premium commercial, office, residential, and end of tenancy cleaning services across London, Kent, and the UK. Get a spotless environment with our expert, eco-friendly cleaning teams.",
  phone: "+44 7424 511242",
  email: "hello@britishprestigecleaning.co.uk",
  whatsapp: "+44 7424 511242",
  website: "https://bpcs.shop",
  city: "London & Kent",
  region: "United Kingdom",
  country: "United Kingdom",
  countryCode: "GB",
  postcode: "UK Wide",
  openingHours: {
    weekdays: "8:00 AM – 6:00 PM",
    saturday: "9:00 AM – 2:00 PM",
    sunday: "Closed",
    display: "Mon–Fri: 8:00–18:00 | Sat: 9:00–14:00",
  },
  areas: [
    "London",
    "Kent",
  ],
  timezone: "Europe/London",
  currency: "GBP",
  currencySymbol: "£",
  cancellationHours: 24,
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
} as const;

export type ServiceData = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  priceType: "FIXED" | "FROM_PRICE" | "QUOTE_REQUIRED" | "PER_UNIT";
  basePrice: number | null;
  duration: number;
  icon: string;
  image?: string;
  features: string[];
};

export const SERVICES: ServiceData[] = [

  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    slug: "deep-cleaning",
    shortDescription: "Thorough top-to-bottom intensive cleaning for any space.",
    description: "Our deep cleaning service is designed for homes and properties that need more than a regular clean. We provide a thorough and detailed clean, paying extra attention to areas where dust, grease, grime and everyday build-up can accumulate over time. Whether you are preparing your property for a special occasion, refreshing your home, moving into a new property or simply want a complete clean from top to bottom, our professional cleaning team will tailor the service to your requirements.",
    priceType: "FROM_PRICE",
    basePrice: 120,
    duration: 240,
    icon: "Sparkles",
    image: "/images/service-deep.jpg",
    features: [
      "Intensive scrubbing & degreasing of kitchen appliances & hobs",
      "Limescale & soap scum removal from tiles & shower glass",
      "Cleaning behind & under moveable heavy furniture",
      "Detailed cleaning of skirtings, door frames, switches & outlets",
      "Inside window & window frame cleaning",
      "Deep sanitization of all high-touch surfaces",
    ],
  },
  {
    id: "office-cleaning",
    name: "Office Cleaning",
    slug: "office-cleaning",
    shortDescription: "Professional office cleaning for businesses.",
    description: "Our professional office cleaning service helps businesses maintain a clean, hygienic and welcoming working environment for employees, customers and visitors. From small offices and professional workspaces to larger commercial premises, we provide reliable cleaning solutions tailored to your business. We can arrange cleaning around your working hours, including regular daytime, early morning or evening services, helping you maintain a consistently clean workplace without unnecessary disruption to your business.",
    priceType: "QUOTE_REQUIRED",
    basePrice: null,
    duration: 240,
    icon: "Building2",
    image: "/images/service-office.jpg",
    features: [
      "Desk and workstation surface cleaning",
      "Dusting and wiping accessible surfaces",
      "Vacuuming carpets",
      "Sweeping and mopping hard floors",
      "Meeting room cleaning",
      "Reception and communal-area cleaning",
      "Kitchen and staff-area cleaning",
      "Worktop and surface cleaning",
      "Sink and tap cleaning",
      "Appliance exterior cleaning",
      "Toilet and washroom cleaning",
      "Basin and mirror cleaning",
      "High-touch surface cleaning",
      "Door handle and light switch cleaning",
      "Emptying bins",
      "General workplace sanitisation",
      "Optional extras: Carpet cleaning, window cleaning, office deep cleaning, kitchen deep cleaning, washroom deep cleaning and post-event cleaning."
    ],
  },
  {
    id: "end-of-tenancy",
    name: "End of Tenancy",
    slug: "end-of-tenancy",
    shortDescription: "Guaranteed deposit-return cleaning for moving out.",
    description: "Moving out can be stressful enough without worrying about cleaning the property before handing back the keys. Our professional end of tenancy cleaning service provides a thorough move-out clean designed to leave your property clean, fresh and presentable for the next occupant. We focus on kitchens, bathrooms, bedrooms, living areas, floors and other key areas throughout the property. Whether you are a tenant moving out, a landlord preparing for new tenants or a letting agent managing a property, we can provide a cleaning service tailored to your requirements.",
    priceType: "QUOTE_REQUIRED",
    basePrice: null,
    duration: 300,
    icon: "Key",
    image: "/images/service-eot.jpg",
    features: [
      "Dusting accessible surfaces",
      "Vacuuming carpets and floors",
      "Mopping hard floors",
      "Cleaning skirting boards",
      "Cleaning doors and handles",
      "Cleaning light switches",
      "Cleaning window sills",
      "Kitchen worktop and surface cleaning",
      "Sink and tap cleaning",
      "Hob and splashback cleaning",
      "Cupboard and cabinet front cleaning",
      "Appliance exterior cleaning",
      "Toilet cleaning",
      "Bath and shower cleaning",
      "Basin and tap cleaning",
      "Mirror cleaning",
      "Tile cleaning",
      "General soap and limescale build-up removal",
      "High-touch area cleaning",
      "Emptying bins",
      "General surface sanitisation",
      "Final presentation clean",
      "Optional extras: Oven cleaning, fridge/freezer cleaning, interior window cleaning, carpet cleaning, upholstery cleaning and additional-area cleaning."
    ],
  },
  {
    id: "commercial-cleaning",
    name: "Commercial Cleaning",
    slug: "commercial-cleaning",
    shortDescription: "Professional cleaning for corporate, retail, and office spaces.",
    description: "Create a safe, healthy, and pristine workplace for your employees and clients. We deliver scheduled commercial cleaning for corporate offices, retail stores, educational centers, and commercial facilities across the UK with flexible out-of-hours scheduling.",
    priceType: "QUOTE_REQUIRED",
    basePrice: null,
    duration: 240,
    icon: "Building2",
    image: "/images/service-commercial.jpg",
    features: [
      "Desk & workstation surface sanitization",
      "High-traffic floor care & vacuuming",
      "Communal kitchen & washroom sanitation & restocking",
      "Trash & recycling disposal",
      "After-hours & weekend availability",
      "Dedicated account management & quality audits",
    ],
  },

  {
    id: "window-cleaning",
    name: "Window Cleaning",
    slug: "window-cleaning",
    shortDescription: "Crystal-clear pure water window cleaning for homes and businesses.",
    description: "Achieve streak-free, brilliant views with our reach-and-wash pure water window cleaning system. We clean glass, frames, sills, and doors up to 5 storeys safely from the ground.",
    priceType: "FROM_PRICE",
    basePrice: 35,
    duration: 90,
    icon: "Sparkles",
    image: "/images/service-window-cleaning.jpg",
    features: [
      "100% purified water technology for streak-free finish",
      "Frame, sill, and door cleaning included as standard",
      "High-reach water-fed poles (no ladders needed)",
      "Residential & commercial property coverage",
    ],
  },



];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/areas", label: "Areas We Cover" },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  services: [
    { href: "/services#window-cleaning", label: "Window Cleaning" },
    { href: "/services#commercial-cleaning", label: "Commercial Cleaning" },
    { href: "/services#gutter-cleaning", label: "Gutter Cleaning" },
    { href: "/services#pressure-washing", label: "Pressure Washing" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/areas", label: "Areas We Cover" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/cancellation-policy", label: "Cancellation Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ],
} as const;

export const FAQ_ITEMS = [
  {
    question: "What areas do you currently cover?",
    answer:
      "We provide professional cleaning services across the entire UK, including major cities, towns, and regional areas.",
  },
  {
    question: "Do you require the customer to provide cleaning supplies or equipment?",
    answer:
      "No, our professional cleaners bring all required cleaning products and equipment (including vacuums, mops, microfibre cloths, and eco-friendly solutions).",
  },
  {
    question: "What is your cancellation or rescheduling policy?",
    answer:
      "We require at least 24 hours' notice prior to your scheduled appointment to cancel or reschedule free of charge. Cancellations made with less than 24 hours' notice may incur a cancellation fee.",
  },
  {
    question: "Are your cleaners insured and background-checked?",
    answer:
      "Yes, absolutely. All our cleaners undergo a thorough background check (including ID verification and reference checks) and are fully covered by public liability insurance for your peace of mind.",
  },
  {
    question: "How does your pricing work for custom properties?",
    answer:
      "For custom or larger properties, our pricing is determined based on the size of the property, the number of bedrooms and bathrooms, and any specialized service requests. We provide bespoke quotes tailored to your specific needs.",
  },
  {
    question: "How does the booking process work?",
    answer:
      "Simply click 'Book Now', select your required service, choose an available date and time slot, enter your property details, and confirm your booking. You can pay a deposit online or choose to pay after the service is completed.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept online card payments through our secure booking system (Visa, Mastercard, and other major cards). You can also choose to pay after the service is completed with cash or card on-site.",
  },
] as const;

export const TRUST_INDICATORS = [
  {
    icon: "Shield",
    title: "Professional Service",
    description: "Trained and equipped for quality results",
  },
  {
    icon: "Leaf",
    title: "Eco-Conscious",
    description: "Environmentally friendly cleaning methods",
  },
  {
    icon: "CalendarCheck",
    title: "Flexible Booking",
    description: "Book online at a time that suits you",
  },
  {
    icon: "BadgePoundSterling",
    title: "Clear Pricing",
    description: "Transparent pricing with no hidden fees",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Book Online",
    description:
      "Choose your service, pick a date and time, and book in minutes.",
    icon: "CalendarPlus",
  },
  {
    step: 2,
    title: "We Confirm",
    description:
      "Receive a booking confirmation with all the details by email.",
    icon: "CheckCircle",
  },
  {
    step: 3,
    title: "We Clean",
    description:
      "Our team arrives on time with all professional equipment needed.",
    icon: "Sparkles",
  },
  {
    step: 4,
    title: "You Enjoy",
    description:
      "Enjoy spotless results. Pay the remaining balance if applicable.",
    icon: "ThumbsUp",
  },
] as const;
