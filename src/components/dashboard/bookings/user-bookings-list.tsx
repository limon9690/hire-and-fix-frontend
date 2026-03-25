import type { MyBookingItem } from "@/lib/dashboard/booking-types";
import { UserBookingCard } from "./user-booking-card";

type UserBookingsListProps = {
  bookings: MyBookingItem[];
};

export function UserBookingsList({ bookings }: UserBookingsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight">No bookings yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your booked services will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <UserBookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
