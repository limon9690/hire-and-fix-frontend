import { VendorsList } from "@/components/public/vendors-list";
import { VendorsPagination } from "@/components/public/vendors-pagination";
import {
  VendorsSearch,
  type VendorsSortValue,
} from "@/components/public/vendors-search";
import { getVendorsForCards } from "@/lib/public/vendors";

type VendorsPageProps = {
  searchParams: Promise<{
    searchTerm?: string;
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

const parseSort = (value: string | undefined): VendorsSortValue => {
  const safeValue = value?.trim();
  if (safeValue === "latest" || safeValue === "nameAsc" || safeValue === "nameDesc") {
    return safeValue;
  }
  return "latest";
};

const getSortQuery = (sort: VendorsSortValue) => {
  switch (sort) {
    case "nameAsc":
      return { sortBy: "vendorName" as const, sortOrder: "asc" as const };
    case "nameDesc":
      return { sortBy: "vendorName" as const, sortOrder: "desc" as const };
    case "latest":
    default:
      return { sortBy: "createdAt" as const, sortOrder: "desc" as const };
  }
};

export default async function VendorsPage({ searchParams }: VendorsPageProps) {
  const params = await searchParams;
  const searchTerm = params.searchTerm ?? "";
  const sort = parseSort(params.sort);
  const page = parsePage(params.page);
  const { sortBy, sortOrder } = getSortQuery(sort);

  const { data: vendors, meta, error } = await getVendorsForCards({
    searchTerm,
    sortBy,
    sortOrder,
    page,
    limit: 10,
  });

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Company Profiles</h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Explore approved vendors, compare profiles, and find the right company for your next service.
      </p>
      <VendorsSearch initialSearchTerm={searchTerm} initialSort={sort} />
      <VendorsList vendors={vendors} error={error} />
      <VendorsPagination
        page={meta.page}
        totalPages={meta.totalPages}
        searchTerm={searchTerm}
        sort={sort}
      />
    </section>
  );
}
