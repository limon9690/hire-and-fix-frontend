import { cookies } from "next/headers";
import { apiFetchWithMeta } from "@/lib/api/client";
import type { BookingSortBy, MyBookingItem } from "@/lib/dashboard/booking-types";

export type AdminBookingsResult = {
  data: MyBookingItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
};

type GetAdminBookingsOptions = {
  searchTerm?: string;
  bookingStatus?: string;
  paymentStatus?: string;
  sortBy?: BookingSortBy | "bookingStatus" | "paymentStatus";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getAdminBookings = async ({
  searchTerm,
  bookingStatus,
  paymentStatus,
  sortBy = "createdAt",
  sortOrder = "desc",
  page = 1,
  limit = 10,
}: GetAdminBookingsOptions = {}): Promise<AdminBookingsResult> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      data: [],
      meta: { page, limit, total: 0, totalPages: 0 },
      error: "Session is missing. Please log in again.",
    };
  }

  try {
    const response = await apiFetchWithMeta<MyBookingItem[]>("/admin/bookings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      query: {
        searchTerm: searchTerm?.trim() || undefined,
        bookingStatus: bookingStatus?.trim() || undefined,
        paymentStatus: paymentStatus?.trim() || undefined,
        sortBy,
        sortOrder,
        page,
        limit,
      },
      cache: "no-store",
    });

    const meta = response.meta ?? {};
    return {
      data: response.data ?? [],
      meta: {
        page: meta.page ?? 1,
        limit: meta.limit ?? 10,
        total: meta.total ?? response.data.length,
        totalPages: meta.totalPages ?? meta.totalPage ?? 1,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      meta: { page, limit, total: 0, totalPages: 0 },
      error:
        error instanceof Error
          ? error.message
          : "Failed to load bookings. Please try again.",
    };
  }
};
