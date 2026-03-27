import type { BookingStatus, PaymentStatus } from "@/lib/dashboard/booking-types";

type BadgeVariant = "neutral" | "success" | "warning" | "danger";

const variantClassMap: Record<BadgeVariant, string> = {
  neutral: "border-border bg-muted text-foreground",
  success:
    "border-emerald-300/70 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warning:
    "border-amber-300/70 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  danger: "border-rose-300/70 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

const labelize = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");

const getBookingVariant = (status: BookingStatus): BadgeVariant => {
  switch (status) {
    case "COMPLETED":
      return "success";
    case "IN_PROGRESS":
    case "ACCEPTED":
      return "warning";
    case "CANCELLED":
    case "REJECTED":
      return "danger";
    default:
      return "neutral";
  }
};

const getPaymentVariant = (status: PaymentStatus): BadgeVariant => {
  switch (status) {
    case "PAID":
    case "SUCCESSFUL":
      return "success";
    case "PENDING":
    case "UNPAID":
      return "warning";
    case "FAILED":
    case "REFUNDED":
      return "danger";
    default:
      return "neutral";
  }
};

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const variant = getBookingVariant(status);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${variantClassMap[variant]}`}
    >
      {labelize(status)}
    </span>
  );
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const variant = getPaymentVariant(status);
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${variantClassMap[variant]}`}
    >
      {labelize(status)}
    </span>
  );
}
