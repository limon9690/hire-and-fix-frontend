import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10">
        <div className="w-full rounded-xl border border-zinc-200 p-6 shadow-sm">
          {children}
        </div>
      </main>
    </div>
  );
}
