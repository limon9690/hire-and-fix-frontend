"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteAdminCategoryAction } from "@/lib/dashboard/admin-category-delete-actions";

type AdminCategoryDeleteButtonProps = {
  categoryId: string;
  categoryName: string;
};

export function AdminCategoryDeleteButton({
  categoryId,
  categoryName,
}: AdminCategoryDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    const result = await deleteAdminCategoryAction(categoryId);
    setIsPending(false);
    setOpen(false);

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
        variant="outline"
        className="h-8 cursor-pointer text-destructive hover:text-destructive"
        onClick={() => setOpen(true)}
        disabled={isPending}
      >
        Delete
      </Button>

      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-lg outline-none">
            <AlertDialog.Title className="text-base font-semibold text-foreground">
              Delete Service Category
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
              Delete{" "}
              <span className="font-medium text-foreground">{categoryName}</span>?
              This may fail if the category is linked with active employee profiles.
            </AlertDialog.Description>

            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={handleConfirm}
                disabled={isPending}
              >
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
