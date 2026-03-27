import type { AdminPaymentItem } from "@/lib/dashboard/admin/payments/admin-payments";
import { AdminPaymentCard } from "./admin-payment-card";

type AdminPaymentsListProps = {
  payments: AdminPaymentItem[];
};

export function AdminPaymentsList({ payments }: AdminPaymentsListProps) {
  if (payments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight">No payments found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Payments will appear here once bookings are paid.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-muted/20 p-2">
      <div className="space-y-5">
        {payments.map((payment) => (
          <AdminPaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
}
