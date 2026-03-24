import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VendorCard } from "@/components/public/vendor-card";
import type { VendorCardItem } from "@/lib/public/vendors";

type VendorsListProps = {
  vendors: VendorCardItem[];
  error: string | null;
};

export function VendorsList({ vendors, error }: VendorsListProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Could not load vendors</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        No vendors found yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {vendors.map((vendor) => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
}
