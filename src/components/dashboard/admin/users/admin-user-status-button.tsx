"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { updateAdminUserStatusAction } from "@/lib/dashboard/admin/users/admin-user-status-actions";

type AdminUserStatusButtonProps = {
  userId: string;
  currentIsActive?: boolean | null;
  compact?: boolean;
};

export function AdminUserStatusButton({
  userId,
  currentIsActive,
  compact = false,
}: AdminUserStatusButtonProps) {
  const [nextIsActive, setNextIsActive] = useState(
    currentIsActive === false ? "true" : "false"
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const parsedNextIsActive = nextIsActive === "true";
  const isSameAsCurrent = useMemo(
    () =>
      typeof currentIsActive === "boolean" && parsedNextIsActive === currentIsActive,
    [currentIsActive, parsedNextIsActive]
  );
  const canSubmit = !isPending && !isSameAsCurrent;

  const handleConfirm = async () => {
    if (!canSubmit) {
      return;
    }

    setIsPending(true);
    const result = await updateAdminUserStatusAction(userId, parsedNextIsActive);
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
      <div
        className={
          compact
            ? "inline-flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-1"
            : "inline-flex items-center gap-2"
        }
      >
        <select
          value={nextIsActive}
          onChange={(event) => setNextIsActive(event.target.value)}
          className="h-8 rounded-md border border-input bg-background px-2 text-sm"
          disabled={isPending}
          aria-label="Select user active status"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <Button
          type="button"
          variant="outline"
          className="h-8 cursor-pointer"
          disabled={!canSubmit}
          onClick={() => setConfirmOpen(true)}
        >
          Update Status
        </Button>
      </div>

      <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-lg outline-none">
            <AlertDialog.Title className="text-base font-semibold text-foreground">
              Confirm Status Update
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
              Set this user status to{" "}
              <span className="font-medium text-foreground">
                {parsedNextIsActive ? "Active" : "Inactive"}
              </span>
              ?
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
                disabled={!canSubmit}
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
