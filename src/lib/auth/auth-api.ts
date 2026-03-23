import { apiFetch } from "@/lib/api/client";
import type {
  LoginPayload,
  RegisterUserPayload,
  RegisterVendorPayload,
} from "./schemas";

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

export const registerVendor = async (payload: RegisterVendorPayload) => {
  await apiFetch<unknown>("/auth/register-vendor", {
    method: "POST",
    body: {
      ...payload,
      logo: payload.logo || undefined,
    },
    cache: "no-store",
  });
};
