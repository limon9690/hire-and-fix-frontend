import Link from "next/link";
import { PayNowButton } from "@/components/payments/pay-now-button";
import { canPayForBooking } from "@/lib/dashboard/booking-rules";
import { getUserBookingDetails } from "@/lib/dashboard/user-booking-details";
import { PaymentStatusBadge } from "@/components/dashboard/bookings/booking-status-badge";

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    bookingId?: string;
    booking_id?: string;
  }>;
};

const normalizeStatusLabel = (value: string | null | undefined) => {
  if (!value) {
    return "Unknown";
  }
  return value
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
};

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const params = await searchParams;
  const bookingId = params.bookingId?.trim() || params.booking_id?.trim() || "";

  if (!bookingId) {
    return (
      <section className="mx-auto max-w-2xl space-y-4 rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Payment Submitted</h1>
        <p className="text-sm text-muted-foreground">
          We could not find a booking reference in the return URL. Please check
          your bookings to confirm the latest payment status.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/user/bookings"
            className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Go to My Bookings
          </Link>
          <Link
            href="/services"
            className="inline-flex h-9 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Browse Services
          </Link>
        </div>
      </section>
    );
  }

  const { data, error, notFound } = await getUserBookingDetails(bookingId);

  if (notFound) {
    return (
      <section className="mx-auto max-w-2xl space-y-4 rounded-xl border border-border bg-card p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Payment Submitted</h1>
        <p className="text-sm text-muted-foreground">
          Booking was not found. Please check your bookings page for the latest
          status.
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

  if (!data) {
    return (
      <section className="mx-auto max-w-2xl space-y-4 rounded-xl border border-destructive/30 bg-destructive/10 p-6">
        <h1 className="text-2xl font-semibold tracking-tight text-destructive">
          Unable To Verify Payment
        </h1>
        <p className="text-sm text-destructive/90">
          {error || "Please open your bookings page and refresh the status."}
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
        <h1 className="text-2xl font-semibold tracking-tight">Payment Result</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We re-checked your booking after checkout.
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
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Current Value
            </dt>
            <dd className="mt-1 text-sm font-medium">
              {normalizeStatusLabel(paymentStatus)}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
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
          {canRetryPayment ? (
            <PayNowButton
              bookingId={data.id}
              className="h-9 cursor-pointer rounded-lg px-3 text-sm font-medium"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
