// =============================================================================
// Cleaner Pro — Database Type Definitions
// =============================================================================
// These types mirror the Supabase PostgreSQL schema.
// Once Supabase CLI is configured, replace with auto-generated types via:
//   npx supabase gen types typescript --project-id <id> > types/database.ts

// ── Enum Types ──────────────────────────────────────────────────────────────

export type UserRole = "CUSTOMER" | "ADMIN";

export type PriceType = "FIXED" | "FROM_PRICE" | "QUOTE_REQUIRED" | "PER_UNIT";

export type SlotStatus = "AVAILABLE" | "BLOCKED" | "BOOKED";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "RESCHEDULE_REQUESTED"
  | "RESCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "REJECTED"
  | "NO_SHOW";

export type PaymentStatus =
  | "UNPAID"
  | "DEPOSIT_PAID"
  | "PARTIALLY_PAID"
  | "PAID"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED"
  | "FAILED";

export type PaymentType =
  | "DEPOSIT"
  | "FULL_PAYMENT"
  | "REMAINING_BALANCE"
  | "REFUND";

export type NotificationType =
  | "BOOKING_CREATED"
  | "BOOKING_CONFIRMED"
  | "BOOKING_CANCELLED"
  | "BOOKING_RESCHEDULED"
  | "PAYMENT_RECEIVED"
  | "PAYMENT_FAILED"
  | "BOOKING_REMINDER"
  | "BOOKING_COMPLETED";

export type NotificationStatus = "QUEUED" | "SENT" | "FAILED";

// ── Table Row Types ─────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
  email: string;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  postcode: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  price_type: PriceType;
  base_price: number | null;
  duration_minutes: number;
  is_active: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AvailabilitySlot {
  id: string;
  date: string; // DATE as ISO string (YYYY-MM-DD)
  start_time: string; // TIME as HH:MM:SS
  end_time: string; // TIME as HH:MM:SS
  status: SlotStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  booking_reference: string;
  customer_id: string;
  service_id: string;
  availability_slot_id: string;

  // Service location
  service_address: string | null;
  service_city: string | null;
  service_postcode: string | null;

  // Property details
  property_type: string | null;
  number_of_floors: number | null;
  window_count: number | null;
  access_notes: string | null;
  customer_notes: string | null;

  // Appointment timing
  appointment_date: string; // DATE as ISO string
  start_time: string; // TIME as HH:MM:SS
  end_time: string; // TIME as HH:MM:SS

  // Status
  status: BookingStatus;

  // Financials (stored as numeric, returned as number)
  subtotal: number;
  discount: number;
  total_amount: number;
  deposit_amount: number;
  remaining_amount: number;

  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  booking_id: string;

  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;

  amount: number;
  currency: string;

  payment_type: PaymentType;
  status: PaymentStatus;

  paid_at: string | null;
  created_at: string;
}

export interface BookingHistory {
  id: string;
  booking_id: string;

  old_status: BookingStatus | null;
  new_status: BookingStatus;

  changed_by: string | null; // UUID of user who made the change
  reason: string | null;

  created_at: string;
}

export interface Notification {
  id: string;
  booking_id: string | null;
  recipient_email: string;
  type: NotificationType;
  status: NotificationStatus;
  provider_message_id: string | null;
  sent_at: string | null;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  business_name: string;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  address: string | null;
  opening_hours: Record<string, string> | null;
  cancellation_hours: number;
  currency: string;
  timezone: string;
  booking_enabled: boolean;
}

// ── Insert Types (for creating new records) ─────────────────────────────────

export type CustomerInsert = Omit<Customer, "id" | "created_at" | "updated_at">;
export type ServiceInsert = Omit<Service, "id" | "created_at" | "updated_at">;
export type AvailabilitySlotInsert = Omit<AvailabilitySlot, "id" | "created_at" | "updated_at">;
export type BookingInsert = Omit<Booking, "id" | "booking_reference" | "created_at" | "updated_at">;
export type PaymentInsert = Omit<Payment, "id" | "created_at">;

// ── Update Types (for partial updates) ──────────────────────────────────────

export type CustomerUpdate = Partial<Omit<Customer, "id" | "user_id" | "created_at" | "updated_at">>;
export type ServiceUpdate = Partial<Omit<Service, "id" | "created_at" | "updated_at">>;
export type AvailabilitySlotUpdate = Partial<Omit<AvailabilitySlot, "id" | "created_at" | "updated_at">>;
export type BookingUpdate = Partial<Omit<Booking, "id" | "booking_reference" | "customer_id" | "created_at" | "updated_at">>;
