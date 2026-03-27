"use server";

import { revalidatePath } from "next/cache";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import { apiFetch } from "@/lib/api/client";

type AdminVendorApprovalActionResult = {
  success: boolean;
  message: string;
};

export const updateAdminVendorApprovalAction = async (
  vendorId: string,
  isApproved: boolean
): Promise<AdminVendorApprovalActionResult> => {
  if (!vendorId) {
    return {
      success: false,
      message: "Vendor id is required.",
    };
  }

  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return {
      success: false,
      message: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    await apiFetch<unknown>(`/admin/vendors/${vendorId}/approval`, {
      method: "PATCH",
      headers: authHeader,
      body: { isApproved },
      cache: "no-store",
    });

    revalidatePath("/dashboard/admin/vendors");
    revalidatePath(`/dashboard/admin/vendors/${vendorId}`);

    return {
      success: true,
      message: `Vendor ${isApproved ? "approved" : "marked as unapproved"} successfully.`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update vendor approval.",
    };
  }
};
