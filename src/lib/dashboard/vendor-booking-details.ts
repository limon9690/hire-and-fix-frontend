import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";
import type { MyBookingItem } from "./booking-types";

export type VendorBookingDetails = MyBookingItem;

type VendorBookingDetailsResult =
  | { data: VendorBookingDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getVendorBookingDetails = async (
  bookingId: string
): Promise<VendorBookingDetailsResult> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      data: null,
      error: "Session is missing. Please log in again.",
      notFound: false,
    };
  }

  try {
    const data = await apiFetch<VendorBookingDetails>(`/bookings/${bookingId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
