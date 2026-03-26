import { notFound } from "next/navigation";
import { VendorBookingDetailsView } from "@/components/dashboard/bookings/vendor-booking-details";
import { getVendorBookingDetails } from "@/lib/dashboard/vendor-booking-details";

type VendorBookingDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function VendorBookingDetailsPage({
  params,
}: VendorBookingDetailsPageProps) {
  const { id } = await params;
  const { data, error, notFound: isNotFound } = await getVendorBookingDetails(id);

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

      {data ? <VendorBookingDetailsView booking={data} /> : null}
    </div>
  );
}
