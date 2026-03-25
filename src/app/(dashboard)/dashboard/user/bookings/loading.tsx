export default function UserBookingsLoading() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-card p-4 space-y-4"
          >
            <div className="h-6 w-56 animate-pulse rounded-md bg-muted" />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <div className="h-12 animate-pulse rounded-md bg-muted" />
              <div className="h-12 animate-pulse rounded-md bg-muted" />
              <div className="h-12 animate-pulse rounded-md bg-muted" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
              <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
              <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
