import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import { ListPagination } from "@/components/shared/list/list-pagination";
import { AdminVendorsList } from "@/components/dashboard/admin/vendors/admin-vendors-list";
import { getAdminVendors } from "@/lib/dashboard/admin/vendors/admin-vendors";

type AdminVendorsPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
    isActive?: string;
    sort?: string;
    page?: string;
  }>;
};

type VendorSortValue = "latest" | "oldest" | "nameAsc" | "nameDesc";

const parsePage = (value: string | undefined) => {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
};

const parseBooleanParam = (value: string | undefined): boolean | undefined => {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return undefined;
};

const parseSort = (value: string | undefined): VendorSortValue => {
  if (
    value === "latest" ||
    value === "oldest" ||
    value === "nameAsc" ||
    value === "nameDesc"
  ) {
    return value;
  }
  return "latest";
};

const getSortQuery = (sort: VendorSortValue) => {
  switch (sort) {
    case "oldest":
      return { sortBy: "createdAt" as const, sortOrder: "asc" as const };
    case "nameAsc":
      return { sortBy: "vendorName" as const, sortOrder: "asc" as const };
    case "nameDesc":
      return { sortBy: "vendorName" as const, sortOrder: "desc" as const };
    case "latest":
    default:
      return { sortBy: "createdAt" as const, sortOrder: "desc" as const };
  }
};

export default async function AdminVendorsPage({
  searchParams,
}: AdminVendorsPageProps) {
  const params = await searchParams;
  const searchTerm = params.searchTerm?.trim() ?? "";
  const isActive = parseBooleanParam(params.isActive);
  const sort = parseSort(params.sort);
  const page = parsePage(params.page);
  const { sortBy, sortOrder } = getSortQuery(sort);

  const { data, meta, error } = await getAdminVendors({
    searchTerm,
    isActive,
    sortBy,
    sortOrder,
    page,
    limit: 10,
  });

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Manage Vendors</h2>
        <p className="text-sm text-muted-foreground">
          Review vendor companies and their approval/activity status.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[960px]">
          <ListFiltersBar
            action="/dashboard/admin/vendors"
            resetHref="/dashboard/admin/vendors"
            submitLabel="Apply"
            searchField={{
              name: "searchTerm",
              label: "Search",
              placeholder: "Search by vendor name, owner, or email",
              defaultValue: searchTerm,
            }}
            hiddenFields={[{ name: "page", value: "1" }]}
            selectFields={[
              {
                name: "isActive",
                label: "Status",
                defaultValue:
                  typeof isActive === "boolean" ? String(isActive) : "",
                options: [
                  { value: "", label: "All statuses" },
                  { value: "true", label: "Active" },
                  { value: "false", label: "Inactive" },
                ],
              },
              {
                name: "sort",
                label: "Sort",
                defaultValue: sort,
                options: [
                  { value: "latest", label: "Latest" },
                  { value: "oldest", label: "Oldest" },
                  { value: "nameAsc", label: "Name: A to Z" },
                  { value: "nameDesc", label: "Name: Z to A" },
                ],
              },
            ]}
          />
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {!error ? <AdminVendorsList vendors={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} vendors.
          </p>
          <ListPagination
            page={meta.page}
            totalPages={meta.totalPages}
            basePath="/dashboard/admin/vendors"
            preservedParams={{
              searchTerm,
              isActive:
                typeof isActive === "boolean" ? String(isActive) : undefined,
              sort,
            }}
          />
        </>
      ) : null}
    </section>
  );
}
