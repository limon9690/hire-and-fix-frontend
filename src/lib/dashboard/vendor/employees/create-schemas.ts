import { z } from "zod";
import {
  requiredProfilePhotoField,
  vendorEmployeeCommonFields,
} from "./fields";

export const vendorEmployeeCreateSchema = z.object({
  ...vendorEmployeeCommonFields,
  password: z.string().min(8, "Password must be at least 8 characters"),
  profilePhoto: requiredProfilePhotoField,
});

export type VendorEmployeeCreatePayload = z.infer<typeof vendorEmployeeCreateSchema>;
