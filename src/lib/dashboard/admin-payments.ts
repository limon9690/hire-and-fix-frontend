import { cookies } from "next/headers";
import { apiFetchWithMeta } from "@/lib/api/client";

export type AdminPaymentItem = {
  id: string;
  bookingId: string;
  amount: string;
  paymentMethod: string;
  status: string;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  booking: {
    id: string;
    userId: string;
    vendorId: string;
    employeeId: string;
    startTime: string;
    endTime: string;
    serviceAddress: string;
    note: string | null;
    totalPrice: string;
    bookingStatus: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
    user?: {
      id: string;
      name: string;
      email: string;
      role: string;
    } | null;
    vendor?: {
      id: string;
      vendorName: string;
      logo: string | null;
      phone: string | null;
      address: string | null;
      isApproved: boolean;
      isActive: boolean;
    } | null;
    employee?: {
      id: string;
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
      } | null;
      serviceCategory?: {
        id: string;
        name: string;
        description: string | null;
      } | null;
    } | null;
    review?: {
      id: string;
      rating: number;
      comment: string | null;
      createdAt: string;
      updatedAt: string;
    } | null;
  } | null;
};

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
  sortBy?: "createdAt" | "updatedAt" | "status" | "amount" | "paidAt";
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
    const response = await apiFetchWithMeta<AdminPaymentItem[]>("/admin/payments", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
