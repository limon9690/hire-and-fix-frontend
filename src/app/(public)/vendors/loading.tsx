export default function VendorsLoadingPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <div className="h-8 w-56 animate-pulse rounded bg-muted" />
        <div className="h-4 w-full max-w-2xl animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-[1fr_220px_auto_auto]">
        <div className="h-14 animate-pulse rounded bg-muted" />
        <div className="h-14 animate-pulse rounded bg-muted" />
        <div className="h-14 animate-pulse rounded bg-muted" />
        <div className="h-14 animate-pulse rounded bg-muted" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-xl border border-border bg-card"
          />
        ))}
      </div>
    </section>
  );
}
