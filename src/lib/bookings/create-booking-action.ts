"use server";

import { apiFetch } from "@/lib/api/client";
import {
  getSessionAuthHeader,
  SESSION_EXPIRED_MESSAGE,
} from "@/lib/server/session-auth";
import {
  createBookingSchema,
  type CreateBookingPayload,
} from "./create-booking-schemas";

type CreateBookingActionResult = {
  success: boolean;
  message: string;
  bookingId?: string;
};

const toIsoWithOffset = (date: string, time: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const localDate = new Date(year, month - 1, day, hour, minute, 0, 0);

  const pad = (value: number) => String(Math.abs(value)).padStart(2, "0");
  const offsetMinutes = -localDate.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const offsetHour = pad(Math.floor(Math.abs(offsetMinutes) / 60));
  const offsetMinute = pad(Math.abs(offsetMinutes) % 60);

  return `${date}T${time}:00${sign}${offsetHour}:${offsetMinute}`;
};

export const createBookingAction = async (
  payload: CreateBookingPayload
): Promise<CreateBookingActionResult> => {
  const parsed = createBookingSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid booking payload.",
    };
  }

  const authHeader = await getSessionAuthHeader();
  if (!authHeader) {
    return {
      success: false,
      message: SESSION_EXPIRED_MESSAGE,
    };
  }

  const { employeeId, date, startTime, endTime, serviceAddress, note } = parsed.data;

  try {
    const created = await apiFetch<{ id?: string }>("/bookings", {
      method: "POST",
      headers: authHeader,
      body: {
        employeeId,
        startTime: toIsoWithOffset(date, startTime),
        endTime: toIsoWithOffset(date, endTime),
        serviceAddress: serviceAddress.trim(),
        note: note?.trim() || undefined,
      },
      cache: "no-store",
    });

    return {
      success: true,
      message: "Booking requested successfully.",
      bookingId: typeof created?.id === "string" ? created.id : undefined,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create booking.",
    };
  }
};
