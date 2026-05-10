"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wrench, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { logoutAction } from "@/lib/auth/logout-action";

type PublicNavbarClientProps = {
  isAuthenticated: boolean;
  dashboardHref: string;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
  { href: "/vendors", label: "Company Profiles" },
];

export function PublicNavbarClient({
  isAuthenticated,
  dashboardHref,
}: PublicNavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="app-container py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-foreground"
            onClick={handleCloseMenu}
          >
            <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
            Hire & Fix
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  pathname === link.href
                    ? "text-foreground border-b-2 border-primary pb-0.5"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ModeToggle align="end" />
            {isAuthenticated ? (
              <>
                <Link
                  href={dashboardHref}
                  className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Dashboard
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Login
                </Link>
                <Link
                  href="/register/user"
                  className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-border p-1.5 text-muted-foreground md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="public-mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen ? (
          <div
            id="public-mobile-menu"
            className="mt-3 space-y-3 rounded-lg border border-border bg-card p-3 md:hidden"
          >
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-2 py-1.5 text-sm font-medium hover:bg-muted hover:text-foreground",
                    pathname === link.href
                      ? "text-foreground bg-muted"
                      : "text-muted-foreground"
                  )}
                  onClick={handleCloseMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2 pt-1">
              <ModeToggle align="start" />
              {isAuthenticated ? (
                <>
                  <Link
                    href={dashboardHref}
                    className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                    onClick={handleCloseMenu}
                  >
                    Dashboard
                  </Link>
                  <form action={logoutAction} className="inline-flex">
                    <button
                      type="submit"
                      className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground"
                    >
                      Logout
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground"
                    onClick={handleCloseMenu}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register/user"
                    className="rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground"
                    onClick={handleCloseMenu}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
