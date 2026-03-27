"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";

type CreateAdminCategoryPayload = {
  name: string;
  description?: string;
};

type CreateAdminCategoryResult = {
  success: boolean;
  message: string;
};

export const createAdminCategoryAction = async (
  payload: CreateAdminCategoryPayload
): Promise<CreateAdminCategoryResult> => {
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
    await apiFetch<unknown>("/service-categories", {
      method: "POST",
      headers: authHeader,
      body: {
        name,
        description: payload.description?.trim() || undefined,
      },
      cache: "no-store",
    });

    return {
      success: true,
      message: "Category created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create service category.",
    };
  }
};
