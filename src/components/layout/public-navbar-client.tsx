"use client";

import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { logoutAction } from "@/lib/auth/logout-action";

type PublicNavbarClientProps = {
  isAuthenticated: boolean;
  dashboardHref: string;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/employees", label: "Browse Services" },
  { href: "/vendors", label: "Company Profiles" },
];

export function PublicNavbarClient({
  isAuthenticated,
  dashboardHref,
}: PublicNavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
            onClick={handleCloseMenu}
          >
            Hire & Fix
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
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
            className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="public-mobile-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? "Close" : "Menu"}
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
                  className="rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
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
