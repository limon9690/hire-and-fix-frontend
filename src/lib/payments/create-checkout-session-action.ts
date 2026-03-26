"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";

type CheckoutSessionResponse = {
  checkoutUrl: string;
  sessionId: string;
};

type CreateCheckoutSessionActionResult = {
  success: boolean;
  message: string;
  checkoutUrl?: string;
};

export const createCheckoutSessionAction = async (
  bookingId: string
): Promise<CreateCheckoutSessionActionResult> => {
  if (!bookingId) {
    return {
      success: false,
      message: "Booking id is required.",
    };
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    const data = await apiFetch<CheckoutSessionResponse>(
      `/payments/checkout-session/${bookingId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
        cache: "no-store",
      }
    );

    if (!data.checkoutUrl) {
      return {
        success: false,
        message: "Checkout URL is missing from payment response.",
      };
    }

    return {
      success: true,
      message: "Redirecting to Stripe checkout...",
      checkoutUrl: data.checkoutUrl,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create checkout session.",
    };
  }
};
