import { apiFetch } from "@/lib/api/client";
import { ApiError } from "@/lib/api/types";
import { isRole, type Role } from "./roles";

type BackendMe = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive?: boolean;
  isDeleted?: boolean;
  isVerified?: boolean;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type SessionState = {
  isAuthenticated: boolean;
  user: SessionUser | null;
};

const toSessionUser = (payload: BackendMe): SessionUser | null => {
  if (!isRole(payload.role)) {
    return null;
  }

  return {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  };
};

export const getSession = async (): Promise<SessionState> => {
  try {
    const me = await apiFetch<BackendMe>("/auth/me", {
      method: "GET",
      cache: "no-store",
    });
    const user = toSessionUser(me);

    if (!user) {
      return {
        isAuthenticated: false,
        user: null,
      };
    }

    return {
      isAuthenticated: true,
      user,
    };
  } catch (error) {
    if (error instanceof ApiError && (error.statusCode === 401 || error.statusCode === 403)) {
      return {
        isAuthenticated: false,
        user: null,
      };
    }

    throw error;
  }
};
