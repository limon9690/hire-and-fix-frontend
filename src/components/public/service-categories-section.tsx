import Link from "next/link";
import { ServiceCategoriesCarousel } from "@/components/public/service-categories-carousel";
import { getServiceCategories } from "@/lib/public/service-categories";

export async function ServiceCategoriesSection() {
  const { data: categories, error } = await getServiceCategories();

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Popular Services
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Find the right help for every home task.
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Browse top service categories and connect with trusted professionals
            in just a few clicks.
          </p>
        </div>
        <Link
          href="/services"
          className="hidden rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
        >
          View all services
        </Link>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!error && categories.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
          Service categories will be available soon.
        </div>
      ) : null}

      {!error && categories.length > 0 ? (
        <ServiceCategoriesCarousel categories={categories.slice(0, 6)} />
      ) : null}

      <div className="sm:hidden">
        <Link
          href="/services"
          className="inline-flex rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all services
        </Link>
      </div>
    </section>
  );
}
