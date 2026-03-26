"use server";

import { cookies } from "next/headers";
import { apiFetch } from "@/lib/api/client";
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

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  if (!sessionToken) {
    return {
      success: false,
      message: "Session expired. Please log in again.",
    };
  }

  const { employeeId, date, startTime, endTime, serviceAddress, note } = parsed.data;

  try {
    const created = await apiFetch<{ id?: string }>("/bookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
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
