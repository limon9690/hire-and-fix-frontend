import Link from "next/link";
import type { VendorEmployeeItem } from "@/lib/dashboard/vendor/employees/types";
import { DeleteVendorEmployeeButton } from "./delete-vendor-employee-button";

type VendorEmployeeCardProps = {
  employee: VendorEmployeeItem;
  onDeleted?: (employeeId: string) => void;
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

export function VendorEmployeeCard({ employee, onDeleted }: VendorEmployeeCardProps) {
  return (
    <article className="rounded-xl border border-border/90 bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight">
            {employee.user?.name || "Unnamed Employee"}
          </h3>
          <p className="text-xs text-muted-foreground break-all">
            {employee.user?.email || "No email"}
          </p>
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

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Hourly Rate
          </dt>
          <dd className="mt-1 font-medium">{formatCurrency(employee.hourlyRate)}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-muted-foreground">
            Experience
          </dt>
          <dd className="mt-1 font-medium">{employee.experienceYears} years</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Link
          href={`/dashboard/vendor/employees/${employee.id}`}
          className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View
        </Link>
        {!employee.isDeleted ? (
          <>
            <Link
              href={`/dashboard/vendor/employees/${employee.id}/edit`}
              className="inline-flex h-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Edit
            </Link>
            <DeleteVendorEmployeeButton
              employeeId={employee.id}
              onDeleted={() => onDeleted?.(employee.id)}
            />
          </>
        ) : null}
      </div>
    </article>
  );
}
