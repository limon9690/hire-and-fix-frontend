"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

type BookingActionResult = {
  success: boolean;
  message: string;
};

export const cancelBookingAction = async (
  bookingId: string
): Promise<BookingActionResult> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    await apiFetch<unknown>(`/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    return {
      success: true,
      message: "Booking cancelled successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to cancel booking.",
    };
  }
};
