import { VendorEmployeeCreateForm } from "@/components/dashboard/vendor-employees/vendor-employee-create-form";
import { getServiceCategories } from "@/lib/public/service-categories";

export default async function VendorEmployeeCreatePage() {
  const { data: categories, error } = await getServiceCategories();

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {categories.length > 0 ? (
        <VendorEmployeeCreateForm categories={categories} />
      ) : (
        <section className="space-y-3 rounded-xl border border-border bg-card p-6">
          <h2 className="text-2xl font-semibold tracking-tight">Add Employee</h2>
          <p className="text-sm text-muted-foreground">
            No service categories found. Add categories first.
          </p>
        </section>
      )}
    </div>
  );
}
