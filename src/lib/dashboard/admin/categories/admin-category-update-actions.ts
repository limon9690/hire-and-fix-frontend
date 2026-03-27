"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

type UpdateAdminCategoryPayload = {
  name: string;
  description?: string;
};

type UpdateAdminCategoryResult = {
  success: boolean;
  message: string;
};

export const updateAdminCategoryAction = async (
  categoryId: string,
  payload: UpdateAdminCategoryPayload
): Promise<UpdateAdminCategoryResult> => {
  if (!categoryId) {
    return {
      success: false,
      message: "Category id is required.",
    };
  }

  const name = payload.name?.trim();
  if (!name) {
    return {
      success: false,
      message: "Category name is required.",
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
      method: "PATCH",
      headers: authHeader,
      body: {
        name,
        description: payload.description?.trim() || undefined,
      },
      cache: "no-store",
    });

    return {
      success: true,
      message: "Category updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update service category.",
    };
  }
};
