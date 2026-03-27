import { apiFetch, apiFetchWithMeta } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";
import type {
  EmployeeCard,
  EmployeeDetails,
  EmployeeReviewItem,
  EmployeeReviews,
} from "@/types/domain/employee";

export type EmployeeCardItem = EmployeeCard;
export type { EmployeeDetails, EmployeeReviewItem, EmployeeReviews };

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

type EmployeeDetailsResult =
  | { data: EmployeeDetails; error: null }
  | { data: null; error: string; notFound?: boolean };

export const getEmployeeById = async (
  id: string
): Promise<EmployeeDetailsResult> => {
  try {
    const data = await apiFetch<EmployeeDetails>(`/employees/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    return { data, error: null };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return { data: null, error: "Professional not found", notFound: true };
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to load professional details right now.";

    return { data: null, error: message };
  }
};

type EmployeeReviewsResult =
  | { data: EmployeeReviews; error: null }
  | { data: null; error: string };

export const getEmployeeReviews = async (
  employeeId: string
): Promise<EmployeeReviewsResult> => {
  try {
    const data = await apiFetch<EmployeeReviews>(`/reviews/employee/${employeeId}`, {
      method: "GET",
      cache: "no-store",
    });

    return { data, error: null };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load reviews right now.";

    return { data: null, error: message };
  }
};
