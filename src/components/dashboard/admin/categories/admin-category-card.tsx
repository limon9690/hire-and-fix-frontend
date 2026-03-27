import type { AdminCategoryItem } from "@/lib/dashboard/admin/categories/admin-categories";
import { AdminCategoryDeleteButton } from "./admin-category-delete-button";
import { AdminCategoryEditDialog } from "./admin-category-edit-dialog";

type AdminCategoryCardProps = {
  category: AdminCategoryItem;
};

const shorten = (value: string, size = 8) => {
  if (value.length <= size * 2) {
    return value;
  }
  return `${value.slice(0, size)}...${value.slice(-size)}`;
};

export function AdminCategoryCard({ category }: AdminCategoryCardProps) {
  return (
    <article className="rounded-xl border border-border/90 bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight">{category.name}</h3>
        <p className="text-xs text-muted-foreground">ID: {shorten(category.id)}</p>
      </div>

      <div className="mt-4 rounded-lg border border-border/70 bg-muted/30 p-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Description
        </p>
        <p className="mt-1 text-sm text-foreground">
          {category.description || "No description provided."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/70 pt-4">
        <AdminCategoryEditDialog
          categoryId={category.id}
          initialName={category.name}
          initialDescription={category.description}
        />
        <AdminCategoryDeleteButton
          categoryId={category.id}
          categoryName={category.name}
        />
      </div>
    </article>
  );
}
