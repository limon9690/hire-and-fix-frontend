"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
import {
  createReviewSchema,
  type CreateReviewPayload,
} from "@/lib/reviews/create-review-schema";

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

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  try {
    await apiFetch<unknown>("/reviews", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
