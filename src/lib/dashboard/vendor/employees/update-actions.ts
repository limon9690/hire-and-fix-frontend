"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import {
  vendorEmployeeEditSchema,
  type VendorEmployeeEditPayload,
} from "./schemas";

type VendorEmployeeActionResult = {
  success: boolean;
  message: string;
};

export const updateVendorEmployeeAction = async (
  employeeId: string,
  payload: Partial<VendorEmployeeEditPayload>
): Promise<VendorEmployeeActionResult> => {
  if (!employeeId) {
    return {
      success: false,
      message: "Employee id is required.",
    };
  }

  if (Object.keys(payload).length === 0) {
    return {
      success: false,
      message: "At least one field is required to update.",
    };
  }

  const parsed = vendorEmployeeEditSchema.partial().safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid update payload.",
    };
  }

  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return { success: false, message: SESSION_EXPIRED_MESSAGE };
  }

  try {
    await apiFetch<unknown>(`/employees/my/${employeeId}`, {
      method: "PATCH",
      headers: authHeader,
      body: {
        ...parsed.data,
        profilePhoto:
          typeof parsed.data.profilePhoto === "string" &&
          parsed.data.profilePhoto.trim() === ""
            ? undefined
            : parsed.data.profilePhoto,
      },
      cache: "no-store",
    });

    return { success: true, message: "Employee updated successfully." };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update employee profile.",
    };
  }
};
