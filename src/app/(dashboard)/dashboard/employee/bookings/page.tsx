import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import { ListPagination } from "@/components/shared/list/list-pagination";
import { EmployeeBookingsList } from "@/components/dashboard/employee/bookings/employee-bookings-list";
import type { BookingSortBy } from "@/lib/dashboard/booking/types";
import { getEmployeeBookings } from "@/lib/dashboard/employee/bookings/employee-bookings";

type EmployeeBookingsPageProps = {
  searchParams: Promise<{
    bookingStatus?: string;
    paymentStatus?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
  }>;
};

const parsePage = (value: string | undefined) => {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
};

const parseSortBy = (value: string | undefined): BookingSortBy => {
  if (
    value === "createdAt" ||
    value === "startTime" ||
    value === "endTime" ||
    value === "totalPrice"
  ) {
    return value;
  }
  return "createdAt";
};

const parseSortOrder = (value: string | undefined): "asc" | "desc" => {
  return value === "asc" ? "asc" : "desc";
};

export default async function EmployeeBookingsPage({
  searchParams,
}: EmployeeBookingsPageProps) {
  const params = await searchParams;
  const bookingStatus = params.bookingStatus ?? "";
  const paymentStatus = params.paymentStatus ?? "";
  const sortBy = parseSortBy(params.sortBy);
  const sortOrder = parseSortOrder(params.sortOrder);
  const page = parsePage(params.page);

  const { data, meta, error } = await getEmployeeBookings({
    bookingStatus,
    paymentStatus,
    sortBy,
    sortOrder,
    page,
    limit: 10,
  });

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Assigned Bookings</h2>
        <p className="text-sm text-muted-foreground">
          Track bookings assigned to you and review service timelines.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <ListFiltersBar
            action="/dashboard/employee/bookings"
            resetHref="/dashboard/employee/bookings"
            submitLabel="Apply"
            hiddenFields={[{ name: "page", value: "1" }]}
            selectFields={[
              {
                name: "bookingStatus",
                label: "Booking status",
                defaultValue: bookingStatus,
                options: [
                  { value: "", label: "All statuses" },
                  { value: "PENDING", label: "Pending" },
                  { value: "ACCEPTED", label: "Accepted" },
                  { value: "IN_PROGRESS", label: "In progress" },
                  { value: "COMPLETED", label: "Completed" },
                  { value: "REJECTED", label: "Rejected" },
                  { value: "CANCELLED", label: "Cancelled" },
                ],
              },
              {
                name: "paymentStatus",
                label: "Payment status",
                defaultValue: paymentStatus,
                options: [
                  { value: "", label: "All statuses" },
                  { value: "PENDING", label: "Pending" },
                  { value: "SUCCESSFUL", label: "Successful" },
                  { value: "FAILED", label: "Failed" },
                ],
              },
              {
                name: "sortBy",
                label: "Sort by",
                defaultValue: sortBy,
                options: [
                  { value: "createdAt", label: "Created date" },
                  { value: "startTime", label: "Start time" },
                  { value: "endTime", label: "End time" },
                  { value: "totalPrice", label: "Total price" },
                ],
              },
              {
                name: "sortOrder",
                label: "Sort order",
                defaultValue: sortOrder,
                options: [
                  { value: "desc", label: "Descending" },
                  { value: "asc", label: "Ascending" },
                ],
              },
            ]}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!error ? <EmployeeBookingsList bookings={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} bookings.
          </p>
          <ListPagination
            page={meta.page}
            totalPages={meta.totalPages}
            basePath="/dashboard/employee/bookings"
            preservedParams={{
              bookingStatus,
              paymentStatus,
              sortBy,
              sortOrder,
            }}
          />
        </>
      ) : null}
    </section>
  );
}
