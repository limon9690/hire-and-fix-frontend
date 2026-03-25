import Link from "next/link";
import { notFound } from "next/navigation";
import { UserBookingDetails } from "@/components/dashboard/bookings/user-booking-details";
import { getUserBookingDetails } from "@/lib/dashboard/user-booking-details";

type UserBookingDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserBookingDetailsPage({
  params,
}: UserBookingDetailsPageProps) {
  const { id } = await params;
  const { data, error, notFound: isNotFound } = await getUserBookingDetails(id);

  if (isNotFound) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/user/bookings"
        className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Back to bookings
      </Link>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {data ? <UserBookingDetails booking={data} /> : null}
    </div>
  );
}
