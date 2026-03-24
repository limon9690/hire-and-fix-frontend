import { NextResponse, type NextRequest } from "next/server";
import { getDashboardPathByRole } from "@/lib/auth/redirect-by-role";
import { getSessionClaimsFromToken } from "@/lib/server/jwt";

const AUTH_ROUTES = new Set(["/login", "/register/user", "/register/vendor"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session")?.value;
  const claims = sessionToken ? getSessionClaimsFromToken(sessionToken) : null;

  const isAuthRoute = AUTH_ROUTES.has(pathname);
  const isDashboardRoute = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isDashboardRoute && !claims) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && claims) {
    return NextResponse.redirect(
      new URL(getDashboardPathByRole(claims.role), request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register/:path*", "/dashboard", "/dashboard/:path*"],
};
