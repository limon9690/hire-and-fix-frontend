import Link from "next/link";
import type { MyBookingItem } from "@/lib/dashboard/booking-types";
import {
  BookingStatusBadge,
  PaymentStatusBadge,
} from "./booking-status-badge";
import { BookingStatusUpdateControl } from "./booking-status-update-control";

type VendorBookingCardProps = {
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

export function VendorBookingCard({ booking }: VendorBookingCardProps) {
  const paymentStatus = booking.payment?.status ?? booking.paymentStatus;

  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Employee Name
            </p>
            <h3 className="truncate text-lg font-semibold tracking-tight">
              {booking.employee.user.name}
            </h3>
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Customer Name
            </p>
            <p className="truncate text-sm font-medium">{booking.user?.name || "—"}</p>
          </div>
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

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Service Category
          </p>
          <p className="mt-1 text-sm font-medium">{booking.employee.serviceCategory.name}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Vendor
          </p>
          <p className="mt-1 text-sm font-medium">{booking.vendor.vendorName}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-border/70 bg-muted/30 p-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Service Address
        </p>
        <p className="mt-1 line-clamp-2 text-sm">{booking.serviceAddress}</p>
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

      <div className="mt-4 border-t border-border/70 pt-4" />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Link
          href={`/dashboard/vendor/bookings/${booking.id}`}
          className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          View Details
        </Link>
        <BookingStatusUpdateControl
          bookingId={booking.id}
          currentStatus={booking.bookingStatus}
        />
      </div>
    </article>
  );
}
