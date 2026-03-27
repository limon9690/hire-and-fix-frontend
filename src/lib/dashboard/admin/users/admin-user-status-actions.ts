"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

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

  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return {
      success: false,
      message: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    await apiFetch<unknown>(`/admin/users/${userId}/status`, {
      method: "PATCH",
      headers: authHeader,
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
