import Link from "next/link";

const trustChips = [
  "Background-checked pros",
  "Transparent rates",
  "Protected payments",
];

export function HomeCta() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r from-muted/40 via-background to-muted/40 p-6 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute left-6 top-0 h-px w-28 bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />

      <div className="grid items-center gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Next Step
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Need help at home this week?
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            From urgent fixes to planned upgrades, compare local experts and
            confirm appointments quickly.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 lg:items-end">
          <Link
            href="/services"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-transparent bg-primary px-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
          >
            Find Professionals
          </Link>
          <Link
            href="/register/vendor"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-all hover:bg-muted"
          >
            Partner With Us
          </Link>
          <Link
            href="/register/user"
            className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Create customer account
          </Link>
        </div>
      </div>
    </section>
  );
}
