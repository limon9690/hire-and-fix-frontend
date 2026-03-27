import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

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
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      data: null,
      error: "Session is missing. Please log in again.",
    };
  }

  try {
    const data = await apiFetch<AdminDashboardSummary>("/admin/dashboard-summary", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
