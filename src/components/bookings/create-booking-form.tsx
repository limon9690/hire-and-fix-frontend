"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBookingAction } from "@/lib/bookings/create-booking-action";
import {
  createBookingSchema,
  type CreateBookingPayload,
} from "@/lib/bookings/create-booking-schemas";

type BookingEmployeeSummary = {
  id: string;
  name: string;
  serviceCategory: string;
  vendorName: string;
  hourlyRate: string | null;
};

type CreateBookingFormProps = {
  employee: BookingEmployeeSummary;
};

const formatCurrency = (value: string | null) => {
  if (!value) {
    return "—";
  }

  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return value;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numeric);
};

export function CreateBookingForm({ employee }: CreateBookingFormProps) {
  const form = useForm<CreateBookingPayload>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      employeeId: employee.id,
      date: "",
      startTime: "",
      endTime: "",
      serviceAddress: "",
      note: "",
    },
  });

  const onSubmit = async (values: CreateBookingPayload) => {
    const result = await createBookingAction(values);
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    if (result.bookingId) {
      window.location.assign(`/dashboard/user/bookings/${result.bookingId}`);
      return;
    }
    window.location.assign("/dashboard/user/bookings");
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <section className="space-y-6 rounded-xl border border-border bg-card p-6">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight">Booking Schedule</h2>
          <p className="text-sm text-muted-foreground">
            Choose your preferred date and time for this service.
          </p>
        </div>

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <input type="hidden" {...form.register("employeeId")} />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2 sm:col-span-1">
              <Label htmlFor="booking-date">Date</Label>
              <Input id="booking-date" type="date" {...form.register("date")} />
              {form.formState.errors.date ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.date.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2 sm:col-span-1">
              <Label htmlFor="booking-start">Start Time</Label>
              <Input id="booking-start" type="time" {...form.register("startTime")} />
              {form.formState.errors.startTime ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.startTime.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2 sm:col-span-1">
              <Label htmlFor="booking-end">End Time</Label>
              <Input id="booking-end" type="time" {...form.register("endTime")} />
              {form.formState.errors.endTime ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.endTime.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-address">Service Address</Label>
            <Input
              id="booking-address"
              placeholder="123 Main St, Dallas, TX"
              {...form.register("serviceAddress")}
            />
            {form.formState.errors.serviceAddress ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.serviceAddress.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-note">Note (Optional)</Label>
            <textarea
              id="booking-note"
              rows={4}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              placeholder="Add any extra instructions for this booking..."
              {...form.register("note")}
            />
            {form.formState.errors.note ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.note.message}
              </p>
            ) : null}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Request Booking"}
            </Button>
          </div>
        </form>
      </section>

      <aside className="space-y-4">
        <section className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold tracking-tight">Selected Professional</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Name</dt>
              <dd className="font-medium">{employee.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Service Category</dt>
              <dd className="font-medium">{employee.serviceCategory}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Vendor</dt>
              <dd className="font-medium">{employee.vendorName}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Hourly Rate</dt>
              <dd className="font-medium">{formatCurrency(employee.hourlyRate)}</dd>
            </div>
          </dl>
        </section>
      </aside>
    </div>
  );
}
