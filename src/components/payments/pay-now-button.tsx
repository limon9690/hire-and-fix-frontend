"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { createCheckoutSessionAction } from "@/lib/payments/create-checkout-session-action";

type PayNowButtonProps = {
  bookingId: string;
  className?: string;
};

export function PayNowButton({ bookingId, className }: PayNowButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handlePayNow = async () => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    const result = await createCheckoutSessionAction(bookingId);
    setIsPending(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    if (!result.checkoutUrl) {
      toast.error("Checkout URL is unavailable.");
      return;
    }

    toast.success(result.message);
    window.location.assign(result.checkoutUrl);
  };

  return (
    <Button
      type="button"
      className={className}
      disabled={isPending}
      onClick={handlePayNow}
    >
      {isPending ? "Redirecting..." : "Pay Now"}
    </Button>
  );
}
