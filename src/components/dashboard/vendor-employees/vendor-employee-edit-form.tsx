"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateVendorEmployeeAction } from "@/lib/dashboard/vendor-employee-actions";
import {
  vendorEmployeeEditSchema,
  type VendorEmployeeEditPayload,
} from "@/lib/dashboard/vendor-employee-schemas";
import type { VendorEmployeeDetails } from "@/lib/dashboard/vendor-employee-details";
import type { ServiceCategory } from "@/lib/public/service-categories";

type VendorEmployeeEditFormProps = {
  employee: VendorEmployeeDetails;
  categories: ServiceCategory[];
};

export function VendorEmployeeEditForm({
  employee,
  categories,
}: VendorEmployeeEditFormProps) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const form = useForm<VendorEmployeeEditPayload>({
    resolver: zodResolver(vendorEmployeeEditSchema),
    defaultValues: {
      name: employee.user?.name || "",
      email: employee.user?.email || "",
      serviceCategoryId: employee.serviceCategoryId,
      profilePhoto: employee.profilePhoto || "",
      bio: employee.bio || "",
      address: employee.address || "",
      phone: employee.phone || "",
      hourlyRate: Number(employee.hourlyRate) || 0,
      experienceYears: employee.experienceYears,
      isActive: employee.isActive,
    },
  });

  const watchedValues = form.watch();
  const initialValues = useMemo(
    () => ({
      name: employee.user?.name || "",
      email: employee.user?.email || "",
      serviceCategoryId: employee.serviceCategoryId,
      profilePhoto: employee.profilePhoto || "",
      bio: employee.bio || "",
      address: employee.address || "",
      phone: employee.phone || "",
      hourlyRate: Number(employee.hourlyRate) || 0,
      experienceYears: employee.experienceYears,
      isActive: employee.isActive,
    }),
    [employee]
  );

  const buildChangedPayload = () => {
    const payload: Record<string, unknown> = {};

    (Object.keys(initialValues) as Array<keyof VendorEmployeeEditPayload>).forEach(
      (key) => {
        const initial = initialValues[key];
        const current = watchedValues[key];
        if (initial !== current) {
          payload[key] = current;
        }
      }
    );

    return payload as Partial<VendorEmployeeEditPayload>;
  };

  const hasChanges = Object.keys(buildChangedPayload()).length > 0;

  const handleConfirmUpdate = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    const changedPayload = buildChangedPayload();
    if (Object.keys(changedPayload).length === 0) {
      toast.error("No changes to update.");
      setConfirmOpen(false);
      return;
    }

    const result = await updateVendorEmployeeAction(employee.id, changedPayload);
    if (!result.success) {
      toast.error(result.message);
      setConfirmOpen(false);
      return;
    }

    toast.success(result.message);
    setConfirmOpen(false);
    router.push(`/dashboard/vendor/employees/${employee.id}`);
    router.refresh();
  };

  return (
    <section className="space-y-6 rounded-xl border border-border bg-card p-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Edit Employee</h2>
        <p className="text-sm text-muted-foreground">
          Update employee account and profile details.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input id="edit-name" {...form.register("name")} />
            {form.formState.errors.name ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input id="edit-email" type="email" {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-category">Service Category</Label>
          <select
            id="edit-category"
            className="h-9 w-full rounded-lg border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
            {...form.register("serviceCategoryId")}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {form.formState.errors.serviceCategoryId ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.serviceCategoryId.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-profilePhoto">Profile Photo URL (optional)</Label>
          <Input id="edit-profilePhoto" type="url" {...form.register("profilePhoto")} />
          {form.formState.errors.profilePhoto ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.profilePhoto.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="edit-bio">Bio</Label>
          <textarea
            id="edit-bio"
            rows={4}
            className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            {...form.register("bio")}
          />
          {form.formState.errors.bio ? (
            <p className="text-sm text-destructive">{form.formState.errors.bio.message}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="edit-address">Address</Label>
            <Input id="edit-address" {...form.register("address")} />
            {form.formState.errors.address ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.address.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone</Label>
            <Input id="edit-phone" {...form.register("phone")} />
            {form.formState.errors.phone ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.phone.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="edit-hourlyRate">Hourly Rate</Label>
            <Input
              id="edit-hourlyRate"
              type="number"
              min="0"
              step="0.01"
              {...form.register("hourlyRate", { valueAsNumber: true })}
            />
            {form.formState.errors.hourlyRate ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.hourlyRate.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-experienceYears">Experience Years</Label>
            <Input
              id="edit-experienceYears"
              type="number"
              min="0"
              step="1"
              {...form.register("experienceYears", { valueAsNumber: true })}
            />
            {form.formState.errors.experienceYears ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.experienceYears.message}
              </p>
            ) : null}
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...form.register("isActive")} />
          Active
        </label>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Button
            type="button"
            className="cursor-pointer"
            disabled={!hasChanges || form.formState.isSubmitting}
            onClick={() => setConfirmOpen(true)}
          >
            Save Changes
          </Button>
          <Link
            href={`/dashboard/vendor/employees/${employee.id}`}
            className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </Link>
        </div>
      </form>

      {confirmOpen ? (
        <div className="rounded-lg border border-border bg-background p-4">
          <p className="text-sm font-medium">
            Confirm update for this employee profile?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            This will apply all edited fields immediately.
          </p>
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              className="cursor-pointer"
              onClick={handleConfirmUpdate}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Updating..." : "Confirm"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={() => setConfirmOpen(false)}
              disabled={form.formState.isSubmitting}
            >
              Back
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
