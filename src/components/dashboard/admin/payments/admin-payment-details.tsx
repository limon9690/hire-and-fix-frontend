import Link from "next/link";
import type { AdminPaymentDetails } from "@/lib/dashboard/admin/payments/admin-payment-details";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/dashboard/bookings/booking-status-badge";

type AdminPaymentDetailsViewProps = {
  payment: AdminPaymentDetails;
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

export function AdminPaymentDetailsView({ payment }: AdminPaymentDetailsViewProps) {
  const booking = payment.booking;
  const bookingPaymentStatus = booking?.paymentStatus ?? payment.status;

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <Link
          href="/dashboard/admin/payments"
          className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to payments
        </Link>

        <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Payment details</h2>
              <p className="text-sm text-muted-foreground break-all">
                Payment ID: {payment.id}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                Payment Status
              </p>
              <PaymentStatusBadge status={payment.status} />
            </div>
          </div>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Payment Summary
            </h3>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">Amount</dt>
                <dd className="font-medium">{formatCurrency(payment.amount)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Method</dt>
                <dd className="font-medium">{payment.paymentMethod || "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Transaction ID</dt>
                <dd className="font-medium break-all">
                  {payment.transactionId || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Paid At</dt>
                <dd className="font-medium">{formatDateTime(payment.paidAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Created At</dt>
                <dd className="font-medium">{formatDateTime(payment.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Updated At</dt>
                <dd className="font-medium">{formatDateTime(payment.updatedAt)}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Linked Booking
            </h3>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Booking ID</dt>
                <dd className="font-medium break-all">{payment.bookingId}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Booking Status</dt>
                <dd>
                  {booking ? (
                    <BookingStatusBadge status={booking.bookingStatus} />
                  ) : (
                    "—"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Payment Status</dt>
                <dd>
                  <PaymentStatusBadge status={bookingPaymentStatus} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Start Time</dt>
                <dd className="font-medium">
                  {booking ? formatDateTime(booking.startTime) : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">End Time</dt>
                <dd className="font-medium">
                  {booking ? formatDateTime(booking.endTime) : "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Service Address</dt>
                <dd className="font-medium">{booking?.serviceAddress || "—"}</dd>
              </div>
            </dl>
          </article>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              People
            </h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Customer</dt>
                <dd className="font-medium">{booking?.user?.name || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Vendor</dt>
                <dd className="font-medium">{booking?.vendor?.vendorName || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Employee</dt>
                <dd className="font-medium">{booking?.employee?.user?.name || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Category</dt>
                <dd className="font-medium">
                  {booking?.employee?.serviceCategory?.name || "—"}
                </dd>
              </div>
            </dl>
          </article>
        </aside>
      </div>
    </section>
  );
}
