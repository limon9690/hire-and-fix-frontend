import { ListFiltersBar } from "@/components/shared/list/list-filters-bar";

export const VENDOR_SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "nameAsc", label: "Name: A to Z" },
  { value: "nameDesc", label: "Name: Z to A" },
] as const;

export type VendorsSortValue = (typeof VENDOR_SORT_OPTIONS)[number]["value"];

type VendorsSearchProps = {
  initialSearchTerm: string;
  initialSort: VendorsSortValue;
};

export function VendorsSearch({
  initialSearchTerm,
  initialSort,
}: VendorsSearchProps) {
  return (
    <ListFiltersBar
      action="/vendors"
      resetHref="/vendors"
      hiddenFields={[{ name: "page", value: "1" }]}
      searchField={{
        name: "searchTerm",
        label: "Search vendors",
        placeholder: "Search by vendor name, owner, or keyword",
        defaultValue: initialSearchTerm,
      }}
      selectFields={[
        {
          name: "sort",
          label: "Sort",
          defaultValue: initialSort,
          options: VENDOR_SORT_OPTIONS.map((option) => ({
            value: option.value,
            label: option.label,
          })),
        },
      ]}
    />
  );
}
