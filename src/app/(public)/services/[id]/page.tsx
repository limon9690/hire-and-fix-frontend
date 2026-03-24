import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEmployeeById, getEmployeeReviews } from "@/lib/public/employees";

type ServiceDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;
  const [result, reviewsResult] = await Promise.all([
    getEmployeeById(id),
    getEmployeeReviews(id),
  ]);

  if ("notFound" in result && result.notFound) {
    notFound();
  }

  if (!result.data) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">
          Professional Details
        </h1>
        <p className="text-sm text-destructive">
          {result.error || "Unable to load professional details."}
        </p>
      </section>
    );
  }

  const employee = result.data;
  const name = employee.user?.name || "Professional";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  const vendorName = employee.vendor?.vendorName || "Independent";
  const categoryName = employee.serviceCategory?.name || "General Service";
  const rateLabel = employee.hourlyRate ? `$${employee.hourlyRate}` : "N/A";
  const experienceLabel =
    typeof employee.experienceYears === "number"
      ? `${employee.experienceYears} years`
      : "Not listed";
  const locationLabel =
    employee.address || employee.vendor?.address || "Location not listed";
  const phoneLabel = employee.phone || employee.vendor?.phone || "Not available";
  const bioLabel =
    employee.bio ||
    "This professional has not added bio details yet. Please contact vendor for more context.";
  const reviews = reviewsResult.data?.reviews ?? [];
  const averageRating = reviewsResult.data?.averageRating ?? 0;
  const totalReviews = reviewsResult.data?.totalReviews ?? 0;

  const formatReviewDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "Recently";
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <Link
        href="/services"
        className="inline-flex text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Back to services
      </Link>

      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
          {employee.profilePhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={employee.profilePhoto}
              alt={name}
              className="h-28 w-28 rounded-2xl object-cover ring-1 ring-border"
            />
          ) : (
            <div className="inline-flex h-28 w-28 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-semibold text-primary ring-1 ring-border">
              {initials || "PR"}
            </div>
          )}
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>
              <p className="text-sm text-muted-foreground">
                {categoryName} at {vendorName}
              </p>
              <p className="text-sm text-muted-foreground">
                {totalReviews > 0
                  ? `★ ${averageRating.toFixed(1)} (${totalReviews} review${totalReviews > 1 ? "s" : ""})`
                  : "No reviews yet"}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                {rateLabel} / hour
              </span>
              <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                {experienceLabel} experience
              </span>
              <span
                className={`rounded-full border border-border px-3 py-1 text-xs ${
                  employee.isActive
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {employee.isActive ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/80">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs text-muted-foreground">Service</p>
            <p className="text-sm font-medium">{categoryName}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium">{locationLabel}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs text-muted-foreground">Phone</p>
            <p className="text-sm font-medium">{phoneLabel}</p>
          </CardContent>
        </Card>
        <Card className="border-border/80">
          <CardContent className="space-y-1 py-4">
            <p className="text-xs text-muted-foreground">Company</p>
            <p className="text-sm font-medium">{vendorName}</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid items-start gap-5 lg:grid-cols-[1fr_320px]">
        <Card className="border-border/80">
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>{bioLabel}</p>
          </CardContent>
        </Card>

        <Card className="h-fit border-border/80 lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle>Book This Professional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Share your preferred date and task details to start a booking request.
            </p>
            <div className="rounded-lg border border-border bg-background p-3 text-xs text-muted-foreground">
              <p>
                Phone: <span className="font-medium text-foreground">{phoneLabel}</span>
              </p>
              <p className="mt-1">
                Vendor:{" "}
                {employee.vendor?.id ? (
                  <Link
                    href={`/vendors/${employee.vendor.id}`}
                    className="font-medium text-foreground underline-offset-4 hover:underline"
                  >
                    {vendorName}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{vendorName}</span>
                )}
              </p>
            </div>
            <Link
              href={`/bookings/new?employeeId=${employee.id}`}
              className="inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border border-transparent bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Request Booking
            </Link>
            {employee.vendor?.id ? (
              <Link
                href={`/vendors/${employee.vendor.id}`}
                className="inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                View Company Profile
              </Link>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Reviews</h2>
            <p className="text-sm text-muted-foreground">
              {totalReviews > 0
                ? `${averageRating.toFixed(1)} average from ${totalReviews} review${totalReviews > 1 ? "s" : ""}`
                : "No reviews yet"}
            </p>
          </div>
        </div>

        {reviewsResult.error ? (
          <Card className="border-border/80">
            <CardContent className="py-4 text-sm text-muted-foreground">
              {reviewsResult.error}
            </CardContent>
          </Card>
        ) : null}

        {!reviewsResult.error && reviews.length === 0 ? (
          <Card className="border-border/80">
            <CardContent className="py-4 text-sm text-muted-foreground">
              This professional has not received reviews yet.
            </CardContent>
          </Card>
        ) : null}

        {!reviewsResult.error && reviews.length > 0 ? (
          <div className="grid gap-3">
            {reviews.map((review) => (
              <Card key={review.id} className="border-border/80">
                <CardContent className="space-y-2 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">
                      {review.user?.name || "Verified customer"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatReviewDate(review.createdAt)}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-foreground">
                    Rating: {review.rating}/5
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {review.comment || "No written comment provided."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
