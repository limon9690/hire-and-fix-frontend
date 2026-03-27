import Link from "next/link";
import { VendorEmployeesFilters } from "@/components/dashboard/vendor-employees/vendor-employees-filters";
import { VendorEmployeesList } from "@/components/dashboard/vendor-employees/vendor-employees-list";
import { VendorEmployeesPagination } from "@/components/dashboard/vendor-employees/vendor-employees-pagination";
import { getVendorEmployees } from "@/lib/dashboard/vendor/employees";
import { getServiceCategories } from "@/lib/public/service-categories";

type VendorEmployeesPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
    serviceCategoryId?: string;
    isActive?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: string;
  }>;
};

const parsePage = (value: string | undefined) => {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
};

const parseSortBy = (
  value: string | undefined
): "createdAt" | "updatedAt" | "hourlyRate" | "experienceYears" | "isActive" => {
  if (
    value === "createdAt" ||
    value === "updatedAt" ||
    value === "hourlyRate" ||
    value === "experienceYears" ||
    value === "isActive"
  ) {
    return value;
  }

  return "createdAt";
};

const parseSortOrder = (value: string | undefined): "asc" | "desc" =>
  value === "asc" ? "asc" : "desc";

const parseIsActive = (value: string | undefined): "true" | "false" | "" => {
  if (value === "true" || value === "false") {
    return value;
  }
  return "";
};

export default async function VendorEmployeesPage({
  searchParams,
}: VendorEmployeesPageProps) {
  const params = await searchParams;
  const searchTerm = params.searchTerm ?? "";
  const serviceCategoryId = params.serviceCategoryId ?? "";
  const isActive = parseIsActive(params.isActive);
  const sortBy = parseSortBy(params.sortBy);
  const sortOrder = parseSortOrder(params.sortOrder);
  const page = parsePage(params.page);

  const [{ data, meta, error }, { data: categories }] = await Promise.all([
    getVendorEmployees({
      searchTerm,
      serviceCategoryId,
      isActive: isActive || undefined,
      sortBy,
      sortOrder,
      page,
      limit: 10,
    }),
    getServiceCategories(),
  ]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">My Employees</h2>
          <p className="text-sm text-muted-foreground">
            Manage your employee team and keep profiles up to date.
          </p>
        </div>
        <Link
          href="/dashboard/vendor/employees/create"
          className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add Employee
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1080px]">
          <VendorEmployeesFilters
            searchTerm={searchTerm}
            serviceCategoryId={serviceCategoryId}
            isActive={isActive}
            sortBy={sortBy}
            sortOrder={sortOrder}
            categories={categories}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!error ? <VendorEmployeesList employees={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} employees.
          </p>
          <VendorEmployeesPagination
            page={meta.page}
            totalPages={meta.totalPages}
            searchTerm={searchTerm}
            serviceCategoryId={serviceCategoryId}
            isActive={isActive}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </>
      ) : null}
    </section>
  );
}
