import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import { ListPagination } from "@/components/shared/list/list-pagination";
import { AdminBookingsList } from "@/components/dashboard/admin/bookings/admin-bookings-list";
import { getAdminBookings } from "@/lib/dashboard/admin/bookings/admin-bookings";

type AdminBookingsPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
    bookingStatus?: string;
    paymentStatus?: string;
    sort?: string;
    page?: string;
  }>;
};

type AdminBookingsSortValue =
  | "latest"
  | "oldest"
  | "startAsc"
  | "startDesc"
  | "endAsc"
  | "endDesc"
  | "priceAsc"
  | "priceDesc"
  | "bookingStatusAsc"
  | "bookingStatusDesc"
  | "paymentStatusAsc"
  | "paymentStatusDesc";

const parsePage = (value: string | undefined) => {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
};

const parseSort = (value: string | undefined): AdminBookingsSortValue => {
  if (
    value === "latest" ||
    value === "oldest" ||
    value === "startAsc" ||
    value === "startDesc" ||
    value === "endAsc" ||
    value === "endDesc" ||
    value === "priceAsc" ||
    value === "priceDesc" ||
    value === "bookingStatusAsc" ||
    value === "bookingStatusDesc" ||
    value === "paymentStatusAsc" ||
    value === "paymentStatusDesc"
  ) {
    return value;
  }

  return "latest";
};

const getSortQuery = (sort: AdminBookingsSortValue) => {
  switch (sort) {
    case "oldest":
      return { sortBy: "createdAt" as const, sortOrder: "asc" as const };
    case "startAsc":
      return { sortBy: "startTime" as const, sortOrder: "asc" as const };
    case "startDesc":
      return { sortBy: "startTime" as const, sortOrder: "desc" as const };
    case "endAsc":
      return { sortBy: "endTime" as const, sortOrder: "asc" as const };
    case "endDesc":
      return { sortBy: "endTime" as const, sortOrder: "desc" as const };
    case "priceAsc":
      return { sortBy: "totalPrice" as const, sortOrder: "asc" as const };
    case "priceDesc":
      return { sortBy: "totalPrice" as const, sortOrder: "desc" as const };
    case "bookingStatusAsc":
      return { sortBy: "bookingStatus" as const, sortOrder: "asc" as const };
    case "bookingStatusDesc":
      return { sortBy: "bookingStatus" as const, sortOrder: "desc" as const };
    case "paymentStatusAsc":
      return { sortBy: "paymentStatus" as const, sortOrder: "asc" as const };
    case "paymentStatusDesc":
      return { sortBy: "paymentStatus" as const, sortOrder: "desc" as const };
    case "latest":
    default:
      return { sortBy: "createdAt" as const, sortOrder: "desc" as const };
  }
};

export default async function AdminBookingsPage({
  searchParams,
}: AdminBookingsPageProps) {
  const params = await searchParams;
  const searchTerm = params.searchTerm?.trim() ?? "";
  const bookingStatus = params.bookingStatus ?? "";
  const paymentStatus = params.paymentStatus ?? "";
  const sort = parseSort(params.sort);
  const page = parsePage(params.page);
  const { sortBy, sortOrder } = getSortQuery(sort);

  const { data, meta, error } = await getAdminBookings({
    searchTerm,
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
          Monitor platform-wide bookings across users, vendors, and employees.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[960px]">
          <ListFiltersBar
            action="/dashboard/admin/bookings"
            resetHref="/dashboard/admin/bookings"
            submitLabel="Apply"
            hiddenFields={[{ name: "page", value: "1" }]}
            searchField={{
              name: "searchTerm",
              label: "Search",
              placeholder: "Search by customer, vendor, employee, or category",
              defaultValue: searchTerm,
            }}
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
                name: "sort",
                label: "Sort",
                defaultValue: sort,
                options: [
                  { value: "latest", label: "Latest" },
                  { value: "oldest", label: "Oldest" },
                  { value: "startAsc", label: "Start time: Earliest" },
                  { value: "startDesc", label: "Start time: Latest" },
                  { value: "endAsc", label: "End time: Earliest" },
                  { value: "endDesc", label: "End time: Latest" },
                  { value: "priceAsc", label: "Total price: Low to High" },
                  { value: "priceDesc", label: "Total price: High to Low" },
                  { value: "bookingStatusAsc", label: "Booking status: A to Z" },
                  { value: "bookingStatusDesc", label: "Booking status: Z to A" },
                  { value: "paymentStatusAsc", label: "Payment status: A to Z" },
                  { value: "paymentStatusDesc", label: "Payment status: Z to A" },
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

      {!error ? <AdminBookingsList bookings={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} bookings.
          </p>
          <ListPagination
            page={meta.page}
            totalPages={meta.totalPages}
            basePath="/dashboard/admin/bookings"
            preservedParams={{
              searchTerm,
              bookingStatus,
              paymentStatus,
              sort,
            }}
          />
        </>
      ) : null}
    </section>
  );
}
