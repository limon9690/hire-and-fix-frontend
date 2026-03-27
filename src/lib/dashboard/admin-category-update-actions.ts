"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

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

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    await apiFetch<unknown>(`/service-categories/${categoryId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
