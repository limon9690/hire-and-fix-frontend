"use server";

import { apiFetch } from "@/lib/api/client";
import {
  getSessionAuthHeader,
  SESSION_EXPIRED_MESSAGE,
} from "@/lib/server/session-auth";

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

  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return {
      success: false,
      message: SESSION_EXPIRED_MESSAGE,
    };
  }

  try {
    const data = await apiFetch<CheckoutSessionResponse>(
      `/payments/checkout-session/${bookingId}`,
      {
        method: "POST",
        headers: authHeader,
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
