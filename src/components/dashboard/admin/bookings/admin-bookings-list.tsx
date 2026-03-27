import type { MyBookingItem } from "@/lib/dashboard/booking/types";
import { AdminBookingCard } from "./admin-booking-card";

type AdminBookingsListProps = {
  bookings: MyBookingItem[];
};

export function AdminBookingsList({ bookings }: AdminBookingsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight">No bookings found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Bookings will appear here once users create service requests.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-muted/20 p-2">
      <div className="space-y-5">
        {bookings.map((booking) => (
          <AdminBookingCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}
