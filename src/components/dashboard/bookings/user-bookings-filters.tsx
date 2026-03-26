import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import type { BookingSortBy } from "@/lib/dashboard/booking-types";

const BOOKING_STATUS_OPTIONS = [
  { value: "", label: "All booking statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CANCELLED", label: "Cancelled" },
];

const PAYMENT_STATUS_OPTIONS = [
  { value: "", label: "All payment statuses" },
  { value: "PENDING", label: "Pending" },
  { value: "SUCCESSFUL", label: "Successful" },
  { value: "FAILED", label: "Failed" },
];

const SORT_BY_OPTIONS: Array<{ value: BookingSortBy; label: string }> = [
  { value: "createdAt", label: "Created time" },
  { value: "startTime", label: "Start time" },
  { value: "endTime", label: "End time" },
  { value: "totalPrice", label: "Total price" },
];

const SORT_ORDER_OPTIONS = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

type UserBookingsFiltersProps = {
  bookingStatus: string;
  paymentStatus: string;
  sortBy: BookingSortBy;
  sortOrder: "asc" | "desc";
};

export function UserBookingsFilters({
  bookingStatus,
  paymentStatus,
  sortBy,
  sortOrder,
}: UserBookingsFiltersProps) {
  return (
    <ListFiltersBar
      action="/dashboard/user/bookings"
      resetHref="/dashboard/user/bookings"
      submitLabel="Apply"
      hiddenFields={[{ name: "page", value: "1" }]}
      selectFields={[
        {
          name: "bookingStatus",
          label: "Booking Status",
          defaultValue: bookingStatus,
          options: BOOKING_STATUS_OPTIONS,
        },
        {
          name: "paymentStatus",
          label: "Payment Status",
          defaultValue: paymentStatus,
          options: PAYMENT_STATUS_OPTIONS,
        },
        {
          name: "sortBy",
          label: "Sort By",
          defaultValue: sortBy,
          options: SORT_BY_OPTIONS,
        },
        {
          name: "sortOrder",
          label: "Order",
          defaultValue: sortOrder,
          options: SORT_ORDER_OPTIONS,
        },
      ]}
    />
  );
}
