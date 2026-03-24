import { cookies } from "next/headers";
import { getDashboardPathByRole } from "@/lib/auth/redirect-by-role";
import { getSessionClaimsFromToken } from "@/lib/server/jwt";
import { PublicNavbarClient } from "./public-navbar-client";

export async function PublicNavbar() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  const claims = sessionToken ? getSessionClaimsFromToken(sessionToken) : null;

  return (
    <PublicNavbarClient
      isAuthenticated={Boolean(claims)}
      dashboardHref={claims ? getDashboardPathByRole(claims.role) : "/dashboard"}
    />
  );
}
