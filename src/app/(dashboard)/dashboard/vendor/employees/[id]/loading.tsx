export default function VendorEmployeeDetailsLoading() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-52 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-44 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="flex gap-2">
        <div className="h-8 w-36 animate-pulse rounded-md bg-muted" />
        <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-44 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-44 animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-36 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-36 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </section>
  );
}
