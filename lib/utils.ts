import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution.
 * Combines clsx for conditional classes with tailwind-merge for deduplication.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a GBP currency string.
 * @example formatPrice(100) → "£100"
 * @example formatPrice(25.50) → "£25.50"
 */
export function formatPrice(
  price: number,
  currency: string = "GBP"
): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Format a date as a human-readable UK date string.
 * @example formatDate("2026-09-22") → "Tuesday, 22 September 2026"
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Format a short date (without weekday).
 * @example formatDateShort("2026-09-22") → "22 September 2026"
 */
export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Format a 24h time string for display.
 * @example formatTime("09:00") → "9:00 AM"
 * @example formatTime("14:30") → "2:30 PM"
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Format a time range for display.
 * @example formatTimeRange("09:00", "11:00") → "9:00 AM – 11:00 AM"
 */
export function formatTimeRange(startTime: string, endTime: string): string {
  return `${formatTime(startTime)} – ${formatTime(endTime)}`;
}

/**
 * Generate a human-friendly booking reference.
 * In production, this is handled by a PostgreSQL sequence.
 * @example generateBookingReference() → "CP-042851"
 */
export function generateBookingReference(): string {
  const random = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  return `CP-${random}`;
}

/**
 * Get the display label for a price type.
 */
export function getPriceDisplay(
  priceType: string,
  basePrice: number | null,
  currencySymbol: string = "£"
): string {
  switch (priceType) {
    case "FIXED":
      return basePrice !== null ? `${currencySymbol}${basePrice}` : "Contact us";
    case "FROM_PRICE":
      return basePrice !== null
        ? `From ${currencySymbol}${basePrice}`
        : "Contact us";
    case "QUOTE_REQUIRED":
      return "Request a Quote";
    case "PER_UNIT":
      return basePrice !== null
        ? `${currencySymbol}${basePrice} per unit`
        : "Contact us";
    default:
      return "Contact us";
  }
}

/**
 * Slugify a string for URL use.
 * @example slugify("Window Cleaning") → "window-cleaning"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate a string to a maximum length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}
