import { apiFetch } from "@/lib/api/client";
import {
  getSessionAuthHeader,
  SESSION_EXPIRED_MESSAGE,
} from "@/lib/server/session-auth";
import type { AuthMeResponse, DashboardProfileData } from "./types";

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
