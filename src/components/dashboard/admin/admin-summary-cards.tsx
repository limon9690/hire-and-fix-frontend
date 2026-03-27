import type { AdminDashboardSummary } from "@/lib/dashboard/admin/summary";

type AdminSummaryCardsProps = {
  summary: AdminDashboardSummary;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function AdminSummaryCards({ summary }: AdminSummaryCardsProps) {
  const cards = [
    { label: "Total Users", value: String(summary.totalUsers) },
    { label: "Total Vendors", value: String(summary.totalVendors) },
    { label: "Total Employees", value: String(summary.totalEmployees) },
    { label: "Total Admins", value: String(summary.totalAdmins) },
    { label: "Total Bookings", value: String(summary.totalBookings) },
    { label: "Pending Bookings", value: String(summary.pendingBookings) },
    { label: "Completed Bookings", value: String(summary.completedBookings) },
    { label: "Cancelled Bookings", value: String(summary.cancelledBookings) },
    { label: "Total Payments", value: String(summary.totalPayments) },
    { label: "Pending Payments", value: String(summary.pendingPayments) },
    { label: "Failed Payments", value: String(summary.failedPayments) },
    { label: "Approved Vendors", value: String(summary.approvedVendors) },
    { label: "Total Revenue", value: formatCurrency(summary.totalRevenue) },
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
          <p className="mt-2 text-2xl font-semibold tracking-tight">{card.value}</p>
        </article>
      ))}
    </div>
  );
}
