import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginPayload = z.infer<typeof loginSchema>;

export const registerUserSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type RegisterUserPayload = z.infer<typeof registerUserSchema>;

export const registerVendorSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  vendorName: z
    .string()
    .min(2, "Vendor name must be at least 2 characters")
    .max(120, "Vendor name cannot exceed 120 characters"),
  logo: z
    .string()
    .url("Enter a valid logo URL")
    .optional()
    .or(z.literal("")),
  phone: z.string().min(7, "Phone number is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address cannot exceed 300 characters"),
});

export type RegisterVendorPayload = z.infer<typeof registerVendorSchema>;
