"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { getApiErrorMessage } from "@/lib/api/handle-api-error";
import { registerVendor } from "@/lib/auth/auth-api";
import {
  registerVendorSchema,
  type RegisterVendorPayload,
} from "@/lib/auth/schemas";
import { toast } from "sonner";

export default function RegisterVendorPage() {
  const router = useRouter();
  const form = useForm<RegisterVendorPayload>({
    resolver: zodResolver(registerVendorSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      vendorName: "",
      logo: "",
      phone: "",
      description: "",
      address: "",
    },
  });

  const onSubmit = async (values: RegisterVendorPayload) => {
    try {
      await registerVendor(values);
      toast.success("Vendor registration successful");
      form.reset();
      setTimeout(() => router.push("/login"), 500);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to register vendor"));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create Vendor Account</CardTitle>
        <CardDescription>
          Register your business to manage employees and bookings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Owner full name"
              aria-invalid={Boolean(form.formState.errors.name)}
              {...form.register("name")}
            />
            {form.formState.errors.name ? (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="business@example.com"
                aria-invalid={Boolean(form.formState.errors.email)}
                {...form.register("email")}
              />
              {form.formState.errors.email ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Create a strong password"
                aria-invalid={Boolean(form.formState.errors.password)}
                {...form.register("password")}
              />
              {form.formState.errors.password ? (
                <p className="text-sm text-destructive">
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendorName">Vendor name</Label>
            <Input
              id="vendorName"
              type="text"
              placeholder="BrightFix Home Services"
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+1 555 210 7788"
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
              <Label htmlFor="logo">Logo URL (optional)</Label>
              <Input
                id="logo"
                type="url"
                placeholder="https://example.com/logo.png"
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
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              rows={4}
              placeholder="Describe your services and strengths"
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
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              autoComplete="street-address"
              placeholder="2457 Green Valley Ave, Dallas, TX 75201"
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
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating vendor account..." : "Create vendor account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-foreground underline">
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
