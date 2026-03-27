import type { MyBookingItem } from "@/lib/dashboard/booking/types";
import { EmployeeBookingCard } from "./employee-booking-card";

type EmployeeBookingsListProps = {
  bookings: MyBookingItem[];
};

export function EmployeeBookingsList({ bookings }: EmployeeBookingsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight">
          No assigned bookings yet
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Bookings assigned to you will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-muted/20 p-2">
      <div className="space-y-5">
        {bookings.map((booking) => (
          <EmployeeBookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
