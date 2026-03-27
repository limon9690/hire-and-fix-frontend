import { cookies } from "next/headers";
import { apiFetch, apiFetchWithMeta } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";

export type AdminVendorListItem = {
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
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      data: [],
      meta: { page, limit, total: 0, totalPages: 0 },
      error: "Session is missing. Please log in again.",
    };
  }

  try {
    const response = await apiFetchWithMeta<AdminVendorListItem[]>("/vendors", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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

export type AdminVendorDetails = {
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
    createdAt?: string;
    updatedAt?: string;
  } | null;
  reviewSummary?: {
    averageRating?: number;
    totalReviews?: number;
    employeeCount?: number;
  } | null;
};

type AdminVendorDetailsResult =
  | { data: AdminVendorDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getAdminVendorDetails = async (
  vendorId: string
): Promise<AdminVendorDetailsResult> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      data: null,
      error: "Session is missing. Please log in again.",
      notFound: false,
    };
  }

  try {
    const data = await apiFetch<AdminVendorDetails>(`/admin/vendors/${vendorId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
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
