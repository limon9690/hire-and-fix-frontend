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
import { updateVendorProfileAction } from "@/lib/dashboard/profile/actions";
import type {
  BasicProfileInfo,
  VendorProfile,
} from "@/lib/dashboard/profile/types";
import {
  vendorProfileUpdateSchema,
  type VendorProfileUpdatePayload,
} from "@/lib/dashboard/profile/schemas";

type VendorProfileFormProps = {
  basic: BasicProfileInfo;
  profile: VendorProfile | null;
};

export function VendorProfileForm({ basic, profile }: VendorProfileFormProps) {
  const router = useRouter();
  const form = useForm<VendorProfileUpdatePayload>({
    resolver: zodResolver(vendorProfileUpdateSchema),
    defaultValues: {
      name: basic.name || "",
      email: basic.email || "",
      vendorName: profile?.vendorName || "",
      logo: profile?.logo || "",
      phone: profile?.phone || "",
      description: profile?.description || "",
      address: profile?.address || "",
    },
  });

  const onSubmit = async (values: VendorProfileUpdatePayload) => {
    const result = await updateVendorProfileAction(values);
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
        <CardTitle>Vendor Profile</CardTitle>
        <CardDescription>
          Update your account and company profile details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendor-name">Full name</Label>
              <Input
                id="vendor-name"
                type="text"
                aria-invalid={Boolean(form.formState.errors.name)}
                {...form.register("name")}
              />
              {form.formState.errors.name ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendor-email">Email</Label>
              <Input
                id="vendor-email"
                type="email"
                aria-invalid={Boolean(form.formState.errors.email)}
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor-vendorName">Vendor name</Label>
            <Input
              id="vendor-vendorName"
              type="text"
              aria-invalid={Boolean(form.formState.errors.vendorName)}
              {...form.register("vendorName")}
            />
            {form.formState.errors.vendorName ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.vendorName.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendor-phone">Phone</Label>
              <Input
                id="vendor-phone"
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
            <div className="space-y-2">
              <Label htmlFor="vendor-logo">Logo URL (optional)</Label>
              <Input
                id="vendor-logo"
                type="url"
                aria-invalid={Boolean(form.formState.errors.logo)}
                {...form.register("logo")}
              />
              {form.formState.errors.logo ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.logo.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor-description">Description</Label>
            <textarea
              id="vendor-description"
              rows={4}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              aria-invalid={Boolean(form.formState.errors.description)}
              {...form.register("description")}
            />
            {form.formState.errors.description ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendor-address">Address</Label>
            <Input
              id="vendor-address"
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
