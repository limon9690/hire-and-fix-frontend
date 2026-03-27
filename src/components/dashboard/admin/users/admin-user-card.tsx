import Link from "next/link";
import type { AdminUserListItem } from "@/lib/dashboard/admin/users/admin-users";

type AdminUserCardProps = {
  user: AdminUserListItem;
};

const formatDateTime = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export function AdminUserCard({ user }: AdminUserCardProps) {
  return (
    <article className="rounded-xl border border-border/90 bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Name
          </p>
          <h3 className="text-lg font-semibold tracking-tight">{user.name}</h3>
          <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
            Email
          </p>
          <p className="text-sm text-muted-foreground break-all">{user.email}</p>
        </div>
        <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium">
          {user.role}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Joined
          </dt>
          <dd className="mt-1 font-medium">{formatDateTime(user.createdAt)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Updated
          </dt>
          <dd className="mt-1 font-medium">{formatDateTime(user.updatedAt)}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-border/70 pt-4">
        <Link
          href={`/dashboard/admin/users/${user.id}`}
          className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
