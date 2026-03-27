import { notFound } from "next/navigation";
import { AdminBookingDetailsView } from "@/components/dashboard/admin/bookings/admin-booking-details";
import { getAdminBookingDetails } from "@/lib/dashboard/admin/bookings/admin-booking-details";

type AdminBookingDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminBookingDetailsPage({
  params,
}: AdminBookingDetailsPageProps) {
  const { id } = await params;
  const { data, error, notFound: isNotFound } = await getAdminBookingDetails(id);

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

      {data ? <AdminBookingDetailsView booking={data} /> : null}
    </div>
  );
}
