import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import { ListPagination } from "@/components/shared/list/list-pagination";
import { AdminUsersList } from "@/components/dashboard/admin/users/admin-users-list";
import { getAdminUsers } from "@/lib/dashboard/admin/users/admin-users";

type AdminUsersPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
    role?: string;
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

const parseSortBy = (value: string | undefined): "createdAt" | "updatedAt" => {
  return value === "updatedAt" ? "updatedAt" : "createdAt";
};

const parseSortOrder = (value: string | undefined): "asc" | "desc" => {
  return value === "asc" ? "asc" : "desc";
};

const parseRole = (
  value: string | undefined
): "USER" | "VENDOR" | "EMPLOYEE" | "ADMIN" | "" => {
  if (
    value === "USER" ||
    value === "VENDOR" ||
    value === "EMPLOYEE" ||
    value === "ADMIN"
  ) {
    return value;
  }
  return "";
};

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const params = await searchParams;
  const searchTerm = params.searchTerm?.trim() ?? "";
  const role = parseRole(params.role);
  const sortBy = parseSortBy(params.sortBy);
  const sortOrder = parseSortOrder(params.sortOrder);
  const page = parsePage(params.page);

  const { data, meta, error } = await getAdminUsers({
    searchTerm,
    role,
    sortBy,
    sortOrder,
    page,
    limit: 10,
  });

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Manage Users</h2>
        <p className="text-sm text-muted-foreground">
          Review platform user accounts and their current roles.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[960px]">
          <ListFiltersBar
            action="/dashboard/admin/users"
            resetHref="/dashboard/admin/users"
            submitLabel="Apply"
            searchField={{
              name: "searchTerm",
              label: "Search",
              placeholder: "Search by name or email",
              defaultValue: searchTerm,
            }}
            hiddenFields={[{ name: "page", value: "1" }]}
            selectFields={[
              {
                name: "role",
                label: "Role",
                defaultValue: role,
                options: [
                  { value: "", label: "All roles" },
                  { value: "USER", label: "User" },
                  { value: "VENDOR", label: "Vendor" },
                  { value: "EMPLOYEE", label: "Employee" },
                  { value: "ADMIN", label: "Admin" },
                ],
              },
              {
                name: "sortBy",
                label: "Sort by",
                defaultValue: sortBy,
                options: [
                  { value: "createdAt", label: "Created date" },
                  { value: "updatedAt", label: "Updated date" },
                ],
              },
              {
                name: "sortOrder",
                label: "Sort order",
                defaultValue: sortOrder,
                options: [
                  { value: "desc", label: "Descending" },
                  { value: "asc", label: "Ascending" },
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

      {!error ? <AdminUsersList users={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} users.
          </p>
          <ListPagination
            page={meta.page}
            totalPages={meta.totalPages}
            basePath="/dashboard/admin/users"
            preservedParams={{
              searchTerm,
              role,
              sortBy,
              sortOrder,
            }}
          />
        </>
      ) : null}
    </section>
  );
}
