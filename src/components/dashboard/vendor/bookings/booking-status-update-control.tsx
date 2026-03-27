"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { BookingStatus } from "@/lib/dashboard/booking/types";
import {
  updateVendorBookingStatusAction,
  type VendorUpdatableBookingStatus,
} from "@/lib/dashboard/vendor/bookings/vendor-booking-status-actions";

const STATUS_OPTIONS: VendorUpdatableBookingStatus[] = [
  "ACCEPTED",
  "IN_PROGRESS",
  "COMPLETED",
  "REJECTED",
];

type BookingStatusUpdateControlProps = {
  bookingId: string;
  currentStatus: BookingStatus;
  compact?: boolean;
};

const formatStatusLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");

export function BookingStatusUpdateControl({
  bookingId,
  currentStatus,
  compact = false,
}: BookingStatusUpdateControlProps) {
  const [nextStatus, setNextStatus] = useState<VendorUpdatableBookingStatus | "">("");
  const [isPending, setIsPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  const isSameAsCurrent = useMemo(
    () => Boolean(nextStatus) && nextStatus === currentStatus,
    [currentStatus, nextStatus]
  );
  const canOpenConfirm = Boolean(nextStatus) && !isSameAsCurrent && !isPending;

  const handleConfirm = async () => {
    if (!nextStatus || isSameAsCurrent || isPending) {
      return;
    }

    setIsPending(true);
    const result = await updateVendorBookingStatusAction(bookingId, nextStatus);
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
          value={nextStatus}
          onChange={(event) =>
            setNextStatus(event.target.value as VendorUpdatableBookingStatus | "")
          }
          aria-label="Select next booking status"
          className="h-8 rounded-md border border-input bg-background px-2 text-sm"
          disabled={isPending}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {formatStatusLabel(status)}
            </option>
          ))}
        </select>
        <Button
          type="button"
          variant="outline"
          className="h-8 cursor-pointer"
          disabled={!canOpenConfirm}
          onClick={() => setConfirmOpen(true)}
        >
          Update
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
              Update this booking status to{" "}
              <span className="font-medium text-foreground">
                {nextStatus ? formatStatusLabel(nextStatus) : "selected value"}
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
                disabled={isPending || !nextStatus || isSameAsCurrent}
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
