import Link from "next/link";
import type { VendorEmployeeDetails } from "@/lib/dashboard/vendor-employee-details";
import { DeleteVendorEmployeeButton } from "./delete-vendor-employee-button";

type VendorEmployeeDetailsProps = {
  employee: VendorEmployeeDetails;
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

const formatCurrency = (value: string) => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numeric);
};

export function VendorEmployeeDetailsView({ employee }: VendorEmployeeDetailsProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {employee.user?.name || "Unnamed Employee"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {employee.serviceCategory?.name || "No category assigned"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
              employee.isActive
                ? "border-emerald-300/70 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-amber-300/70 bg-amber-500/10 text-amber-700 dark:text-amber-300"
            }`}
          >
            {employee.isActive ? "Active" : "Inactive"}
          </span>
          {employee.isDeleted ? (
            <span className="inline-flex items-center rounded-full border border-rose-300/70 bg-rose-500/10 px-2.5 py-1 text-xs font-medium text-rose-700 dark:text-rose-300">
              Deleted
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/dashboard/vendor/employees"
          className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Back to Employees
        </Link>
        {!employee.isDeleted ? (
          <>
            <Link
              href={`/dashboard/vendor/employees/${employee.id}/edit`}
              className="inline-flex h-8 items-center rounded-lg border border-transparent bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Edit Employee
            </Link>
            <DeleteVendorEmployeeButton
              employeeId={employee.id}
              afterDeleteHref="/dashboard/vendor/employees"
            />
          </>
        ) : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Profile
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Profile Photo</dt>
              <dd className="mt-2">
                {employee.profilePhoto ? (
                  <img
                    src={employee.profilePhoto}
                    alt={`${employee.user?.name || "Employee"} profile`}
                    className="h-32 w-32 rounded-lg border border-border object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-medium">—</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Bio</dt>
              <dd className="font-medium">{employee.bio || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Phone</dt>
              <dd className="font-medium">{employee.phone || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Address</dt>
              <dd className="font-medium">{employee.address || "—"}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Work Details
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Hourly Rate</dt>
              <dd className="font-medium">{formatCurrency(employee.hourlyRate)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Experience</dt>
              <dd className="font-medium">{employee.experienceYears} years</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Category</dt>
              <dd className="font-medium">{employee.serviceCategory?.name || "—"}</dd>
            </div>
          </dl>
        </article>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Account
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Name</dt>
              <dd className="font-medium">{employee.user?.name || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Email</dt>
              <dd className="font-medium break-all">{employee.user?.email || "—"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Role</dt>
              <dd className="font-medium">{employee.user?.role || "—"}</dd>
            </div>
          </dl>
        </article>

        <article className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Timeline
          </h3>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Created</dt>
              <dd className="font-medium">{formatDateTime(employee.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Updated</dt>
              <dd className="font-medium">{formatDateTime(employee.updatedAt)}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}
