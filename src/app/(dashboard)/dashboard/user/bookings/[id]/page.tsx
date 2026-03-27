import { notFound } from "next/navigation";
import { UserBookingDetails } from "@/components/dashboard/user/bookings/user-booking-details";
import { getUserBookingDetails } from "@/lib/dashboard/user/bookings/user-booking-details";

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
      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {data ? <UserBookingDetails booking={data} /> : null}
    </div>
  );
}
