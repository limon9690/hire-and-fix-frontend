import type { ReactNode } from "react";
import Link from "next/link";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/80 bg-background/90 backdrop-blur">
        <div className="app-container flex h-14 items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Hire & Fix
          </Link>
          <Link
            href="/services"
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Back to services
          </Link>
        </div>
      </header>

      <main className="app-container py-8">{children}</main>
    </div>
  );
}
