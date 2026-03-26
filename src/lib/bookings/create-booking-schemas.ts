import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^\d{2}:\d{2}$/;

export const createBookingSchema = z
  .object({
    employeeId: z.string().uuid("Invalid employee selected."),
    date: z.string().regex(datePattern, "Date is required."),
    startTime: z.string().regex(timePattern, "Start time is required."),
    endTime: z.string().regex(timePattern, "End time is required."),
    serviceAddress: z
      .string()
      .trim()
      .min(5, "Service address must be at least 5 characters."),
    note: z.string().trim().max(500, "Note must be 500 characters or fewer.").optional(),
  })
  .superRefine((value, context) => {
    const [startHour, startMinute] = value.startTime.split(":").map(Number);
    const [endHour, endMinute] = value.endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    if (endMinutes <= startMinutes) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endTime"],
        message: "End time must be after start time.",
      });
    }
  });

export type CreateBookingPayload = z.infer<typeof createBookingSchema>;
