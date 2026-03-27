import Link from "next/link";
import { canPayForBooking } from "@/lib/dashboard/booking/rules";
import type { BookingDetails } from "@/lib/dashboard/user/bookings/user-booking-details";
import { PayNowButton } from "@/components/payments/pay-now-button";
import { CreateReviewModal } from "@/components/dashboard/reviews/create-review-modal";
import { UpdateReviewModal } from "@/components/dashboard/reviews/update-review-modal";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "@/components/dashboard/bookings/booking-status-badge";
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
  const canCreateReview = booking.bookingStatus === "COMPLETED" && !booking.review;
  const canUpdateReview = booking.bookingStatus === "COMPLETED" && Boolean(booking.review);

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <Link
          href="/dashboard/user/bookings"
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
                <dt className="text-xs text-muted-foreground">Your Note</dt>
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
                <dt className="text-xs text-muted-foreground">Employee Name</dt>
                <dd className="font-medium">{booking.employee.user.name}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Employee Email</dt>
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
            <div className="mt-3 flex flex-wrap gap-2">
              <CancelBookingButton bookingId={booking.id} />
              {canPayNow ? (
                <PayNowButton
                  bookingId={booking.id}
                  className="h-10 cursor-pointer rounded-lg px-3 text-sm font-medium"
                />
              ) : null}
              {canCreateReview ? (
                <CreateReviewModal
                  bookingId={booking.id}
                  employeeName={booking.employee.user.name}
                />
              ) : null}
              {canUpdateReview && booking.review ? (
                <UpdateReviewModal
                  reviewId={booking.review.id}
                  employeeName={booking.employee.user.name}
                  initialRating={booking.review.rating}
                  initialComment={booking.review.comment}
                />
              ) : null}
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
                  {formatDateTime(booking.payment?.paidAt)}
                </dd>
              </div>
            </dl>
          </article>
        </aside>
      </div>
    </section>
  );
}
