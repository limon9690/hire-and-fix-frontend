"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

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

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    await apiFetch<unknown>(`/employees/my/${employeeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
