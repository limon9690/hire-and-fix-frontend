"use server";

import { apiFetch } from "@/lib/api/client";
import {
  getSessionAuthHeader,
  SESSION_EXPIRED_MESSAGE,
} from "@/lib/server/session-auth";

type BookingActionResult = {
  success: boolean;
  message: string;
};

export const cancelBookingAction = async (
  bookingId: string
): Promise<BookingActionResult> => {
  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return {
      success: false,
      message: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    await apiFetch<unknown>(`/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      headers: authHeader,
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
