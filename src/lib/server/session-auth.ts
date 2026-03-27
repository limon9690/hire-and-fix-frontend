import { cookies } from "next/headers";

export const SESSION_EXPIRED_MESSAGE = "Session expired. Please log in again.";

export const getSessionToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("session")?.value ?? null;
};

export const getSessionAuthHeader = async (): Promise<
  { Authorization: string } | null
> => {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return null;
  }

  return {
    Authorization: `Bearer ${sessionToken}`,
  };
};
