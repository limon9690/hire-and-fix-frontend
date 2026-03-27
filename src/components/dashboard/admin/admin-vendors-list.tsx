import type { AdminVendorListItem } from "@/lib/dashboard/admin-vendors";
import { AdminVendorCard } from "./admin-vendor-card";

type AdminVendorsListProps = {
  vendors: AdminVendorListItem[];
};

export function AdminVendorsList({ vendors }: AdminVendorsListProps) {
  if (vendors.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight">No vendors found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Vendor profiles will appear here once available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {vendors.map((vendor) => (
        <AdminVendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}
