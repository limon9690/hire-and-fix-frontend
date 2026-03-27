import type {
  BookingStatus,
  MyBookingItem,
  PaymentStatus,
} from "@/lib/dashboard/booking/types";

const CANCELLATION_BLOCKING_STATUSES = new Set<BookingStatus>([
  "COMPLETED",
  "CANCELLED",
]);

const PAY_NOW_BLOCKING_BOOKING_STATUSES = new Set<BookingStatus>([
  "COMPLETED",
  "CANCELLED",
  "REJECTED",
]);

const PAY_NOW_ALLOWED_STATUSES = new Set<PaymentStatus>(["PENDING", "UNPAID"]);

export const canCancelBooking = (booking: MyBookingItem) => {
  if (CANCELLATION_BLOCKING_STATUSES.has(booking.bookingStatus)) {
    return false;
  }

  const start = new Date(booking.startTime);
  if (Number.isNaN(start.getTime())) {
    return false;
  }

  return start.getTime() > Date.now();
};

export const canPayForBooking = (booking: MyBookingItem) => {
  if (PAY_NOW_BLOCKING_BOOKING_STATUSES.has(booking.bookingStatus)) {
    return false;
  }

  const currentPaymentStatus = booking.payment?.status ?? booking.paymentStatus;
  return PAY_NOW_ALLOWED_STATUSES.has(currentPaymentStatus);
};
