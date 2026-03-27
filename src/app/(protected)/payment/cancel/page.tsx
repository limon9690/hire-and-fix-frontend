import Link from "next/link";
import { PayNowButton } from "@/components/payments/pay-now-button";
import { canPayForBooking } from "@/lib/dashboard/booking/rules";
import { getUserBookingDetails } from "@/lib/dashboard/user/bookings/user-booking-details";
import { PaymentStatusBadge } from "@/components/dashboard/bookings/booking-status-badge";

type CheckoutCancelPageProps = {
  searchParams: Promise<{
    bookingId?: string;
    booking_id?: string;
  }>;
};

export default async function CheckoutCancelPage({
  searchParams,
}: CheckoutCancelPageProps) {
  const params = await searchParams;
  const bookingId = params.bookingId?.trim() || params.booking_id?.trim() || "";

  if (!bookingId) {
    return (
      <section className="mx-auto max-w-2xl space-y-4 rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Payment Cancelled</h1>
        <p className="text-sm text-muted-foreground">
          Your checkout was cancelled. You can try again from your booking page.
        </p>
        <Link
          href="/dashboard/user/bookings"
          className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Go to My Bookings
        </Link>
      </section>
    );
  }

  const { data, error, notFound } = await getUserBookingDetails(bookingId);

  if (notFound || !data) {
    return (
      <section className="mx-auto max-w-2xl space-y-4 rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Payment Cancelled</h1>
        <p className="text-sm text-muted-foreground">
          {error || "Booking could not be loaded. Please check your bookings page."}
        </p>
        <Link
          href="/dashboard/user/bookings"
          className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Go to My Bookings
        </Link>
      </section>
    );
  }

  const paymentStatus = data.payment?.status ?? data.paymentStatus;
  const canRetryPayment = canPayForBooking(data);

  return (
    <section className="mx-auto max-w-3xl space-y-4">
      <div className="rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Payment Cancelled</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          No charge was completed. You can retry checkout for this booking.
        </p>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Booking ID
            </dt>
            <dd className="mt-1 break-all text-sm font-medium">{data.id}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Payment Status
            </dt>
            <dd className="mt-1">
              <PaymentStatusBadge status={paymentStatus} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Professional
            </dt>
            <dd className="mt-1 text-sm font-medium">{data.employee.user.name}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {canRetryPayment ? (
            <PayNowButton
              bookingId={data.id}
              className="h-9 cursor-pointer rounded-lg px-3 text-sm font-medium"
            />
          ) : null}
          <Link
            href={`/dashboard/user/bookings/${data.id}`}
            className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            View Booking
          </Link>
          <Link
            href="/dashboard/user/bookings"
            className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            My Bookings
          </Link>
        </div>
      </div>
    </section>
  );
}
