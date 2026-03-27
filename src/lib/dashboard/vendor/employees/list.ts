import { apiFetchWithMeta } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import type { VendorEmployeeItem } from "./types";

export type VendorEmployeesResult = {
  data: VendorEmployeeItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
};

type GetVendorEmployeesOptions = {
  searchTerm?: string;
  serviceCategoryId?: string;
  isActive?: "true" | "false";
  sortBy?: "createdAt" | "updatedAt" | "hourlyRate" | "experienceYears" | "isActive";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getVendorEmployees = async ({
  searchTerm,
  serviceCategoryId,
  isActive,
  sortBy = "createdAt",
  sortOrder = "desc",
  page = 1,
  limit = 10,
}: GetVendorEmployeesOptions = {}): Promise<VendorEmployeesResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: [],
      meta: { page, limit, total: 0, totalPages: 1 },
      error: SESSION_EXPIRED_MESSAGE,
    };
  }

  const fallbackMeta = { page, limit, total: 0, totalPages: 1 };

  try {
    const normalizedSearchTerm = searchTerm?.trim() || undefined;
    const normalizedServiceCategoryId = serviceCategoryId?.trim() || undefined;
    const normalizedIsActive =
      isActive === "true" ? true : isActive === "false" ? false : undefined;

    const response = await apiFetchWithMeta<VendorEmployeeItem[]>("/employees/my", {
      method: "GET",
      headers: authHeader,
      query: {
        searchTerm: normalizedSearchTerm,
        // Compatibility alias in case backend parses `search` instead of `searchTerm`.
        search: normalizedSearchTerm,
        serviceCategoryId: normalizedServiceCategoryId,
        // Compatibility alias in case backend parses `categoryId`.
        categoryId: normalizedServiceCategoryId,
        isActive: normalizedIsActive,
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
        page: meta.page ?? page,
        limit: meta.limit ?? limit,
        total: meta.total ?? response.data.length,
        totalPages: meta.totalPages ?? meta.totalPage ?? 1,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: [],
      meta: fallbackMeta,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load employees right now.",
    };
  }
};
