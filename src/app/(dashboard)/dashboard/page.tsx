import { cookies } from "next/headers";
import { getSessionClaimsFromToken } from "@/lib/server/jwt";

export default async function DashboardEntryPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  const claims = sessionToken ? getSessionClaimsFromToken(sessionToken) : null;

  const displayName = claims?.email.split("@")[0] ?? "there";

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">
          Welcome back, {displayName}. Here is your account snapshot.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Role
          </p>
          <p className="mt-1 text-base font-medium">{claims?.role ?? "—"}</p>
        </article>

        <article className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Email
          </p>
          <p className="mt-1 text-base font-medium break-all">
            {claims?.email ?? "—"}
          </p>
        </article>
      </div>
    </section>
  );
}
