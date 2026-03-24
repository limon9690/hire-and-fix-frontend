import type { ReactNode } from "react";
import { PublicFooter } from "@/components/layout/public-footer";
import { PublicNavbar } from "@/components/layout/public-navbar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicNavbar />
      <main className="app-container flex-1 py-8">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
