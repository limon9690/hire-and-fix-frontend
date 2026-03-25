import { z } from "zod";

export const vendorEmployeeCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  serviceCategoryId: z.string().min(1, "Service category is required"),
  profilePhoto: z
    .string()
    .min(1, "Profile photo URL is required")
    .url("Enter a valid photo URL"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(1000, "Bio cannot exceed 1000 characters"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(300, "Address cannot exceed 300 characters"),
  phone: z.string().min(7, "Phone number is required"),
  hourlyRate: z.coerce.number().min(0, "Hourly rate must be positive"),
  experienceYears: z.coerce.number().int().min(0, "Experience must be 0 or more"),
});

export type VendorEmployeeCreatePayload = z.infer<typeof vendorEmployeeCreateSchema>;
