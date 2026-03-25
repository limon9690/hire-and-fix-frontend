"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createVendorEmployeeAction } from "@/lib/dashboard/vendor-employee-create-actions";
import {
  vendorEmployeeCreateSchema,
  type VendorEmployeeCreatePayload,
} from "@/lib/dashboard/vendor-employee-create-schemas";
import type { ServiceCategory } from "@/lib/public/service-categories";

type VendorEmployeeCreateFormProps = {
  categories: ServiceCategory[];
};

export function VendorEmployeeCreateForm({
  categories,
}: VendorEmployeeCreateFormProps) {
  const form = useForm<VendorEmployeeCreatePayload>({
    resolver: zodResolver(vendorEmployeeCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      serviceCategoryId: categories[0]?.id || "",
      profilePhoto: "",
      bio: "",
      address: "",
      phone: "",
      hourlyRate: 0,
      experienceYears: 0,
    },
  });

  const onSubmit = async (values: VendorEmployeeCreatePayload) => {
    const result = await createVendorEmployeeAction(values);
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    window.location.assign("/dashboard/vendor/employees");
  };

  return (
    <section className="space-y-6 rounded-xl border border-border bg-card p-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Add Employee</h2>
        <p className="text-sm text-muted-foreground">
          Create a new employee account and profile.
        </p>
      </div>

      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="create-name">Name</Label>
            <Input id="create-name" {...form.register("name")} />
            {form.formState.errors.name ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-email">Email</Label>
            <Input id="create-email" type="email" {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="create-password">Password</Label>
          <Input
            id="create-password"
            type="password"
            autoComplete="new-password"
            {...form.register("password")}
          />
          {form.formState.errors.password ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="create-category">Service Category</Label>
          <select
            id="create-category"
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
          <Label htmlFor="create-profilePhoto">Profile Photo URL</Label>
          <Input
            id="create-profilePhoto"
            type="url"
            {...form.register("profilePhoto")}
          />
          {form.formState.errors.profilePhoto ? (
            <p className="text-sm text-destructive">
              {form.formState.errors.profilePhoto.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="create-bio">Bio</Label>
          <textarea
            id="create-bio"
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
            <Label htmlFor="create-address">Address</Label>
            <Input id="create-address" {...form.register("address")} />
            {form.formState.errors.address ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.address.message}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="create-phone">Phone</Label>
            <Input id="create-phone" {...form.register("phone")} />
            {form.formState.errors.phone ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.phone.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="create-hourlyRate">Hourly Rate</Label>
            <Input
              id="create-hourlyRate"
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
            <Label htmlFor="create-experienceYears">Experience Years</Label>
            <Input
              id="create-experienceYears"
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

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Employee"}
          </Button>
          <Link
            href="/dashboard/vendor/employees"
            className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
