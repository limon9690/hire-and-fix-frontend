"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    await apiFetch<unknown>(`/admin/vendors/${vendorId}/approval`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
