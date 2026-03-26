export default function EmployeeBookingDetailsLoading() {
  return (
    <section className="space-y-4">
      <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
      <div className="h-28 animate-pulse rounded-xl bg-muted" />
      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <div className="h-44 animate-pulse rounded-xl bg-muted" />
          <div className="h-44 animate-pulse rounded-xl bg-muted" />
          <div className="h-44 animate-pulse rounded-xl bg-muted" />
        </div>
        <div className="h-60 animate-pulse rounded-xl bg-muted" />
      </div>
    </section>
  );
}
