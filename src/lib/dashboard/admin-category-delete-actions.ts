"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

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
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
