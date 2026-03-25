export default function VendorEmployeesLoading() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="h-8 w-44 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <div className="h-20 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-4 space-y-3"
          >
            <div className="h-6 w-56 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-40 animate-pulse rounded-md bg-muted" />
            <div className="h-14 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
