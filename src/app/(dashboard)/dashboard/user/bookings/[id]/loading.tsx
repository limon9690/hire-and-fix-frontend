export default function UserBookingDetailsLoading() {
  return (
    <section className="space-y-4">
      <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
      <div className="rounded-xl border border-border bg-card p-4 space-y-4">
        <div className="h-7 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-48 animate-pulse rounded-md bg-muted" />
        <div className="flex gap-2">
          <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-40 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="h-40 animate-pulse rounded-md bg-muted" />
        </div>
      </div>
    </section>
  );
}
