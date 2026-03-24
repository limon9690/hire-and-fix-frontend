import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { VendorCardItem } from "@/lib/public/vendors";

type VendorCardProps = {
  vendor: VendorCardItem;
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? "").join("");
};

export function VendorCard({ vendor }: VendorCardProps) {
  const name = vendor.vendorName || "Vendor";
  const description = vendor.description || "No description available.";

  return (
    <Card className="h-full border-border/80">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
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
          <div>
            <CardTitle className="text-base">{name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="line-clamp-3 text-sm text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
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
      </CardContent>
      <CardFooter>
        <Link
          href={`/vendors/${vendor.id}`}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
