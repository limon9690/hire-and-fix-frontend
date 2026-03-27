import { AdminSummaryCards } from "@/components/dashboard/admin/admin-summary-cards";
import { getAdminDashboardSummary } from "@/lib/dashboard/admin/summary";

export default async function AdminDashboardSummaryPage() {
  const { data, error } = await getAdminDashboardSummary();

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Admin Dashboard Summary
        </h2>
        <p className="text-sm text-muted-foreground">
          Platform-wide snapshot of users, bookings, payments, and revenue.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {data ? <AdminSummaryCards summary={data} /> : null}
    </section>
  );
}
