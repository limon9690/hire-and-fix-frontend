"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateAdminVendorApprovalAction } from "@/lib/dashboard/admin-vendor-approval-actions";

type AdminVendorApprovalButtonProps = {
  vendorId: string;
  currentIsApproved: boolean;
  compact?: boolean;
};

export function AdminVendorApprovalButton({
  vendorId,
  currentIsApproved,
  compact = false,
}: AdminVendorApprovalButtonProps) {
  if (currentIsApproved) {
    return (
      <Button
        type="button"
        variant="outline"
        className="h-8"
        disabled
        aria-disabled="true"
      >
        Approved
      </Button>
    );
  }

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const nextIsApproved = true;

  const handleConfirm = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    const result = await updateAdminVendorApprovalAction(vendorId, nextIsApproved);
    setIsPending(false);
    setConfirmOpen(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <>
      <Button
        type="button"
        variant={compact ? "outline" : "default"}
        className="h-8 cursor-pointer"
        disabled={isPending}
        onClick={() => setConfirmOpen(true)}
      >
        Approve Vendor
      </Button>

      <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-lg outline-none">
            <AlertDialog.Title className="text-base font-semibold text-foreground">
              Confirm Approval Update
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
              Approve this vendor profile?
            </AlertDialog.Description>
            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setConfirmOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                onClick={handleConfirm}
                disabled={isPending}
              >
                {isPending ? "Updating..." : "Confirm"}
              </Button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
