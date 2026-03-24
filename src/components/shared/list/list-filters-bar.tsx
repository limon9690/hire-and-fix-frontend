"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldConfig = {
  name: string;
  label: string;
  defaultValue?: string;
  options: SelectOption[];
};

type SearchFieldConfig = {
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string;
};

type ListFiltersBarProps = {
  action: string;
  resetHref: string;
  submitLabel?: string;
  searchField?: SearchFieldConfig;
  selectFields?: SelectFieldConfig[];
  hiddenFields?: Array<{ name: string; value: string }>;
};

export function ListFiltersBar({
  action,
  resetHref,
  submitLabel = "Search",
  searchField,
  selectFields = [],
  hiddenFields = [],
}: ListFiltersBarProps) {
  const [searchValue, setSearchValue] = useState(searchField?.defaultValue ?? "");

  useEffect(() => {
    setSearchValue(searchField?.defaultValue ?? "");
  }, [searchField?.defaultValue]);

  const gridCols = 2 + selectFields.length + (searchField ? 1 : 0);
  const colMap: Record<number, string> = {
    2: "sm:grid-cols-[auto_auto]",
    3: "sm:grid-cols-[1fr_auto_auto]",
    4: "sm:grid-cols-[1fr_220px_auto_auto]",
    5: "sm:grid-cols-[1fr_220px_220px_auto_auto]",
    6: "sm:grid-cols-[1fr_220px_220px_220px_auto_auto]",
  };

  return (
    <form
      action={action}
      method="get"
      className="rounded-xl border border-border bg-card p-4"
    >
      {hiddenFields.map((field) => (
        <input
          key={field.name}
          type="hidden"
          name={field.name}
          value={field.value}
        />
      ))}

      <div className={`grid gap-3 ${colMap[gridCols] ?? "sm:grid-cols-[1fr_auto_auto]"} sm:items-end`}>
        {searchField ? (
          <label className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">
              {searchField.label}
            </span>
            <Input
              type="search"
              name={searchField.name}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder={searchField.placeholder}
              className="h-9"
            />
          </label>
        ) : null}

        {selectFields.map((field) => (
          <label key={field.name} className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">
              {field.label}
            </span>
            <select
              name={field.name}
              defaultValue={field.defaultValue}
              className="h-9 w-full rounded-lg border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              {field.options.map((option) => (
                <option key={`${field.name}-${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}

        <div>
          <button
            type="submit"
            className="inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
          >
            {submitLabel}
          </button>
        </div>

        <div>
          <Link
            href={resetHref}
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto"
          >
            Clear filters
          </Link>
        </div>
      </div>
    </form>
  );
}
