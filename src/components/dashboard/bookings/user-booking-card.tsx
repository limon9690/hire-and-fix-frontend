import Link from "next/link";
import { canPayForBooking } from "@/lib/dashboard/booking-rules";
import type { MyBookingItem } from "@/lib/dashboard/booking-types";
import { PayNowButton } from "@/components/payments/pay-now-button";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "./booking-status-badge";
import { CancelBookingButton } from "./cancel-booking-button";

type UserBookingCardProps = {
  booking: MyBookingItem;
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatCurrency = (value: string) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numeric);
};

export function UserBookingCard({ booking }: UserBookingCardProps) {
  const paymentStatus = booking.payment?.status ?? booking.paymentStatus;
  const canPayNow = canPayForBooking(booking);

  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">
            {booking.employee.user.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {booking.employee.serviceCategory.name} • {booking.vendor.vendorName}
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="min-w-[140px]">
            <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
              Booking Status
            </p>
            <BookingStatusBadge status={booking.bookingStatus} />
          </div>
          <div className="min-w-[140px]">
            <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
              Payment Status
            </p>
            <PaymentStatusBadge status={paymentStatus} />
          </div>
        </div>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Start Time
          </dt>
          <dd className="mt-1 font-medium">{formatDateTime(booking.startTime)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            End Time
          </dt>
          <dd className="mt-1 font-medium">{formatDateTime(booking.endTime)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Total Price
          </dt>
          <dd className="mt-1 font-medium">{formatCurrency(booking.totalPrice)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          href={`/dashboard/user/bookings/${booking.id}`}
          className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View Details
        </Link>

        <CancelBookingButton bookingId={booking.id} />

        {canPayNow ? (
          <PayNowButton
            bookingId={booking.id}
            className="h-8 cursor-pointer rounded-lg px-3 text-sm font-medium"
          />
        ) : null}
      </div>
    </article>
  );
}
