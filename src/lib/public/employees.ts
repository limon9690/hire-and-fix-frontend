import { apiFetchWithMeta } from "@/lib/api/client";

export type EmployeeCardItem = {
  id: string;
  profilePhoto: string | null;
  hourlyRate: string | null;
  experienceYears: number | null;
  user: {
    name: string | null;
  } | null;
  vendor: {
    vendorName: string | null;
  } | null;
  serviceCategory: {
    name: string | null;
  } | null;
};

type EmployeesMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type EmployeesResult =
  | { data: EmployeeCardItem[]; meta: EmployeesMeta; error: null }
  | { data: EmployeeCardItem[]; meta: EmployeesMeta; error: string };

type GetEmployeesForCardsOptions = {
  searchTerm?: string;
  serviceCategoryId?: string;
  sortBy?: "createdAt" | "hourlyRate" | "experienceYears";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getEmployeesForCards = async ({
  searchTerm,
  serviceCategoryId,
  sortBy,
  sortOrder,
  page = 1,
  limit = 10,
}: GetEmployeesForCardsOptions = {}): Promise<EmployeesResult> => {
  const fallbackMeta: EmployeesMeta = {
    page,
    limit,
    total: 0,
    totalPages: 1,
  };

  const toNumber = (value: unknown): number | null => {
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string") {
      const parsed = Number.parseInt(value, 10);
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
    return null;
  };

  try {
    const response = await apiFetchWithMeta<EmployeeCardItem[]>("/employees", {
      method: "GET",
      query: {
        searchTerm: searchTerm?.trim() || undefined,
        serviceCategoryId: serviceCategoryId?.trim() || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
        page,
        limit,
      },
      cache: "no-store",
    });

    const meta = response.meta ?? {};
    const parsedPage = toNumber(meta.page);
    const parsedLimit = toNumber(meta.limit);
    const parsedTotal = toNumber(meta.total);
    const parsedTotalPages = toNumber(meta.totalPages ?? meta.totalPage);
    const safeLimit = parsedLimit && parsedLimit > 0 ? parsedLimit : limit;
    const safeTotal = parsedTotal && parsedTotal >= 0 ? parsedTotal : response.data.length;
    const computedTotalPages = Math.max(1, Math.ceil(safeTotal / safeLimit));

    return {
      data: response.data,
      meta: {
        page: parsedPage && parsedPage > 0 ? parsedPage : page,
        limit: safeLimit,
        total: safeTotal,
        totalPages:
          parsedTotalPages && parsedTotalPages > 0
            ? parsedTotalPages
            : computedTotalPages,
      },
      error: null,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load professionals right now.";

    return { data: [], meta: fallbackMeta, error: message };
  }
};
