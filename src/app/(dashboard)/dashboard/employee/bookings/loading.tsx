export default function EmployeeBookingsLoading() {
  return (
    <section className="space-y-4">
      <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
      <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`employee-booking-loading-${index}`}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="h-5 w-40 animate-pulse rounded-md bg-muted" />
            <div className="mt-3 h-4 w-56 animate-pulse rounded-md bg-muted" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="h-16 animate-pulse rounded-md bg-muted" />
              <div className="h-16 animate-pulse rounded-md bg-muted" />
            </div>
            <div className="mt-4 h-16 animate-pulse rounded-md bg-muted" />
          </div>
        ))}
      </div>
    </section>
  );
}
