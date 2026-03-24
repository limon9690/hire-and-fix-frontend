import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="app-container py-8">
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
