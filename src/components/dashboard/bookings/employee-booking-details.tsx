import Link from "next/link";
import type { EmployeeBookingDetails } from "@/lib/dashboard/employee-booking-details";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "./booking-status-badge";
import { EmployeeBookingStatusUpdateControl } from "./employee-booking-status-update-control";

type EmployeeBookingDetailsProps = {
  booking: EmployeeBookingDetails;
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

export function EmployeeBookingDetailsView({
  booking,
}: EmployeeBookingDetailsProps) {
  const paymentStatus = booking.payment?.status ?? booking.paymentStatus;

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <Link
          href="/dashboard/employee/bookings"
          className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to bookings
        </Link>

        <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Booking details</h2>
              <p className="text-sm text-muted-foreground break-all">
                Booking ID: {booking.id}
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="min-w-[150px]">
                <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                  Booking Status
                </p>
                <BookingStatusBadge status={booking.bookingStatus} />
              </div>
              <div className="min-w-[150px]">
                <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                  Payment Status
                </p>
                <PaymentStatusBadge status={paymentStatus} />
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Schedule
            </h3>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">Start Time</dt>
                <dd className="font-medium">{formatDateTime(booking.startTime)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">End Time</dt>
                <dd className="font-medium">{formatDateTime(booking.endTime)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Created At</dt>
                <dd className="font-medium">{formatDateTime(booking.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Updated At</dt>
                <dd className="font-medium">{formatDateTime(booking.updatedAt)}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Service Details
            </h3>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">Service Category</dt>
                <dd className="font-medium">{booking.employee.serviceCategory.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Total Price</dt>
                <dd className="font-medium">{formatCurrency(booking.totalPrice)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Service Address</dt>
                <dd className="font-medium">{booking.serviceAddress || "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Customer Note</dt>
                <dd className="font-medium">{booking.note || "—"}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              People
            </h3>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted-foreground">Customer Name</dt>
                <dd className="font-medium">{booking.user?.name || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Customer Email</dt>
                <dd className="font-medium break-all">{booking.user?.email || "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Your Name</dt>
                <dd className="font-medium">{booking.employee.user.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Your Email</dt>
                <dd className="font-medium break-all">{booking.employee.user.email}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Vendor Name</dt>
                <dd className="font-medium">{booking.vendor.vendorName}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Vendor Phone</dt>
                <dd className="font-medium">{booking.vendor.phone || "—"}</dd>
              </div>
            </dl>
          </article>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-20 xl:self-start">
          <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Actions
            </h3>
            <div className="mt-3">
              <EmployeeBookingStatusUpdateControl
                bookingId={booking.id}
                currentStatus={booking.bookingStatus}
              />
            </div>
          </article>

          <article className="rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Payment
            </h3>
            <dl className="mt-3 space-y-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">Amount</dt>
                <dd className="font-medium">{formatCurrency(booking.totalPrice)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Payment Status</dt>
                <dd>
                  <PaymentStatusBadge status={paymentStatus} />
                </dd>
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
                  {formatDateTime(booking.payment?.paidAt ?? null)}
                </dd>
              </div>
            </dl>
          </article>
        </aside>
      </div>
    </section>
  );
}
