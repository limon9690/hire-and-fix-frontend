"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateEmployeeProfileAction } from "@/lib/dashboard/profile/actions";
import type { EmployeeProfile } from "@/lib/dashboard/profile/types";
import {
  employeeProfileUpdateSchema,
  type EmployeeProfileUpdatePayload,
} from "@/lib/dashboard/profile/schemas";

type EmployeeProfileFormProps = {
  profile: EmployeeProfile | null;
};

export function EmployeeProfileForm({ profile }: EmployeeProfileFormProps) {
  const router = useRouter();
  const form = useForm<EmployeeProfileUpdatePayload>({
    resolver: zodResolver(employeeProfileUpdateSchema),
    defaultValues: {
      profilePhoto: profile?.profilePhoto || "",
      bio: profile?.bio || "",
      address: profile?.address || "",
      phone: profile?.phone || "",
    },
  });

  const onSubmit = async (values: EmployeeProfileUpdatePayload) => {
    const result = await updateEmployeeProfileAction(values);
    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  return (
    <Card className="ring-0">
      <CardHeader>
        <CardTitle>Employee Profile</CardTitle>
        <CardDescription>
          Update your public profile details used for bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="employee-photo">Profile photo URL (optional)</Label>
            <Input
              id="employee-photo"
              type="url"
              aria-invalid={Boolean(form.formState.errors.profilePhoto)}
              {...form.register("profilePhoto")}
            />
            {form.formState.errors.profilePhoto ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.profilePhoto.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="employee-bio">Bio</Label>
            <textarea
              id="employee-bio"
              rows={4}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-invalid={Boolean(form.formState.errors.bio)}
              {...form.register("bio")}
            />
            {form.formState.errors.bio ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.bio.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="employee-address">Address</Label>
              <Input
                id="employee-address"
                type="text"
                aria-invalid={Boolean(form.formState.errors.address)}
                {...form.register("address")}
              />
              {form.formState.errors.address ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.address.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-phone">Phone</Label>
              <Input
                id="employee-phone"
                type="tel"
                aria-invalid={Boolean(form.formState.errors.phone)}
                {...form.register("phone")}
              />
              {form.formState.errors.phone ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.phone.message}
                </p>
              ) : null}
            </div>
          </div>

          <Button
            type="submit"
            className="cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
