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

export const updateReviewSchema = z
  .object({
    reviewId: z.string().uuid("Invalid review."),
    rating: z
      .number({
        invalid_type_error: "Rating must be a number.",
      })
      .int("Rating must be a whole number.")
      .min(1, "Rating must be at least 1.")
      .max(5, "Rating cannot be more than 5.")
      .optional(),
    comment: z
      .string()
      .trim()
      .max(500, "Comment must be 500 characters or fewer.")
      .optional(),
  })
  .superRefine((value, context) => {
    if (value.rating === undefined && value.comment === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide at least one field to update.",
        path: ["rating"],
      });
    }
  });

export type UpdateReviewPayload = z.infer<typeof updateReviewSchema>;
