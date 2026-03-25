import Link from "next/link";
import { canPayForBooking } from "@/lib/dashboard/booking-rules";
import type { BookingDetails } from "@/lib/dashboard/user-booking-details";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "./booking-status-badge";
import { CancelBookingButton } from "./cancel-booking-button";

type UserBookingDetailsProps = {
  booking: BookingDetails;
};

const formatDateTime = (value: string | null | undefined) => {
  if (!value) {
    return "—";
  }

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

export function UserBookingDetails({ booking }: UserBookingDetailsProps) {
  const paymentStatus = booking.payment?.status ?? booking.paymentStatus;
  const canPayNow = canPayForBooking(booking);

  return (
    <section className="space-y-6">
      <article className="rounded-xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {booking.employee.user.name}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {booking.employee.serviceCategory.name} • {booking.vendor.vendorName}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <BookingStatusBadge status={booking.bookingStatus} />
            <PaymentStatusBadge status={paymentStatus} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <CancelBookingButton bookingId={booking.id} />
          {canPayNow ? (
            <Link
              href={`/checkout/${booking.id}`}
              className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Pay Now
            </Link>
          ) : null}
        </div>
      </article>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Schedule & Price
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Start Time</dt>
              <dd className="font-medium">{formatDateTime(booking.startTime)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">End Time</dt>
              <dd className="font-medium">{formatDateTime(booking.endTime)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Total Price</dt>
              <dd className="font-medium">{formatCurrency(booking.totalPrice)}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Service Details
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Service Address</dt>
              <dd className="font-medium">{booking.serviceAddress || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Note</dt>
              <dd className="font-medium">{booking.note || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Vendor</dt>
              <dd className="font-medium">{booking.vendor.vendorName}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Payment
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Status</dt>
              <dd className="font-medium">{paymentStatus}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Provider</dt>
              <dd className="font-medium">{booking.payment?.provider || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Transaction ID</dt>
              <dd className="font-medium break-all">
                {booking.payment?.transactionId || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Paid At</dt>
              <dd className="font-medium">
                {formatDateTime(booking.payment?.paidAt)}
              </dd>
            </div>
          </dl>
        </article>

        <article className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Timeline
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Booking Created</dt>
              <dd className="font-medium">{formatDateTime(booking.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Booking Updated</dt>
              <dd className="font-medium">{formatDateTime(booking.updatedAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Payment Created</dt>
              <dd className="font-medium">
                {formatDateTime(booking.payment?.createdAt)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Payment Updated</dt>
              <dd className="font-medium">
                {formatDateTime(booking.payment?.updatedAt)}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
