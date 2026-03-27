import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";
import type { VendorEmployeeDetails } from "./types";

type VendorEmployeeDetailsResult =
  | { data: VendorEmployeeDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getVendorEmployeeDetails = async (
  employeeId: string
): Promise<VendorEmployeeDetailsResult> => {
  try {
    const data = await apiFetch<VendorEmployeeDetails>(`/employees/${employeeId}`, {
      method: "GET",
      cache: "no-store",
    });

    return { data, error: null, notFound: false };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        data: null,
        error: `${error.message} (HTTP ${error.statusCode})`,
        notFound: false,
      };
    }

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load employee details right now.",
      notFound: false,
    };
  }
};
