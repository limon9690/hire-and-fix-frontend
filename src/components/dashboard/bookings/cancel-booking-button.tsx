"use client";

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
  const router = useRouter();

  const handleCancel = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    const result = await cancelBookingAction(bookingId);
    setIsPending(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="cursor-pointer"
      onClick={handleCancel}
      disabled={isPending}
    >
      {isPending ? "Cancelling..." : "Cancel Booking"}
    </Button>
  );
}
