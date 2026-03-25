import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import type { Role } from "@/lib/auth/roles";

export type UserProfile = {
  id: string;
  userId: string;
  phone: string | null;
  address: string | null;
  profilePhoto: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VendorProfile = {
  id: string;
  userId: string;
  vendorName: string;
  logo: string | null;
  phone: string;
  description: string;
  address: string;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeProfile = {
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
};

type AuthMeResponse = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile | VendorProfile | EmployeeProfile | null;
};

export type BasicProfileInfo = Pick<
  AuthMeResponse,
  "id" | "name" | "email" | "role" | "createdAt" | "updatedAt"
>;

export type DashboardProfileData = {
  basic: BasicProfileInfo;
  profile: UserProfile | VendorProfile | EmployeeProfile | null;
};

export const getDashboardProfileData = async (): Promise<{
  data: DashboardProfileData | null;
  error: string | null;
}> => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken) {
    return {
      data: null,
      error: "Session is missing. Please log in again.",
    };
  }

  try {
    const data = await apiFetch<AuthMeResponse>("/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: "no-store",
    });

    return {
      data: {
        basic: {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
        profile: data.profile,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to load profile information.",
    };
  }
};
