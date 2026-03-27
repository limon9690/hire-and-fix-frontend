"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

type DeleteAdminCategoryResult = {
  success: boolean;
  message: string;
};

export const deleteAdminCategoryAction = async (
  categoryId: string
): Promise<DeleteAdminCategoryResult> => {
  if (!categoryId) {
    return {
      success: false,
      message: "Category id is required.",
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
    await apiFetch<unknown>(`/service-categories/${categoryId}`, {
      method: "DELETE",
      headers: authHeader,
      cache: "no-store",
    });

    return {
      success: true,
      message: "Category deleted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete service category.",
    };
  }
};
