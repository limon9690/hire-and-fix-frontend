import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-6 border-b border-zinc-300 pb-4">
          <h1 className="text-xl font-semibold tracking-tight">
            Dashboard Area
          </h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
