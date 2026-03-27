import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import { ListPagination } from "@/components/shared/list/list-pagination";
import { AdminPaymentsList } from "@/components/dashboard/admin/payments/admin-payments-list";
import { getAdminPayments } from "@/lib/dashboard/admin/payments/admin-payments";

type AdminPaymentsPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
    status?: string;
    sort?: string;
    page?: string;
  }>;
};

type AdminPaymentsSortValue =
  | "latest"
  | "oldest"
  | "updatedNewest"
  | "updatedOldest"
  | "statusAsc"
  | "statusDesc"
  | "amountAsc"
  | "amountDesc"
  | "paidAtNewest"
  | "paidAtOldest";

const parsePage = (value: string | undefined) => {
  const parsed = Number.parseInt(value ?? "1", 10);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1;
  }
  return parsed;
};

const parseSort = (value: string | undefined): AdminPaymentsSortValue => {
  if (
    value === "latest" ||
    value === "oldest" ||
    value === "updatedNewest" ||
    value === "updatedOldest" ||
    value === "statusAsc" ||
    value === "statusDesc" ||
    value === "amountAsc" ||
    value === "amountDesc" ||
    value === "paidAtNewest" ||
    value === "paidAtOldest"
  ) {
    return value;
  }
  return "latest";
};

const getSortQuery = (sort: AdminPaymentsSortValue) => {
  switch (sort) {
    case "oldest":
      return { sortBy: "createdAt" as const, sortOrder: "asc" as const };
    case "updatedNewest":
      return { sortBy: "updatedAt" as const, sortOrder: "desc" as const };
    case "updatedOldest":
      return { sortBy: "updatedAt" as const, sortOrder: "asc" as const };
    case "statusAsc":
      return { sortBy: "status" as const, sortOrder: "asc" as const };
    case "statusDesc":
      return { sortBy: "status" as const, sortOrder: "desc" as const };
    case "amountAsc":
      return { sortBy: "amount" as const, sortOrder: "asc" as const };
    case "amountDesc":
      return { sortBy: "amount" as const, sortOrder: "desc" as const };
    case "paidAtNewest":
      return { sortBy: "paidAt" as const, sortOrder: "desc" as const };
    case "paidAtOldest":
      return { sortBy: "paidAt" as const, sortOrder: "asc" as const };
    case "latest":
    default:
      return { sortBy: "createdAt" as const, sortOrder: "desc" as const };
  }
};

export default async function AdminPaymentsPage({
  searchParams,
}: AdminPaymentsPageProps) {
  const params = await searchParams;
  const searchTerm = params.searchTerm?.trim() ?? "";
  const status = params.status ?? "";
  const sort = parseSort(params.sort);
  const page = parsePage(params.page);
  const { sortBy, sortOrder } = getSortQuery(sort);

  const { data, meta, error } = await getAdminPayments({
    searchTerm,
    status,
    sortBy,
    sortOrder,
    page,
    limit: 10,
  });

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Manage Payments</h2>
        <p className="text-sm text-muted-foreground">
          Review platform payment records and linked booking context.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[960px]">
          <ListFiltersBar
            action="/dashboard/admin/payments"
            resetHref="/dashboard/admin/payments"
            submitLabel="Apply"
            hiddenFields={[{ name: "page", value: "1" }]}
            searchField={{
              name: "searchTerm",
              label: "Search",
              placeholder: "Search by transaction, booking, customer, or vendor",
              defaultValue: searchTerm,
            }}
            selectFields={[
              {
                name: "status",
                label: "Payment status",
                defaultValue: status,
                options: [
                  { value: "", label: "All statuses" },
                  { value: "PENDING", label: "Pending" },
                  { value: "SUCCESSFUL", label: "Successful" },
                  { value: "FAILED", label: "Failed" },
                  { value: "PAID", label: "Paid" },
                  { value: "UNPAID", label: "Unpaid" },
                  { value: "REFUNDED", label: "Refunded" },
                ],
              },
              {
                name: "sort",
                label: "Sort",
                defaultValue: sort,
                options: [
                  { value: "latest", label: "Created: Latest" },
                  { value: "oldest", label: "Created: Oldest" },
                  { value: "updatedNewest", label: "Updated: Latest" },
                  { value: "updatedOldest", label: "Updated: Oldest" },
                  { value: "statusAsc", label: "Status: A to Z" },
                  { value: "statusDesc", label: "Status: Z to A" },
                  { value: "amountAsc", label: "Amount: Low to High" },
                  { value: "amountDesc", label: "Amount: High to Low" },
                  { value: "paidAtNewest", label: "Paid at: Latest" },
                  { value: "paidAtOldest", label: "Paid at: Oldest" },
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

      {!error ? <AdminPaymentsList payments={data} /> : null}

      {!error ? (
        <>
          <p className="text-sm text-muted-foreground">
            Showing {data.length} of {meta.total} payments.
          </p>
          <ListPagination
            page={meta.page}
            totalPages={meta.totalPages}
            basePath="/dashboard/admin/payments"
            preservedParams={{
              searchTerm,
              status,
              sort,
            }}
          />
        </>
      ) : null}
    </section>
  );
}
