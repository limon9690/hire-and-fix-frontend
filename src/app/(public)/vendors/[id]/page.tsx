import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVendorById } from "@/lib/public/vendors";

type VendorDetailsPageProps = {
  params: Promise<{ id: string }>;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }
  return date.toLocaleDateString();
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? "").join("");
};

export default async function VendorDetailsPage({ params }: VendorDetailsPageProps) {
  const { id } = await params;
  const result = await getVendorById(id);

  if ("notFound" in result && result.notFound) {
    notFound();
  }

  if (!result.data) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Vendor Details</h1>
        <p className="text-sm text-destructive">
          {result.error || "Unable to load vendor details."}
        </p>
      </section>
    );
  }

  const vendor = result.data;
  const vendorName = vendor.vendorName || "Vendor";
  const ownerName = vendor.user?.name || "Owner not listed";
  const ownerEmail = vendor.user?.email || "Email not listed";
  const phone = vendor.phone || "Phone not listed";
  const address = vendor.address || "Address not listed";
  const averageRating = vendor.reviewSummary?.averageRating ?? 0;
  const totalReviews = vendor.reviewSummary?.totalReviews ?? 0;
  const employeeCount = vendor.reviewSummary?.employeeCount ?? 0;
  const description =
    vendor.description || "This vendor has not added company details yet.";

  return (
    <div className="space-y-6">
      <Link
        href="/vendors"
        className="inline-flex text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Back to vendors
      </Link>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
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
              <h1 className="text-3xl font-semibold tracking-tight">{vendorName}</h1>
              <p className="text-sm text-muted-foreground">{ownerName}</p>
              <p className="text-sm text-muted-foreground">
                {totalReviews > 0
                  ? `★ ${averageRating.toFixed(1)} (${totalReviews} review${totalReviews > 1 ? "s" : ""})`
                  : "No ratings yet"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full border border-border px-3 py-1 text-xs ${
                  vendor.isApproved
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {vendor.isApproved ? "Approved vendor" : "Approval pending"}
              </span>
              <span
                className={`rounded-full border border-border px-3 py-1 text-xs ${
                  vendor.isActive
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {vendor.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/80">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs text-muted-foreground">Team size</p>
            <p className="text-sm font-medium">
              {employeeCount} employee{employeeCount === 1 ? "" : "s"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs text-muted-foreground">Email</p>
            <p className="text-sm font-medium">{ownerEmail}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs text-muted-foreground">Address</p>
            <p className="text-sm font-medium">{address}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs text-muted-foreground">Updated</p>
            <p className="text-sm font-medium">{formatDate(vendor.updatedAt)}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid items-start gap-5 lg:grid-cols-[1fr_320px]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>About Company</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{description}</p>
          </CardContent>
        </Card>

        <Card className="h-fit border-border/80 lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle>Contact This Vendor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Reach out to discuss services, schedule, and availability by phone or email.
            </p>
            <Link
              href="/services"
              className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-transparent bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Browse Professionals
            </Link>
            <Link
              href="/vendors"
              className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Back to Vendors
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
