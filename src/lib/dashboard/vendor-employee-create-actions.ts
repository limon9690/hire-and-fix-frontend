"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import {
  vendorEmployeeCreateSchema,
  type VendorEmployeeCreatePayload,
} from "./vendor-employee-create-schemas";

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

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    await apiFetch<unknown>("/auth/create-employee", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
