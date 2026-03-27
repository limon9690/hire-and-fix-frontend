"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

const ALLOWED_VENDOR_BOOKING_STATUSES = [
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
] as const;

export type VendorUpdatableBookingStatus =
  (typeof ALLOWED_VENDOR_BOOKING_STATUSES)[number];

type VendorBookingStatusActionResult = {
  success: boolean;
  message: string;
};

export const updateVendorBookingStatusAction = async (
  bookingId: string,
  status: VendorUpdatableBookingStatus
): Promise<VendorBookingStatusActionResult> => {
  if (!bookingId) {
    return {
      success: false,
      message: "Booking id is required.",
    };
  }

  if (!ALLOWED_VENDOR_BOOKING_STATUSES.includes(status)) {
    return {
      success: false,
      message: "Invalid booking status selected.",
    };
  }

  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return {
      success: false,
      message: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    await apiFetch<unknown>(`/bookings/${bookingId}/status`, {
      method: "PATCH",
      headers: authHeader,
      body: {
        bookingStatus: status,
      },
      cache: "no-store",
    });

    return {
      success: true,
      message: "Booking status updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update booking status.",
    };
  }
};
