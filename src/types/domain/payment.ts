import type { BookingRecord, PaymentStatus } from "./booking";
import type { UserIdentity } from "./user";
import type { VendorSummary } from "./vendor";
import type { ServiceCategory } from "./category";

export type PaymentSortBy = "createdAt" | "updatedAt" | "status" | "amount" | "paidAt";

export type PaymentRecord = {
  id: string;
  bookingId: string;
  amount: string;
  paymentMethod: string;
  status: PaymentStatus;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type PaymentBookingInclude =
  | (BookingRecord & {
      user?: UserIdentity | null;
      vendor?: VendorSummary | null;
      employee?:
        | (Pick<BookingRecord["employee"], "id"> & {
            user?: UserIdentity | null;
            serviceCategory?: ServiceCategory | null;
          })
        | null;
      review?: BookingRecord["review"];
    })
  | null;

export type AdminPaymentItem = PaymentRecord & {
  booking: PaymentBookingInclude;
};
