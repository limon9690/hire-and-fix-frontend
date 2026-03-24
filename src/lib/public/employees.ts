import { apiFetch } from "@/lib/api/client";

export type EmployeeCardItem = {
  id: string;
  profilePhoto: string | null;
  hourlyRate: string | null;
  experienceYears: number | null;
  user: {
    name: string | null;
  } | null;
  vendor: {
    vendorName: string | null;
  } | null;
  serviceCategory: {
    name: string | null;
  } | null;
};

type EmployeesResult =
  | { data: EmployeeCardItem[]; error: null }
  | { data: EmployeeCardItem[]; error: string };

type GetEmployeesForCardsOptions = {
  searchTerm?: string;
  serviceCategoryId?: string;
  sortBy?: "createdAt" | "hourlyRate" | "experienceYears";
  sortOrder?: "asc" | "desc";
};

export const getEmployeesForCards = async ({
  searchTerm,
  serviceCategoryId,
  sortBy,
  sortOrder,
}: GetEmployeesForCardsOptions = {}): Promise<EmployeesResult> => {
  try {
    const data = await apiFetch<EmployeeCardItem[]>("/employees", {
      method: "GET",
      query: {
        searchTerm: searchTerm?.trim() || undefined,
        serviceCategoryId: serviceCategoryId?.trim() || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
      },
      cache: "no-store",
    });

    return { data, error: null };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load professionals right now.";

    return { data: [], error: message };
  }
};
