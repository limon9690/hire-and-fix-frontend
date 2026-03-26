import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import { ListPagination } from "@/components/shared/list/list-pagination";
import type { BookingSortBy } from "@/lib/dashboard/booking-types";
import { VendorBookingsList } from "@/components/dashboard/bookings/vendor-bookings-list";
import { getVendorBookings } from "@/lib/dashboard/vendor-bookings";

type VendorBookingsPageProps = {
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

export default async function VendorBookingsPage({
  searchParams,
}: VendorBookingsPageProps) {
  const params = await searchParams;
  const bookingStatus = params.bookingStatus ?? "";
  const paymentStatus = params.paymentStatus ?? "";
  const sortBy = parseSortBy(params.sortBy);
  const sortOrder = parseSortOrder(params.sortOrder);
  const page = parsePage(params.page);
  const { data, meta, error } = await getVendorBookings({
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
        <h2 className="text-2xl font-semibold tracking-tight">Manage Bookings</h2>
        <p className="text-sm text-muted-foreground">
          Review customer bookings and prepare status updates.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          <ListFiltersBar
            action="/dashboard/vendor/bookings"
            resetHref="/dashboard/vendor/bookings"
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

      {!error ? <VendorBookingsList bookings={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} bookings.
          </p>
          <ListPagination
            page={meta.page}
            totalPages={meta.totalPages}
            basePath="/dashboard/vendor/bookings"
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
