export default function VendorDashboardSummaryLoading() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-72 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-4 space-y-3"
          >
            <div className="h-3 w-28 animate-pulse rounded-md bg-muted" />
            <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
