"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import {
  updateReviewSchema,
  type UpdateReviewPayload,
} from "@/lib/reviews/update-review-schema";

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

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  const { reviewId, rating, comment } = parsed.data;

  try {
    await apiFetch<unknown>(`/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
