import { notFound } from "next/navigation";
import { AdminVendorDetailsView } from "@/components/dashboard/admin/admin-vendor-details";
import { getAdminVendorDetails } from "@/lib/dashboard/admin-vendors";

type AdminVendorDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminVendorDetailsPage({
  params,
}: AdminVendorDetailsPageProps) {
  const { id } = await params;
  const { data, error, notFound: isNotFound } = await getAdminVendorDetails(id);

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

      {data ? <AdminVendorDetailsView vendor={data} /> : null}
    </div>
  );
}
