import { ListPagination } from "@/components/shared/list/list-pagination";

type VendorsPaginationProps = {
  page: number;
  totalPages: number;
  searchTerm: string;
  sort: string;
};

export function VendorsPagination({
  page,
  totalPages,
  searchTerm,
  sort,
}: VendorsPaginationProps) {
  return (
    <ListPagination
      page={page}
      totalPages={totalPages}
      basePath="/vendors"
      preservedParams={{
        searchTerm,
        sort: sort === "latest" ? undefined : sort,
      }}
    />
  );
}
