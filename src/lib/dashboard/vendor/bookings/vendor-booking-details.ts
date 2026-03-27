import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import { ApiError } from "@/lib/api/types";
import type { MyBookingItem } from "@/lib/dashboard/booking/types";

export type VendorBookingDetails = MyBookingItem;

type VendorBookingDetailsResult =
  | { data: VendorBookingDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getVendorBookingDetails = async (
  bookingId: string
): Promise<VendorBookingDetailsResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: null,
      error: SESSION_EXPIRED_MESSAGE,
      notFound: false,
    };
  }

  try {
    const data = await apiFetch<VendorBookingDetails>(`/bookings/${bookingId}`, {
      method: "GET",
      headers: authHeader,
      cache: "no-store",
    });

    return {
      data,
      error: null,
      notFound: false,
    };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return {
        data: null,
        error: "Booking not found.",
        notFound: true,
      };
    }

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load booking details right now.",
      notFound: false,
    };
  }
};
