import Link from "next/link";
import { AdminVendorApprovalButton } from "@/components/dashboard/admin/vendors/admin-vendor-approval-button";
import type { AdminVendorDetails } from "@/lib/dashboard/admin/vendors/admin-vendors";

type AdminVendorDetailsViewProps = {
  vendor: AdminVendorDetails;
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export function AdminVendorDetailsView({ vendor }: AdminVendorDetailsViewProps) {
  const vendorName = vendor.vendorName || "Vendor";
  const ownerName = vendor.user?.name || "Owner not listed";
  const ownerEmail = vendor.user?.email || "Email not listed";
  const phone = vendor.phone || "Phone not listed";
  const address = vendor.address || "Address not listed";
  const description = vendor.description || "No description added yet.";
  const averageRating = vendor.reviewSummary?.averageRating ?? null;
  const totalReviews = vendor.reviewSummary?.totalReviews ?? 0;
  const employeeCount = vendor.reviewSummary?.employeeCount ?? 0;

  return (
    <section className="space-y-6">
      <Link
        href="/dashboard/admin/vendors"
        className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Back to Manage Vendors
      </Link>

      <article className="rounded-xl border border-border bg-card p-5">
        <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          {vendor.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={vendor.logo}
              alt={vendorName}
              className="h-28 w-28 rounded-2xl object-cover ring-1 ring-border"
            />
          ) : (
            <div className="inline-flex h-28 w-28 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-semibold text-primary ring-1 ring-border">
              {getInitials(vendorName) || "VD"}
            </div>
          )}

          <div className="space-y-3">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">{vendorName}</h2>
              <p className="text-sm text-muted-foreground">Owner: {ownerName}</p>
              <p className="text-sm text-muted-foreground break-all">{ownerEmail}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-medium ${
                  vendor.isApproved
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {vendor.isApproved ? "Approved" : "Pending approval"}
              </span>
              <span
                className={`inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs font-medium ${
                  vendor.isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {vendor.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div>
              <AdminVendorApprovalButton
                vendorId={vendor.id}
                currentIsApproved={vendor.isApproved}
              />
            </div>
          </div>
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
          <p className="mt-1 text-sm font-medium">{phone}</p>
        </article>
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Address</p>
          <p className="mt-1 text-sm font-medium">{address}</p>
        </article>
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Average Rating
          </p>
          <p className="mt-1 text-sm font-medium">
            {averageRating !== null ? `${averageRating.toFixed(1)} / 5` : "No ratings"}
          </p>
        </article>
        <article className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Reviews / Employees
          </p>
          <p className="mt-1 text-sm font-medium">
            {totalReviews} review{totalReviews === 1 ? "" : "s"} / {employeeCount} team
            member{employeeCount === 1 ? "" : "s"}
          </p>
        </article>
      </div>

      <article className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          About Company
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </article>

      <article className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Timeline
        </h3>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted-foreground">Created</dt>
            <dd className="font-medium">{formatDateTime(vendor.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Updated</dt>
            <dd className="font-medium">{formatDateTime(vendor.updatedAt)}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
