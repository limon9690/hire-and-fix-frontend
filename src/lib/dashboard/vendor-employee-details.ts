import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";

export type VendorEmployeeDetails = {
  id: string;
  userId: string;
  vendorId: string;
  serviceCategoryId: string;
  profilePhoto: string | null;
  bio: string | null;
  address: string | null;
  phone: string | null;
  hourlyRate: string;
  experienceYears: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  vendor: {
    id: string;
    vendorName: string;
    logo: string | null;
    phone: string;
    address: string;
    isApproved: boolean;
    isActive: boolean;
  } | null;
  serviceCategory: {
    id: string;
    name: string;
    description: string | null;
  } | null;
};

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
