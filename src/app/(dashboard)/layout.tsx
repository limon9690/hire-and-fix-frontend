import type { ReactNode } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { logoutAction } from "@/lib/auth/logout-action";
import { getSessionClaimsFromToken } from "@/lib/server/jwt";
import { getSessionToken } from "@/lib/server/session-auth";
import {
  dashboardGeneralNavItems,
  getRoleSidebarNavItems,
} from "@/lib/dashboard/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sessionToken = await getSessionToken();
  const claims = sessionToken ? getSessionClaimsFromToken(sessionToken) : null;
  const roleNavItems = getRoleSidebarNavItems(claims?.role);
  const globalItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/vendors", label: "Vendors" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="app-container py-4 md:py-6">
        <header className="mb-4 flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 md:mb-6 md:px-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Hire & Fix
            </p>
            <h1 className="text-base font-semibold tracking-tight md:text-lg">
              Dashboard
            </h1>
            {claims ? (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Role: {claims.role}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-1 md:flex">
              {globalItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ModeToggle />
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Logout
              </button>
            </form>
          </div>
        </header>

        <details className="mb-4 rounded-xl border border-border bg-card p-3 md:hidden">
          <summary className="cursor-pointer list-none text-sm font-medium">
            Navigation
          </summary>
          <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Explore
          </p>
          <nav className="mt-1 grid gap-1">
            {globalItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            General
          </p>
          <nav className="mt-3 grid gap-1">
            {dashboardGeneralNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {roleNavItems.length > 0 ? (
            <>
              <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Menu
              </p>
              <nav className="mt-1 grid gap-1">
                {roleNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </>
          ) : null}
        </details>

        <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="hidden h-fit rounded-xl border border-border bg-card p-3 md:block">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              General
            </p>
            <nav className="grid gap-1">
              {dashboardGeneralNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {roleNavItems.length > 0 ? (
              <>
                <p className="mt-4 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Menu
                </p>
                <nav className="grid gap-1">
                  {roleNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </>
            ) : null}
          </aside>

          <main className="rounded-xl border border-border bg-card p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
