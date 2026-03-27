"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import {
  vendorEmployeeCreateSchema,
  type VendorEmployeeCreatePayload,
} from "./create-schemas";

type VendorEmployeeCreateActionResult = {
  success: boolean;
  message: string;
};

export const createVendorEmployeeAction = async (
  payload: VendorEmployeeCreatePayload
): Promise<VendorEmployeeCreateActionResult> => {
  const parsed = vendorEmployeeCreateSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid employee payload.",
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
    await apiFetch<unknown>("/auth/create-employee", {
      method: "POST",
      headers: authHeader,
      body: parsed.data,
      cache: "no-store",
    });

    return {
      success: true,
      message: "Employee created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create employee.",
    };
  }
};
