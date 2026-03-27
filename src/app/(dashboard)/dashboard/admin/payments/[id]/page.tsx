import { notFound } from "next/navigation";
import { AdminPaymentDetailsView } from "@/components/dashboard/admin/payments/admin-payment-details";
import { getAdminPaymentDetails } from "@/lib/dashboard/admin/payments/admin-payment-details";

type AdminPaymentDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPaymentDetailsPage({
  params,
}: AdminPaymentDetailsPageProps) {
  const { id } = await params;
  const { data, error, notFound: isNotFound } = await getAdminPaymentDetails(id);

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

      {data ? <AdminPaymentDetailsView payment={data} /> : null}
    </div>
  );
}
