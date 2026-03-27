import { apiFetch } from "@/lib/api/client";
import type { ServiceCategory } from "@/types/domain/category";

export type { ServiceCategory } from "@/types/domain/category";

type ServiceCategoriesResult =
  | { data: ServiceCategory[]; error: null }
  | { data: ServiceCategory[]; error: string };

export const getServiceCategories = async (): Promise<ServiceCategoriesResult> => {
  try {
    const data = await apiFetch<ServiceCategory[]>("/service-categories", {
      method: "GET",
      cache: "no-store",
    });

    return { data, error: null };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load service categories right now.";

    return { data: [], error: message };
  }
};
