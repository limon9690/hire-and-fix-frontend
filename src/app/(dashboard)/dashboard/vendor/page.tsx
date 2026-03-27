import { VendorSummaryCards } from "@/components/dashboard/vendor/vendor-summary-cards";
import { getVendorDashboardSummary } from "@/lib/dashboard/vendor/summary";

export default async function VendorDashboardSummaryPage() {
  const { data, error } = await getVendorDashboardSummary();

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          Vendor Dashboard Summary
        </h2>
        <p className="text-sm text-muted-foreground">
          Quick snapshot of your team, bookings, revenue, and reviews.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {data ? <VendorSummaryCards summary={data} /> : null}
    </section>
  );
}
