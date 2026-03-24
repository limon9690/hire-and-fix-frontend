import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";
import type { ServiceCategory } from "@/lib/public/service-categories";

export const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "hourlyRateAsc", label: "Hourly rate: Low to High" },
  { value: "hourlyRateDesc", label: "Hourly rate: High to Low" },
  { value: "experienceDesc", label: "Experience: High to Low" },
] as const;

export type ServicesSortValue = (typeof SORT_OPTIONS)[number]["value"];

type ServicesSearchProps = {
  initialSearchTerm: string;
  initialServiceCategoryId: string;
  initialSort: ServicesSortValue;
  categories: ServiceCategory[];
};

export function ServicesSearch({
  initialSearchTerm,
  initialServiceCategoryId,
  initialSort,
  categories,
}: ServicesSearchProps) {
  const categoryOptions = [
    { value: "", label: "All categories" },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  return (
    <ListFiltersBar
      action="/services"
      resetHref="/services"
      hiddenFields={[{ name: "page", value: "1" }]}
      searchField={{
        name: "searchTerm",
        label: "Search professionals",
        placeholder: "Search by name, category, or keyword",
        defaultValue: initialSearchTerm,
      }}
      selectFields={[
        {
          name: "serviceCategoryId",
          label: "Category",
          defaultValue: initialServiceCategoryId,
          options: categoryOptions,
        },
        {
          name: "sort",
          label: "Sort",
          defaultValue: initialSort,
          options: SORT_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
          })),
        },
      ]}
    />
  );
}
