import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

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
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: null,
      error: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    const data = await apiFetch<VendorDashboardSummary>(
      "/vendors/dashboard-summary",
      {
        method: "GET",
        headers: authHeader,
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
