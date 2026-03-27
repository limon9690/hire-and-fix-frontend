import { notFound } from "next/navigation";
import { AdminUserDetailsView } from "@/components/dashboard/admin/admin-user-details";
import { getAdminUserDetails } from "@/lib/dashboard/admin-user-details";

type AdminUserDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminUserDetailsPage({
  params,
}: AdminUserDetailsPageProps) {
  const { id } = await params;
  const { data, error, notFound: isNotFound } = await getAdminUserDetails(id);

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

      {data ? <AdminUserDetailsView user={data} /> : null}
    </div>
  );
}
