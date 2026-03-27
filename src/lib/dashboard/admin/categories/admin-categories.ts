import { apiFetchWithMeta } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import type { ServiceCategory } from "@/types/domain/category";

export type AdminCategoryItem = ServiceCategory;

export type AdminCategoriesResult = {
  data: AdminCategoryItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
};

type GetAdminCategoriesOptions = {
  searchTerm?: string;
  sortBy?: "name" | "description";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getAdminCategories = async ({
  searchTerm,
  sortBy = "name",
  sortOrder = "asc",
  page = 1,
  limit = 10,
}: GetAdminCategoriesOptions = {}): Promise<AdminCategoriesResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: [],
      meta: { page, limit, total: 0, totalPages: 0 },
      error: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    const response = await apiFetchWithMeta<AdminCategoryItem[]>(
      "/service-categories",
      {
        method: "GET",
        headers: authHeader,
        query: {
          searchTerm: searchTerm?.trim() || undefined,
          sortBy,
          sortOrder,
          page,
          limit,
        },
        cache: "no-store",
      }
    );

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
          : "Failed to load service categories.",
    };
  }
};
