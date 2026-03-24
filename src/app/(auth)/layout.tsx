import type { ReactNode } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-6">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-base font-semibold tracking-tight">
            Hire & Fix
          </Link>
          <Link href="/" className="text-sm text-zinc-600 underline">
            Back to home
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-md rounded-xl border border-zinc-200 p-6 shadow-sm">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
