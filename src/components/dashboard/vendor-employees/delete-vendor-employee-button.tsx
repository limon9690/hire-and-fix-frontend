"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteVendorEmployeeAction } from "@/lib/dashboard/vendor-employee-delete-actions";

type DeleteVendorEmployeeButtonProps = {
  employeeId: string;
  afterDeleteHref?: string;
  onDeleted?: () => void;
};

export function DeleteVendorEmployeeButton({
  employeeId,
  afterDeleteHref,
  onDeleted,
}: DeleteVendorEmployeeButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    const result = await deleteVendorEmployeeAction(employeeId);
    setIsPending(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setConfirmOpen(false);
    onDeleted?.();
    if (afterDeleteHref) {
      window.location.assign(afterDeleteHref);
      return;
    }

    router.refresh();
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="cursor-pointer"
        onClick={() => setConfirmOpen(true)}
        disabled={isPending}
      >
        Delete
      </Button>

      <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-lg outline-none">
            <AlertDialog.Title className="text-base font-semibold text-foreground">
              Delete Employee
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete this employee profile? This action
              cannot be undone.
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
                variant="destructive"
                className="cursor-pointer"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
