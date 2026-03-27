import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import { ApiError } from "@/lib/api/types";
import type { MyBookingItem } from "@/lib/dashboard/booking/types";

export type BookingDetails = MyBookingItem & {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

type UserBookingDetailsResult =
  | { data: BookingDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getUserBookingDetails = async (
  bookingId: string
): Promise<UserBookingDetailsResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: null,
      error: SESSION_EXPIRED_MESSAGE,
      notFound: false,
    };
  }

  try {
    const data = await apiFetch<BookingDetails>(`/bookings/${bookingId}`, {
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
