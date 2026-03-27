"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

type AdminUserStatusActionResult = {
  success: boolean;
  message: string;
};

export const updateAdminUserStatusAction = async (
  userId: string,
  isActive: boolean
): Promise<AdminUserStatusActionResult> => {
  if (!userId) {
    return {
      success: false,
      message: "User id is required.",
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
    await apiFetch<unknown>(`/admin/users/${userId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      body: { isActive },
      cache: "no-store",
    });

    return {
      success: true,
      message: `User ${isActive ? "activated" : "deactivated"} successfully.`,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update user status.",
    };
  }
};
