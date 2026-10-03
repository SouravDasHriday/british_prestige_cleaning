// =============================================================================
// Cleaner Pro — Booking Type Definitions
// =============================================================================

import type { BookingStatus, PaymentStatus } from "./database";

// ── Booking Form Types ──────────────────────────────────────────────────────

export interface BookingFormData {
  // Step 1: Service
  serviceId: string;

  // Step 2: Date
  date: string; // ISO date string YYYY-MM-DD

  // Step 3: Time Slot
  slotId: string;

  // Step 4: Property
  address: string;
  city: string;
  postcode: string;
  propertyType?: string;
  numberOfFloors?: number;
  windowCount?: number;
  accessNotes?: string;
  customerNotes?: string;

  // Step 5: Customer
  fullName: string;
  email: string;
  phone: string;

  // Payment
  paymentMethod: "deposit" | "full" | "pay_later";
}

export type BookingStep =
  | "service"
  | "date"
  | "time"
  | "property"
  | "customer"
  | "review"
  | "payment"
  | "confirmation";

// ── Booking Display Types ───────────────────────────────────────────────────

export interface BookingWithDetails {
  id: string;
  booking_reference: string;
  status: BookingStatus;
  appointment_date: string;
  start_time: string;
  end_time: string;
  total_amount: number;
  deposit_amount: number;
  remaining_amount: number;
  service_address: string | null;
  service_postcode: string | null;
  customer_notes: string | null;
  service: {
    name: string;
    slug: string;
  };
  customer: {
    full_name: string;
    email: string;
    phone: string | null;
  };
  payment_status: PaymentStatus;
}

// ── Status Labels ───────────────────────────────────────────────────────────

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  RESCHEDULE_REQUESTED: "Reschedule Requested",
  RESCHEDULED: "Rescheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
  NO_SHOW: "No Show",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  UNPAID: "Unpaid",
  DEPOSIT_PAID: "Deposit Paid",
  PARTIALLY_PAID: "Partially Paid",
  PAID: "Paid",
  REFUNDED: "Refunded",
  PARTIALLY_REFUNDED: "Partially Refunded",
  FAILED: "Failed",
};

// ── Status Colors (Tailwind classes) ────────────────────────────────────────

export const BOOKING_STATUS_COLORS: Record<BookingStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-green-50 text-green-700 border-green-200",
  RESCHEDULE_REQUESTED: "bg-blue-50 text-blue-700 border-blue-200",
  RESCHEDULED: "bg-blue-50 text-blue-700 border-blue-200",
  IN_PROGRESS: "bg-purple-50 text-purple-700 border-purple-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  NO_SHOW: "bg-gray-50 text-gray-600 border-gray-200",
};

export const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  UNPAID: "bg-gray-50 text-gray-600 border-gray-200",
  DEPOSIT_PAID: "bg-amber-50 text-amber-700 border-amber-200",
  PARTIALLY_PAID: "bg-amber-50 text-amber-700 border-amber-200",
  PAID: "bg-green-50 text-green-700 border-green-200",
  REFUNDED: "bg-blue-50 text-blue-700 border-blue-200",
  PARTIALLY_REFUNDED: "bg-blue-50 text-blue-700 border-blue-200",
  FAILED: "bg-red-50 text-red-700 border-red-200",
};

// ── Property Types ──────────────────────────────────────────────────────────

export const PROPERTY_TYPES = [
  { value: "terraced", label: "Terraced House" },
  { value: "semi-detached", label: "Semi-Detached House" },
  { value: "detached", label: "Detached House" },
  { value: "bungalow", label: "Bungalow" },
  { value: "flat", label: "Flat / Apartment" },
  { value: "commercial", label: "Commercial Property" },
  { value: "other", label: "Other" },
] as const;
