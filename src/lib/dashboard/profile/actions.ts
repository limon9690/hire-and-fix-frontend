"use server";

import { apiFetch } from "@/lib/api/client";
import {
  getSessionAuthHeader,
  SESSION_EXPIRED_MESSAGE,
} from "@/lib/server/session-auth";
import {
  employeeProfileUpdateSchema,
  type EmployeeProfileUpdatePayload,
  vendorProfileUpdateSchema,
  type VendorProfileUpdatePayload,
} from "./schemas";

type ProfileActionResult = {
  success: boolean;
  message: string;
};

export const updateVendorProfileAction = async (
  payload: VendorProfileUpdatePayload
): Promise<ProfileActionResult> => {
  const parsed = vendorProfileUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message || "Invalid vendor profile details",
    };
  }

  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return { success: false, message: SESSION_EXPIRED_MESSAGE };
  }

  try {
    await apiFetch<unknown>("/vendors/me", {
      method: "PATCH",
      headers: authHeader,
      body: {
        ...parsed.data,
        logo: parsed.data.logo || undefined,
      },
      cache: "no-store",
    });

    return { success: true, message: "Vendor profile updated successfully." };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update vendor profile.",
    };
  }
};

export const updateEmployeeProfileAction = async (
  payload: EmployeeProfileUpdatePayload
): Promise<ProfileActionResult> => {
  const parsed = employeeProfileUpdateSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.issues[0]?.message || "Invalid employee profile details",
    };
  }

  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return { success: false, message: SESSION_EXPIRED_MESSAGE };
  }

  try {
    await apiFetch<unknown>("/employees/me", {
      method: "PATCH",
      headers: authHeader,
      body: {
        ...parsed.data,
        profilePhoto: parsed.data.profilePhoto || undefined,
      },
      cache: "no-store",
    });

    return { success: true, message: "Employee profile updated successfully." };
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
