import { ListPagination } from "@/components/shared/list/list-pagination";

type VendorEmployeesPaginationProps = {
  page: number;
  totalPages: number;
  searchTerm: string;
  serviceCategoryId: string;
  isActive: "true" | "false" | "";
  sortBy: "createdAt" | "updatedAt" | "hourlyRate" | "experienceYears" | "isActive";
  sortOrder: "asc" | "desc";
};

export function VendorEmployeesPagination({
  page,
  totalPages,
  searchTerm,
  serviceCategoryId,
  isActive,
  sortBy,
  sortOrder,
}: VendorEmployeesPaginationProps) {
  return (
    <ListPagination
      page={page}
      totalPages={totalPages}
      basePath="/dashboard/vendor/employees"
      preservedParams={{
        searchTerm,
        serviceCategoryId,
        isActive,
        sortBy: sortBy === "createdAt" ? undefined : sortBy,
        sortOrder: sortOrder === "desc" ? undefined : sortOrder,
      }}
    />
  );
}
