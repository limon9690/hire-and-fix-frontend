import { z } from "zod";

export const createReviewSchema = z.object({
  bookingId: z.string().uuid("Invalid booking."),
  rating: z
    .number({
      invalid_type_error: "Rating is required.",
      required_error: "Rating is required.",
    })
    .int("Rating must be a whole number.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot be more than 5."),
  comment: z
    .string()
    .trim()
    .max(500, "Comment must be 500 characters or fewer.")
    .optional(),
});

export type CreateReviewPayload = z.infer<typeof createReviewSchema>;
