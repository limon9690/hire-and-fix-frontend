import { apiFetch } from "@/lib/api/client";
import type { LoginPayload } from "./schemas";

export const login = async (payload: LoginPayload) => {
  await apiFetch<unknown>("/auth/login", {
    method: "POST",
    body: payload,
    cache: "no-store",
  });
};
