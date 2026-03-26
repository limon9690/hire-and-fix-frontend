import Link from "next/link";
import { CreateBookingForm } from "@/components/bookings/create-booking-form";
import { getEmployeeById } from "@/lib/public/employees";

type NewBookingPageProps = {
  searchParams: Promise<{
    employeeId?: string;
  }>;
};

export default async function NewBookingPage({ searchParams }: NewBookingPageProps) {
  const params = await searchParams;
  const employeeId = params.employeeId?.trim() ?? "";

  if (!employeeId) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Request Booking</h1>
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Employee is required to create a booking. Please select a professional
          first.
        </div>
        <Link
          href="/services"
          className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Browse Services
        </Link>
      </section>
    );
  }

  const result = await getEmployeeById(employeeId);
  const data = result.data;
  const error = result.error;
  const isNotFound = !data && "notFound" in result && Boolean(result.notFound);

  if (!data) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">Request Booking</h1>
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {isNotFound
            ? "Selected professional was not found."
            : error || "Unable to load professional details right now."}
        </div>
        <Link
          href="/services"
          className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Browse Services
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Request Booking</h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Complete the schedule details and submit your request.
      </p>

      <CreateBookingForm
        employee={{
          id: data.id,
          name: data.user?.name || "Professional",
          serviceCategory: data.serviceCategory?.name || "Service",
          vendorName: data.vendor?.vendorName || "Vendor",
          hourlyRate: data.hourlyRate,
        }}
      />
    </section>
  );
}
