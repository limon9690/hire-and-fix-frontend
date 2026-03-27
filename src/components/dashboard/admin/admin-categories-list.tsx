import type { AdminCategoryItem } from "@/lib/dashboard/admin-categories";
import { AdminCategoryCard } from "./admin-category-card";

type AdminCategoriesListProps = {
  categories: AdminCategoryItem[];
};

export function AdminCategoriesList({ categories }: AdminCategoriesListProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight">No categories found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Service categories will appear here when available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <AdminCategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
