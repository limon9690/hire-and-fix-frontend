import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-base font-semibold tracking-tight text-foreground">
            Hire & Fix
          </Link>
          <Link href="/" className="text-sm text-muted-foreground underline">
            Back to home
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
