"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import {
  createReviewSchema,
  type CreateReviewPayload,
} from "@/lib/reviews/schemas";

type CreateReviewActionResult = {
  success: boolean;
  message: string;
};

export const createReviewAction = async (
  payload: CreateReviewPayload
): Promise<CreateReviewActionResult> => {
  const parsed = createReviewSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid review payload.",
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
    await apiFetch<unknown>("/reviews", {
      method: "POST",
      headers: authHeader,
      body: {
        bookingId: parsed.data.bookingId,
        rating: parsed.data.rating,
        comment: parsed.data.comment?.trim() || undefined,
      },
      cache: "no-store",
    });

    return {
      success: true,
      message: "Review created successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create review.",
    };
  }
};
