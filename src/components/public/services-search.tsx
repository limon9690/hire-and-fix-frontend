"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
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
  return (
    <form
      action="/services"
      method="get"
      className="rounded-xl border border-border bg-card p-4"
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_220px_220px_auto_auto] sm:items-end">
        <label className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">
            Search professionals
          </span>
          <Input
            type="search"
            name="searchTerm"
            defaultValue={initialSearchTerm}
            placeholder="Search by name, category, or keyword"
            className="h-9"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">
            Category
          </span>
          <select
            name="serviceCategoryId"
            defaultValue={initialServiceCategoryId}
            className="h-9 w-full rounded-lg border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium text-muted-foreground">Sort</span>
          <select
            name="sort"
            defaultValue={initialSort}
            className="h-9 w-full rounded-lg border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div>
          <button
            type="submit"
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto cursor-pointer"
          >
            Search
          </button>
        </div>
        <div>
          <Link
            href="/services"
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto"
          >
            Clear filters
          </Link>
        </div>
      </div>
    </form>
  );
}
