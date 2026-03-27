import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";
import type { AdminPaymentItem } from "./admin-payments";

export type AdminPaymentDetails = AdminPaymentItem;

type AdminPaymentDetailsResult =
  | { data: AdminPaymentDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getAdminPaymentDetails = async (
  paymentId: string
): Promise<AdminPaymentDetailsResult> => {
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
    const data = await apiFetch<AdminPaymentDetails>(`/admin/payments/${paymentId}`, {
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
      return {
        data: null,
        error: "Payment not found.",
        notFound: true,
      };
    }

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load payment details right now.",
      notFound: false,
    };
  }
};
