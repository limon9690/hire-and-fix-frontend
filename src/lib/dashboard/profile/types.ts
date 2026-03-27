import type { Role } from "@/lib/auth/roles";
import type {
  EmployeeProfile,
  RoleProfile,
  UserBaseInfo,
  UserProfile,
  VendorProfile,
} from "@/types/domain/user";

export type { UserProfile, VendorProfile, EmployeeProfile };

export type AuthMeResponse = UserBaseInfo & {
  role: Role;
  profile: RoleProfile;
};

export type BasicProfileInfo = Pick<
  AuthMeResponse,
  "id" | "name" | "email" | "role" | "createdAt" | "updatedAt"
>;

export type DashboardProfileData = {
  basic: BasicProfileInfo;
  profile: RoleProfile;
};
