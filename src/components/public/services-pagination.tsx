import { ListPagination } from "@/components/shared/list/list-pagination";

type ServicesPaginationProps = {
  page: number;
  totalPages: number;
  searchTerm: string;
  serviceCategoryId: string;
  sort: string;
};

export function ServicesPagination({
  page,
  totalPages,
  searchTerm,
  serviceCategoryId,
  sort,
}: ServicesPaginationProps) {
  return (
    <ListPagination
      page={page}
      totalPages={totalPages}
      basePath="/services"
      preservedParams={{
        searchTerm,
        serviceCategoryId,
        sort: sort === "latest" ? undefined : sort,
      }}
    />
  );
}
