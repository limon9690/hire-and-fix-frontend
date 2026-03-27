import { notFound } from "next/navigation";
import { EmployeeBookingDetailsView } from "@/components/dashboard/employee/bookings/employee-booking-details";
import { getEmployeeBookingDetails } from "@/lib/dashboard/employee/bookings/employee-booking-details";

type EmployeeBookingDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EmployeeBookingDetailsPage({
  params,
}: EmployeeBookingDetailsPageProps) {
  const { id } = await params;
  const { data, error, notFound: isNotFound } = await getEmployeeBookingDetails(id);

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

      {data ? <EmployeeBookingDetailsView booking={data} /> : null}
    </div>
  );
}
