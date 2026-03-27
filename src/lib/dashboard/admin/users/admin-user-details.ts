import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import { ApiError } from "@/lib/api/types";
import type {
  UserBaseInfo,
  UserProfile,
  VendorProfile,
  EmployeeProfile,
} from "@/types/domain/user";

export type AdminUserDetails = UserBaseInfo & {
  profile: UserProfile | VendorProfile | EmployeeProfile | null;
};

type AdminUserDetailsResult =
  | { data: AdminUserDetails; error: null; notFound: false }
  | { data: null; error: string; notFound: boolean };

export const getAdminUserDetails = async (
  userId: string
): Promise<AdminUserDetailsResult> => {
  const authHeader = await getSessionAuthHeader();

  if (!authHeader) {
    return {
      data: null,
      error: SESSION_EXPIRED_MESSAGE,
      notFound: false,
    };
  }

  try {
    const data = await apiFetch<AdminUserDetails>(`/admin/users/${userId}`, {
      method: "GET",
      headers: authHeader,
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
