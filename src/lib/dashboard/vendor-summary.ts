import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

export type VendorDashboardSummary = {
  totalEmployees: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  reviewSummary: {
    averageRating: number;
    totalReviews: number;
  };
};

export const getVendorDashboardSummary = async (): Promise<{
  data: VendorDashboardSummary | null;
  error: string | null;
}> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      data: null,
      error: "Session is missing. Please log in again.",
    };
  }

  try {
    const data = await apiFetch<VendorDashboardSummary>(
      "/vendors/dashboard-summary",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        cache: "no-store",
      }
    );

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to load dashboard summary.",
    };
  }
};
