import { EmployeesList } from "@/components/public/employees-list";
import { ServicesPagination } from "@/components/public/services-pagination";
import {
  ServicesSearch,
  type ServicesSortValue,
} from "@/components/public/services-search";
import { getEmployeesForCards } from "@/lib/public/employees";
import { getServiceCategories } from "@/lib/public/service-categories";

type ServicesPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
    serviceCategoryId?: string;
    sort?: string;
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

const parseSort = (value: string | undefined): ServicesSortValue => {
  const safeValue = value?.trim();
  if (
    safeValue === "latest" ||
    safeValue === "hourlyRateAsc" ||
    safeValue === "hourlyRateDesc" ||
    safeValue === "experienceDesc"
  ) {
    return safeValue;
  }

  return "latest";
};

const getSortQuery = (sort: ServicesSortValue) => {
  switch (sort) {
    case "hourlyRateAsc":
      return { sortBy: "hourlyRate" as const, sortOrder: "asc" as const };
    case "hourlyRateDesc":
      return { sortBy: "hourlyRate" as const, sortOrder: "desc" as const };
    case "experienceDesc":
      return { sortBy: "experienceYears" as const, sortOrder: "desc" as const };
    case "latest":
    default:
      return { sortBy: "createdAt" as const, sortOrder: "desc" as const };
  }
};

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const params = await searchParams;
  const searchTerm = params.searchTerm ?? "";
  const serviceCategoryId = params.serviceCategoryId ?? "";
  const sort = parseSort(params.sort);
  const page = parsePage(params.page);
  const { sortBy, sortOrder } = getSortQuery(sort);

  const [{ data: employees, meta, error }, { data: categories }] = await Promise.all([
    getEmployeesForCards({
      searchTerm,
      serviceCategoryId,
      sortBy,
      sortOrder,
      page,
      limit: 10,
    }),
    getServiceCategories(),
  ]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Browse Services</h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Compare active professionals and choose the right person for your job.
      </p>
      <ServicesSearch
        initialSearchTerm={searchTerm}
        initialServiceCategoryId={serviceCategoryId}
        initialSort={sort}
        categories={categories}
      />
      <EmployeesList employees={employees} error={error} />
      <ServicesPagination
        page={meta.page}
        totalPages={meta.totalPages}
        searchTerm={searchTerm}
        serviceCategoryId={serviceCategoryId}
        sort={sort}
      />
    </section>
  );
}
