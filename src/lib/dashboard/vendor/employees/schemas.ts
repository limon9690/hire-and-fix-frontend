import { z } from "zod";
import {
  optionalProfilePhotoField,
  vendorEmployeeCommonFields,
} from "./fields";

export const vendorEmployeeEditSchema = z.object({
  ...vendorEmployeeCommonFields,
  profilePhoto: optionalProfilePhotoField,
  isActive: z.boolean(),
});

export type VendorEmployeeEditPayload = z.infer<typeof vendorEmployeeEditSchema>;
