import { apiFetchWithMeta } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import type { AdminPaymentItem, PaymentSortBy } from "@/types/domain/payment";

export type { AdminPaymentItem } from "@/types/domain/payment";

export type AdminPaymentsResult = {
  data: AdminPaymentItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
};

type GetAdminPaymentsOptions = {
  searchTerm?: string;
  status?: string;
  sortBy?: PaymentSortBy;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getAdminPayments = async ({
  searchTerm,
  status,
  sortBy = "createdAt",
  sortOrder = "desc",
  page = 1,
  limit = 10,
}: GetAdminPaymentsOptions = {}): Promise<AdminPaymentsResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: [],
      meta: { page, limit, total: 0, totalPages: 0 },
      error: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    const response = await apiFetchWithMeta<AdminPaymentItem[]>("/admin/payments", {
      method: "GET",
      headers: authHeader,
      query: {
        searchTerm: searchTerm?.trim() || undefined,
        status: status?.trim() || undefined,
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
          : "Failed to load payments. Please try again.",
    };
  }
};
