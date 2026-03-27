import { apiFetch, apiFetchWithMeta } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import { ApiError } from "@/lib/api/types";
import type { VendorCard, VendorDetails } from "@/types/domain/vendor";

export type AdminVendorListItem = VendorCard;

export type AdminVendorsResult = {
  data: AdminVendorListItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error: string | null;
};

type GetAdminVendorsOptions = {
  searchTerm?: string;
  isActive?: boolean;
  sortBy?: "createdAt" | "updatedAt" | "vendorName";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export const getAdminVendors = async ({
  searchTerm,
  isActive,
  sortBy,
  sortOrder,
  page = 1,
  limit = 10,
}: GetAdminVendorsOptions = {}): Promise<AdminVendorsResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: [],
      meta: { page, limit, total: 0, totalPages: 0 },
      error: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    const response = await apiFetchWithMeta<AdminVendorListItem[]>("/vendors", {
      method: "GET",
      headers: authHeader,
      query: {
        searchTerm: searchTerm?.trim() || undefined,
        isActive,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
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
        error instanceof Error ? error.message : "Failed to load vendors list.",
    };
  }
};

export type AdminVendorDetails = VendorDetails;

type AdminVendorDetailsResult =
  | { data: AdminVendorDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getAdminVendorDetails = async (
  vendorId: string
): Promise<AdminVendorDetailsResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: null,
      error: SESSION_EXPIRED_MESSAGE,
      notFound: false,
    };
  }

  try {
    const data = await apiFetch<AdminVendorDetails>(`/admin/vendors/${vendorId}`, {
      method: "GET",
      headers: authHeader,
      cache: "no-store",
    });

    return {
      data,
      error: null,
      notFound: false,
    };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      try {
        const data = await apiFetch<AdminVendorDetails>(`/vendors/${vendorId}`, {
          method: "GET",
          headers: authHeader,
          cache: "no-store",
        });

        return {
          data,
          error: null,
          notFound: false,
        };
      } catch (fallbackError) {
        if (fallbackError instanceof ApiError && fallbackError.statusCode === 404) {
          return {
            data: null,
            error: "Vendor not found.",
            notFound: true,
          };
        }

        return {
          data: null,
          error:
            fallbackError instanceof Error
              ? fallbackError.message
              : "Unable to load vendor details right now.",
          notFound: false,
        };
      }
    }

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load vendor details right now.",
      notFound: false,
    };
  }
};
