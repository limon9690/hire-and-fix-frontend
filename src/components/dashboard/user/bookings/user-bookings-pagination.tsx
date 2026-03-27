import { ListPagination } from "@/components/shared/list/list-pagination";
import type { BookingSortBy } from "@/lib/dashboard/booking/types";

type UserBookingsPaginationProps = {
  page: number;
  totalPages: number;
  bookingStatus: string;
  paymentStatus: string;
  sortBy: BookingSortBy;
  sortOrder: "asc" | "desc";
};

export function UserBookingsPagination({
  page,
  totalPages,
  bookingStatus,
  paymentStatus,
  sortBy,
  sortOrder,
}: UserBookingsPaginationProps) {
  return (
    <ListPagination
      page={page}
      totalPages={totalPages}
      basePath="/dashboard/user/bookings"
      preservedParams={{
        bookingStatus,
        paymentStatus,
        sortBy: sortBy === "createdAt" ? undefined : sortBy,
        sortOrder: sortOrder === "desc" ? undefined : sortOrder,
      }}
    />
  );
}
