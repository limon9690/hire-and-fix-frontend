import Link from "next/link";
import { AdminUserStatusButton } from "@/components/dashboard/admin/admin-user-status-button";
import type { AdminUserDetails } from "@/lib/dashboard/admin-user-details";

type AdminUserDetailsViewProps = {
  user: AdminUserDetails;
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

const formatCurrency = (value: string | null | undefined) => {
  if (!value) {
    return "—";
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numeric);
};

export function AdminUserDetailsView({ user }: AdminUserDetailsViewProps) {
  const profile = user.profile;
  const role = user.role;
  const currentIsActive =
    profile && "isActive" in profile && typeof profile.isActive === "boolean"
      ? profile.isActive
      : null;
  const statusLabel =
    currentIsActive === null ? "Unknown" : currentIsActive ? "Active" : "Inactive";

  return (
    <section className="space-y-6">
      <Link
        href="/dashboard/admin/users"
        className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
      >
        Back to Manage Users
      </Link>

      <article className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">{user.name}</h2>
            <p className="text-sm text-muted-foreground break-all">{user.email}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium">
              {user.role}
            </span>
            <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium">
              {statusLabel}
            </span>
          </div>
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
          <AdminUserStatusButton userId={user.id} currentIsActive={currentIsActive} />
        </div>
      </article>

      {!profile ? (
        <article className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
          No role profile is available for this user.
        </article>
      ) : null}

      {role === "USER" && profile ? (
        <article className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            User Profile
          </h3>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Phone</dt>
              <dd className="font-medium">
                {"phone" in profile ? profile.phone || "—" : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Address</dt>
              <dd className="font-medium">
                {"address" in profile ? profile.address || "—" : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Active</dt>
              <dd className="font-medium">
                {"isActive" in profile ? (profile.isActive ? "Yes" : "No") : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Profile Photo</dt>
              <dd className="font-medium">
                {"profilePhoto" in profile && profile.profilePhoto ? (
                  <a
                    href={profile.profilePhoto}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Open photo
                  </a>
                ) : (
                  "—"
                )}
              </dd>
            </div>
          </dl>
        </article>
      ) : null}

      {role === "VENDOR" && profile ? (
        <article className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Vendor Profile
          </h3>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Vendor Name</dt>
              <dd className="font-medium">
                {"vendorName" in profile ? profile.vendorName || "—" : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Phone</dt>
              <dd className="font-medium">
                {"phone" in profile ? profile.phone || "—" : "—"}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Address</dt>
              <dd className="font-medium">
                {"address" in profile ? profile.address || "—" : "—"}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Description</dt>
              <dd className="font-medium">
                {"description" in profile ? profile.description || "—" : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Approved</dt>
              <dd className="font-medium">
                {"isApproved" in profile ? (profile.isApproved ? "Yes" : "No") : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Active</dt>
              <dd className="font-medium">
                {"isActive" in profile ? (profile.isActive ? "Yes" : "No") : "—"}
              </dd>
            </div>
          </dl>
        </article>
      ) : null}

      {role === "EMPLOYEE" && profile ? (
        <article className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Employee Profile
          </h3>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Phone</dt>
              <dd className="font-medium">
                {"phone" in profile ? profile.phone || "—" : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Address</dt>
              <dd className="font-medium">
                {"address" in profile ? profile.address || "—" : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Experience</dt>
              <dd className="font-medium">
                {"experienceYears" in profile ? `${profile.experienceYears} years` : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Hourly Rate</dt>
              <dd className="font-medium">
                {"hourlyRate" in profile ? formatCurrency(profile.hourlyRate) : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Service Category</dt>
              <dd className="font-medium">
                {"serviceCategory" in profile
                  ? profile.serviceCategory?.name || "—"
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Vendor</dt>
              <dd className="font-medium">
                {"vendor" in profile ? profile.vendor?.vendorName || "—" : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Active</dt>
              <dd className="font-medium">
                {"isActive" in profile ? (profile.isActive ? "Yes" : "No") : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Deleted</dt>
              <dd className="font-medium">
                {"isDeleted" in profile ? (profile.isDeleted ? "Yes" : "No") : "—"}
              </dd>
            </div>
          </dl>
        </article>
      ) : null}
    </section>
  );
}
