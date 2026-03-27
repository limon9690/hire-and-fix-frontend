import { apiFetch } from "@/lib/api/client";
import type { Role } from "@/lib/auth/roles";
import {
  getSessionAuthHeader,
  SESSION_EXPIRED_MESSAGE,
} from "@/lib/server/session-auth";
import type {
  UserBaseInfo,
  UserProfile,
  VendorProfile,
  EmployeeProfile,
  RoleProfile,
} from "@/types/domain/user";

export type { UserProfile, VendorProfile, EmployeeProfile };

type AuthMeResponse = UserBaseInfo & {
  role: Role;
  profile: RoleProfile;
};

export type BasicProfileInfo = Pick<
  AuthMeResponse,
  "id" | "name" | "email" | "role" | "createdAt" | "updatedAt"
>;

export type DashboardProfileData = {
  basic: BasicProfileInfo;
  profile: RoleProfile;
};

export const getDashboardProfileData = async (): Promise<{
  data: DashboardProfileData | null;
  error: string | null;
}> => {
  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return {
      data: null,
      error: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    const data = await apiFetch<AuthMeResponse>("/auth/me", {
      method: "GET",
      headers: authHeader,
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
