import { apiFetch, apiFetchWithMeta } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";

export type VendorCardItem = {
  id: string;
  vendorName: string;
  logo: string | null;
  phone: string | null;
  description: string | null;
  address: string | null;
  isApproved: boolean;
  isActive: boolean;
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string;
  } | null;
};

export type VendorDetails = {
  id: string;
  userId: string;
  vendorName: string;
  logo: string | null;
  phone: string | null;
  description: string | null;
  address: string | null;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  reviewSummary: {
    averageRating: number;
    totalReviews: number;
    employeeCount: number;
  } | null;
};

type VendorsMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type VendorsResult =
  | { data: VendorCardItem[]; meta: VendorsMeta; error: null }
  | { data: VendorCardItem[]; meta: VendorsMeta; error: string };

type GetVendorsForCardsOptions = {
  searchTerm?: string;
  sortBy?: "createdAt" | "vendorName";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getVendorsForCards = async ({
  searchTerm,
  sortBy,
  sortOrder,
  page = 1,
  limit = 10,
}: GetVendorsForCardsOptions = {}): Promise<VendorsResult> => {
  const fallbackMeta: VendorsMeta = {
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
    const response = await apiFetchWithMeta<VendorCardItem[]>("/vendors", {
      method: "GET",
      query: {
        searchTerm: searchTerm?.trim() || undefined,
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
        : "Unable to load vendors right now.";

    return { data: [], meta: fallbackMeta, error: message };
  }
};

type VendorDetailsResult =
  | { data: VendorDetails; error: null }
  | { data: null; error: string; notFound?: boolean };

export const getVendorById = async (id: string): Promise<VendorDetailsResult> => {
  try {
    const data = await apiFetch<VendorDetails>(`/vendors/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    return { data, error: null };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return { data: null, error: "Vendor not found", notFound: true };
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to load vendor details right now.";

    return { data: null, error: message };
  }
};
