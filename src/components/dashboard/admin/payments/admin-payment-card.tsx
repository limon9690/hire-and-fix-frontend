import Link from "next/link";
import type { AdminPaymentItem } from "@/lib/dashboard/admin/payments/admin-payments";
import { PaymentStatusBadge } from "@/components/dashboard/bookings/booking-status-badge";

type AdminPaymentCardProps = {
  payment: AdminPaymentItem;
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

const shorten = (value: string | null | undefined, size = 10) => {
  if (!value) {
    return "—";
  }

  if (value.length <= size * 2) {
    return value;
  }

  return `${value.slice(0, size)}...${value.slice(-size)}`;
};

export function AdminPaymentCard({ payment }: AdminPaymentCardProps) {
  const booking = payment.booking;
  const customerName = booking?.user?.name || "—";
  const vendorName = booking?.vendor?.vendorName || "—";
  const employeeName = booking?.employee?.user?.name || "—";
  const serviceCategory = booking?.employee?.serviceCategory?.name || "—";

  return (
    <article className="rounded-xl border border-border/90 bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">
            Payment {shorten(payment.id, 8)}
          </h3>
          <p className="text-sm text-muted-foreground">
            Booking: {shorten(payment.bookingId, 8)}
          </p>
        </div>
        <div>
          <p className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
            Payment Status
          </p>
          <PaymentStatusBadge status={payment.status} />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Amount
          </p>
          <p className="mt-1 text-sm font-medium">{formatCurrency(payment.amount)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Method
          </p>
          <p className="mt-1 text-sm font-medium">{payment.paymentMethod || "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Paid At
          </p>
          <p className="mt-1 text-sm font-medium">{formatDateTime(payment.paidAt)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Created At
          </p>
          <p className="mt-1 text-sm font-medium">
            {formatDateTime(payment.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-border/70 bg-muted/30 p-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Transaction ID
        </p>
        <p className="mt-1 break-all text-sm font-medium">
          {payment.transactionId || "—"}
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Customer
          </p>
          <p className="mt-1 text-sm font-medium">{customerName}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Vendor</p>
          <p className="mt-1 text-sm font-medium">{vendorName}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Employee
          </p>
          <p className="mt-1 text-sm font-medium">{employeeName}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Category
          </p>
          <p className="mt-1 text-sm font-medium">{serviceCategory}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-border/70 pt-4">
        <Link
          href={`/dashboard/admin/payments/${payment.id}`}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
