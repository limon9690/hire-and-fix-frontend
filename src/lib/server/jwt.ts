import { isRole, type Role } from "@/lib/auth/roles";

type JwtPayload = {
  userId?: unknown;
  email?: unknown;
  role?: unknown;
  exp?: unknown;
};

export type SessionClaims = {
  userId: string;
  email: string;
  role: Role;
  exp?: number;
};

export const decodeJwtPayload = (token: string): JwtPayload | null => {
  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const json = atob(padded);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
};

export const getSessionClaimsFromToken = (
  token: string
): SessionClaims | null => {
  const payload = decodeJwtPayload(token);
  if (!payload) {
    return null;
  }

  if (
    typeof payload.userId !== "string" ||
    typeof payload.email !== "string" ||
    !isRole(payload.role)
  ) {
    return null;
  }

  const exp = typeof payload.exp === "number" ? payload.exp : undefined;
  if (exp && exp * 1000 <= Date.now()) {
    return null;
  }

  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    exp,
  };
};
