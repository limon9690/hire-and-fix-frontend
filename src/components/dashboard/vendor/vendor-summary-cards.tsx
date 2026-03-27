import type { VendorDashboardSummary } from "@/lib/dashboard/vendor/summary";

type VendorSummaryCardsProps = {
  summary: VendorDashboardSummary;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const formatRating = (value: number) =>
  Number.isFinite(value) ? value.toFixed(1) : "0.0";

export function VendorSummaryCards({ summary }: VendorSummaryCardsProps) {
  const cards = [
    { label: "Total Employees", value: String(summary.totalEmployees) },
    { label: "Total Bookings", value: String(summary.totalBookings) },
    { label: "Pending Bookings", value: String(summary.pendingBookings) },
    { label: "Confirmed Bookings", value: String(summary.confirmedBookings) },
    { label: "Completed Bookings", value: String(summary.completedBookings) },
    { label: "Cancelled Bookings", value: String(summary.cancelledBookings) },
    { label: "Total Revenue", value: formatCurrency(summary.totalRevenue) },
    {
      label: "Average Rating",
      value: `${formatRating(summary.reviewSummary.averageRating)} (${summary.reviewSummary.totalReviews} reviews)`,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-xl border border-border bg-card p-4"
        >
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {card.label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">
            {card.value}
          </p>
        </article>
      ))}
    </div>
  );
}
