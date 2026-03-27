"use server";

import { apiFetch } from "@/lib/api/client";
import { getSessionAuthHeader, SESSION_EXPIRED_MESSAGE } from "@/lib/server/session-auth";
import {
  updateReviewSchema,
  type UpdateReviewPayload,
} from "@/lib/reviews/schemas";

type UpdateReviewActionResult = {
  success: boolean;
  message: string;
};

export const updateReviewAction = async (
  payload: UpdateReviewPayload
): Promise<UpdateReviewActionResult> => {
  const parsed = updateReviewSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid review update payload.",
    };
  }

  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return {
      success: false,
      message: SESSION_EXPIRED_MESSAGE,
    };
  }

  const { reviewId, rating, comment } = parsed.data;

  try {
    await apiFetch<unknown>(`/reviews/${reviewId}`, {
      method: "PATCH",
      headers: authHeader,
      body: {
        rating,
        comment: comment?.trim() || undefined,
      },
      cache: "no-store",
    });

    return {
      success: true,
      message: "Review updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update review.",
    };
  }
};
