import { apiFetch } from "@/lib/api/client";
import type { LoginPayload, RegisterUserPayload } from "./schemas";

export const login = async (payload: LoginPayload) => {
  await apiFetch<unknown>("/auth/login", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
};

export const registerUser = async (payload: RegisterUserPayload) => {
  await apiFetch<unknown>("/auth/register-user", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
};
