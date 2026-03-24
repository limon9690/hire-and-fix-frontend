export const getCookieFromHeader = (
  cookieHeader: string | null,
  name: string
) => {
  if (!cookieHeader) {
    return null;
  }

  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]+)`)
  );
  return match?.[1] ?? null;
};

export const extractCookieFromSetCookie = (
  setCookieHeader: string | null,
  name: string
) => {
  if (!setCookieHeader) {
    return null;
  }

  const match = setCookieHeader.match(
    new RegExp(`(?:^|,\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]+)`)
  );
  return match?.[1] ?? null;
};
