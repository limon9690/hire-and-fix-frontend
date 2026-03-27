import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

export type AdminDashboardSummary = {
  totalUsers: number;
  totalVendors: number;
  totalEmployees: number;
  totalAdmins: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalPayments: number;
  pendingPayments: number;
  failedPayments: number;
  approvedVendors: number;
  totalRevenue: number;
};

export const getAdminDashboardSummary = async (): Promise<{
  data: AdminDashboardSummary | null;
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
    const data = await apiFetch<AdminDashboardSummary>("/admin/dashboard-summary", {
      method: "GET",
      headers: authHeader,
      cache: "no-store",
    });

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
