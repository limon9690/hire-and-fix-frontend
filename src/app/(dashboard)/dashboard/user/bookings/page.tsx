import { UserBookingsFilters } from "@/components/dashboard/bookings/user-bookings-filters";
import { UserBookingsList } from "@/components/dashboard/bookings/user-bookings-list";
import { UserBookingsPagination } from "@/components/dashboard/bookings/user-bookings-pagination";
import type { BookingSortBy } from "@/lib/dashboard/booking-types";
import { getUserBookings } from "@/lib/dashboard/user-bookings";

type UserBookingsPageProps = {
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

export default async function UserBookingsPage({
  searchParams,
}: UserBookingsPageProps) {
  const params = await searchParams;
  const bookingStatus = params.bookingStatus ?? "";
  const paymentStatus = params.paymentStatus ?? "";
  const sortBy = parseSortBy(params.sortBy);
  const sortOrder = parseSortOrder(params.sortOrder);
  const page = parsePage(params.page);

  const { data, meta, error } = await getUserBookings({
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
        <h2 className="text-2xl font-semibold tracking-tight">My Bookings</h2>
        <p className="text-sm text-muted-foreground">
          View, pay, and manage your service bookings.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[860px]">
          <UserBookingsFilters
            bookingStatus={bookingStatus}
            paymentStatus={paymentStatus}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!error ? <UserBookingsList bookings={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} bookings.
          </p>
          <UserBookingsPagination
            page={meta.page}
            totalPages={meta.totalPages}
            bookingStatus={bookingStatus}
            paymentStatus={paymentStatus}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </>
      ) : null}
    </section>
  );
}
