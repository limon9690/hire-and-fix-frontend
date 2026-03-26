import { z } from "zod";

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
