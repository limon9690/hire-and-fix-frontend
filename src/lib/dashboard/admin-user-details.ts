import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";

type UserBaseInfo = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "VENDOR" | "EMPLOYEE" | "ADMIN" | string;
  createdAt: string;
  updatedAt: string;
};

type UserProfile = {
  id: string;
  userId: string;
  phone: string | null;
  address: string | null;
  profilePhoto: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type VendorProfile = {
  id: string;
  userId: string;
  vendorName: string | null;
  logo: string | null;
  phone: string | null;
  description: string | null;
  address: string | null;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type EmployeeProfile = {
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
  serviceCategory?: {
    id: string;
    name: string | null;
    description: string | null;
  } | null;
  vendor?: {
    id: string;
    vendorName: string | null;
    logo: string | null;
    phone: string | null;
    address: string | null;
    isApproved: boolean;
    isActive: boolean;
  } | null;
};

export type AdminUserDetails = UserBaseInfo & {
  profile: UserProfile | VendorProfile | EmployeeProfile | null;
};

type AdminUserDetailsResult =
  | { data: AdminUserDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getAdminUserDetails = async (
  userId: string
): Promise<AdminUserDetailsResult> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      data: null,
      error: "Session is missing. Please log in again.",
      notFound: false,
    };
  }

  try {
    const data = await apiFetch<AdminUserDetails>(`/admin/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    return {
      data,
      error: null,
      notFound: false,
    };
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      return {
        data: null,
        error: "User not found.",
        notFound: true,
      };
    }

    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Unable to load user details right now.",
      notFound: false,
    };
  }
};
