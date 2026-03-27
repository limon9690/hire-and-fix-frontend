import Link from "next/link";
import { AdminVendorApprovalButton } from "@/components/dashboard/admin/admin-vendor-approval-button";
import type { AdminVendorListItem } from "@/lib/dashboard/admin-vendors";

type AdminVendorCardProps = {
  vendor: AdminVendorListItem;
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
};

export function AdminVendorCard({ vendor }: AdminVendorCardProps) {
  const name = vendor.vendorName || "Vendor";
  const description = vendor.description || "No description available.";

  return (
    <article className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        {vendor.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={vendor.logo}
            alt={name}
            className="h-20 w-20 rounded-2xl object-cover ring-1 ring-border"
          />
        ) : (
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-lg font-semibold text-primary ring-1 ring-border">
            {getInitials(name) || "VD"}
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="truncate text-lg font-semibold tracking-tight">{name}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {vendor.user?.email || "No email"}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">{description}</p>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Phone
          </dt>
          <dd className="mt-1 font-medium">{vendor.phone || "—"}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Address
          </dt>
          <dd className="mt-1 font-medium line-clamp-1">{vendor.address || "—"}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={`rounded-full border border-border px-2.5 py-1 text-xs ${
            vendor.isApproved
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {vendor.isApproved ? "Approved" : "Pending approval"}
        </span>
        <span
          className={`rounded-full border border-border px-2.5 py-1 text-xs ${
            vendor.isActive
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {vendor.isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
        <Link
          href={`/dashboard/admin/vendors/${vendor.id}`}
          className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View Details
        </Link>
        <AdminVendorApprovalButton
          vendorId={vendor.id}
          currentIsApproved={vendor.isApproved}
          compact
        />
      </div>
    </article>
  );
}
