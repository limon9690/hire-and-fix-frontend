import { z } from "zod";

export const vendorProfileUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Enter a valid email address"),
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

export type VendorProfileUpdatePayload = z.infer<
  typeof vendorProfileUpdateSchema
>;

export const employeeProfileUpdateSchema = z.object({
  profilePhoto: z
    .string()
    .url("Enter a valid photo URL")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(1000, "Bio cannot exceed 1000 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address cannot exceed 300 characters"),
  phone: z.string().min(7, "Phone number is required"),
});

export type EmployeeProfileUpdatePayload = z.infer<
  typeof employeeProfileUpdateSchema
>;
