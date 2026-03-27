"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

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

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    await apiFetch<unknown>("/service-categories", {
      method: "POST",
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
