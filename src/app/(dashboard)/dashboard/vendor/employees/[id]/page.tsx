import { notFound } from "next/navigation";
import { VendorEmployeeDetailsView } from "@/components/dashboard/vendor-employees/vendor-employee-details";
import { getVendorEmployeeDetails } from "@/lib/dashboard/vendor/employees";

type VendorEmployeeDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function VendorEmployeeDetailsPage({
  params,
}: VendorEmployeeDetailsPageProps) {
  const { id } = await params;
  const { data, error, notFound: isNotFound } = await getVendorEmployeeDetails(id);

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

      {data ? <VendorEmployeeDetailsView employee={data} /> : null}
    </div>
  );
}
