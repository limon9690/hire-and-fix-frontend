"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

type VendorEmployeeDeleteActionResult = {
  success: boolean;
  message: string;
};

export const deleteVendorEmployeeAction = async (
  employeeId: string
): Promise<VendorEmployeeDeleteActionResult> => {
  if (!employeeId) {
    return {
      success: false,
      message: "Employee id is required.",
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
    await apiFetch<unknown>(`/employees/my/${employeeId}`, {
      method: "DELETE",
      headers: authHeader,
      cache: "no-store",
    });

    return {
      success: true,
      message: "Employee deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete employee.",
    };
  }
};
