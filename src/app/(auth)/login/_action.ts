"use server";

import { cookies } from "next/headers";
import { getApiBaseUrl } from "@/lib/config";
import { getDashboardPathByRole } from "@/lib/auth/redirect-by-role";
import { loginSchema, type LoginPayload } from "@/lib/auth/schemas";
import { extractCookieFromSetCookie } from "@/lib/server/cookies";
import { getSessionClaimsFromToken } from "@/lib/server/jwt";

type LoginActionResult =
  | { success: true; redirectTo: string }
  | { success: false; message: string };

export const loginAction = async (
  payload: LoginPayload
): Promise<LoginActionResult> => {
  const parsed = loginSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid credentials",
    };
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });

    const result = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Login failed",
      };
    }

    const accessToken = extractCookieFromSetCookie(
      response.headers.get("set-cookie"),
      "accessToken"
    );
    if (!accessToken) {
      return {
        success: false,
        message: "Access token missing from backend response",
      };
    }

    const claims = getSessionClaimsFromToken(accessToken);
    if (!claims) {
      return {
        success: false,
        message: "Received invalid session token",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("session", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      redirectTo: getDashboardPathByRole(claims.role),
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while logging in",
    };
  }
};
