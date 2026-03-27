import { notFound } from "next/navigation";
import { VendorEmployeeEditForm } from "@/components/dashboard/vendor-employees/vendor-employee-edit-form";
import { getVendorEmployeeDetails } from "@/lib/dashboard/vendor/employees";
import { getServiceCategories } from "@/lib/public/service-categories";

type VendorEmployeeEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function VendorEmployeeEditPage({
  params,
}: VendorEmployeeEditPageProps) {
  const { id } = await params;
  const [{ data: employee, error, notFound: isNotFound }, { data: categories }] =
    await Promise.all([getVendorEmployeeDetails(id), getServiceCategories()]);

  if (isNotFound) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {employee ? (
        <VendorEmployeeEditForm employee={employee} categories={categories} />
      ) : null}
    </div>
  );
}
