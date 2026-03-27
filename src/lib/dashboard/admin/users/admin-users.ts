import { apiFetchWithMeta } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

export type AdminUserListItem = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminUsersResult = {
  data: AdminUserListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
};

type GetAdminUsersOptions = {
  searchTerm?: string;
  role?: "USER" | "VENDOR" | "EMPLOYEE" | "ADMIN" | "";
  sortBy?: "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getAdminUsers = async ({
  searchTerm,
  role,
  sortBy = "createdAt",
  sortOrder = "desc",
  page = 1,
  limit = 10,
}: GetAdminUsersOptions = {}): Promise<AdminUsersResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: [],
      meta: { page, limit, total: 0, totalPages: 0 },
      error: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    const response = await apiFetchWithMeta<AdminUserListItem[]>("/admin/users", {
      method: "GET",
      headers: authHeader,
      query: {
        searchTerm: searchTerm?.trim() || undefined,
        role: role?.trim() || undefined,
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
        error instanceof Error ? error.message : "Failed to load users list.",
    };
  }
};
