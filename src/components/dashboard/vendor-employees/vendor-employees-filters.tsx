import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import type { ServiceCategory } from "@/lib/public/service-categories";

const SORT_BY_OPTIONS = [
  { value: "createdAt", label: "Created Time" },
  { value: "updatedAt", label: "Updated Time" },
  { value: "hourlyRate", label: "Hourly Rate" },
  { value: "experienceYears", label: "Experience" },
  { value: "isActive", label: "Active Status" },
];

const SORT_ORDER_OPTIONS = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

type VendorEmployeesFiltersProps = {
  searchTerm: string;
  serviceCategoryId: string;
  isActive: "true" | "false" | "";
  sortBy: "createdAt" | "updatedAt" | "hourlyRate" | "experienceYears" | "isActive";
  sortOrder: "asc" | "desc";
  categories: ServiceCategory[];
};

export function VendorEmployeesFilters({
  searchTerm,
  serviceCategoryId,
  isActive,
  sortBy,
  sortOrder,
  categories,
}: VendorEmployeesFiltersProps) {
  const categoryOptions = [
    { value: "", label: "All categories" },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  return (
    <ListFiltersBar
      action="/dashboard/vendor/employees"
      resetHref="/dashboard/vendor/employees"
      submitLabel="Apply"
      hiddenFields={[{ name: "page", value: "1" }]}
      searchField={{
        name: "searchTerm",
        label: "Search",
        placeholder: "Search by employee name or category",
        defaultValue: searchTerm,
      }}
      selectFields={[
        {
          name: "serviceCategoryId",
          label: "Category",
          defaultValue: serviceCategoryId,
          options: categoryOptions,
        },
        {
          name: "isActive",
          label: "Active",
          defaultValue: isActive,
          options: [
            { value: "", label: "All" },
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ],
        },
        {
          name: "sortBy",
          label: "Sort By",
          defaultValue: sortBy,
          options: SORT_BY_OPTIONS,
        },
        {
          name: "sortOrder",
          label: "Order",
          defaultValue: sortOrder,
          options: SORT_ORDER_OPTIONS,
        },
      ]}
    />
  );
}
