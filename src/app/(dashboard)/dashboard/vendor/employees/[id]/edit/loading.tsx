export default function VendorEmployeeEditLoading() {
  return (
    <section className="space-y-6 rounded-xl border border-border bg-card p-6">
      <div className="space-y-2">
        <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-16 animate-pulse rounded-md bg-muted" />
        <div className="h-16 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="h-16 animate-pulse rounded-md bg-muted" />
      <div className="h-28 animate-pulse rounded-md bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-16 animate-pulse rounded-md bg-muted" />
        <div className="h-16 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-16 animate-pulse rounded-md bg-muted" />
        <div className="h-16 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
    </section>
  );
}
