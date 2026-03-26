"use client";

import { AlertDialog } from "@base-ui/react/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cancelBookingAction } from "@/lib/dashboard/booking-actions";

type CancelBookingButtonProps = {
  bookingId: string;
};

export function CancelBookingButton({ bookingId }: CancelBookingButtonProps) {
  const [isPending, setIsPending] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  const handleCancel = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    const result = await cancelBookingAction(bookingId);
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
        variant="outline"
        className="cursor-pointer"
        onClick={() => setConfirmOpen(true)}
        disabled={isPending}
      >
        {isPending ? "Cancelling..." : "Cancel Booking"}
      </Button>

      <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
          <AlertDialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(92vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-background p-5 shadow-lg outline-none">
            <AlertDialog.Title className="text-base font-semibold text-foreground">
              Cancel Booking?
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-sm text-muted-foreground">
              This booking will be cancelled. You can continue by creating a new
              booking later if needed.
            </AlertDialog.Description>

            <div className="mt-4 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={() => setConfirmOpen(false)}
                disabled={isPending}
              >
                Keep Booking
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                onClick={handleCancel}
                disabled={isPending}
              >
                {isPending ? "Cancelling..." : "Confirm Cancel"}
              </Button>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
