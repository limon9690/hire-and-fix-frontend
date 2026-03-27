import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import { ListPagination } from "@/components/shared/list/list-pagination";
import { AdminCategoryCreateDialog } from "@/components/dashboard/admin/categories/admin-category-create-dialog";
import { AdminCategoriesList } from "@/components/dashboard/admin/categories/admin-categories-list";
import { getAdminCategories } from "@/lib/dashboard/admin/categories/admin-categories";

type AdminCategoriesPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
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

const parseSortBy = (value: string | undefined): "name" | "description" => {
  return value === "description" ? "description" : "name";
};

const parseSortOrder = (value: string | undefined): "asc" | "desc" => {
  return value === "desc" ? "desc" : "asc";
};

export default async function AdminCategoriesPage({
  searchParams,
}: AdminCategoriesPageProps) {
  const params = await searchParams;
  const searchTerm = params.searchTerm?.trim() ?? "";
  const sortBy = parseSortBy(params.sortBy);
  const sortOrder = parseSortOrder(params.sortOrder);
  const page = parsePage(params.page);

  const { data, meta, error } = await getAdminCategories({
    searchTerm,
    sortBy,
    sortOrder,
    page,
    limit: 10,
  });

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Manage Categories</h2>
          <p className="text-sm text-muted-foreground">
            Review service categories used for employee specialization and discovery.
          </p>
        </div>
        <AdminCategoryCreateDialog />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1040px]">
          <ListFiltersBar
            action="/dashboard/admin/categories"
            resetHref="/dashboard/admin/categories"
            submitLabel="Apply"
            hiddenFields={[{ name: "page", value: "1" }]}
            searchField={{
              name: "searchTerm",
              label: "Search",
              placeholder: "Search by category name or description",
              defaultValue: searchTerm,
            }}
            selectFields={[
              {
                name: "sortBy",
                label: "Sort by",
                defaultValue: sortBy,
                options: [
                  { value: "name", label: "Name" },
                  { value: "description", label: "Description" },
                ],
              },
              {
                name: "sortOrder",
                label: "Sort order",
                defaultValue: sortOrder,
                options: [
                  { value: "asc", label: "Ascending" },
                  { value: "desc", label: "Descending" },
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

      {!error ? <AdminCategoriesList categories={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} categories.
          </p>
          <ListPagination
            page={meta.page}
            totalPages={meta.totalPages}
            basePath="/dashboard/admin/categories"
            preservedParams={{
              searchTerm,
              sortBy,
              sortOrder,
            }}
          />
        </>
      ) : null}
    </section>
  );
}
