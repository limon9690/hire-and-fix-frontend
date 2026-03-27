import type { DashboardProfileData } from "@/lib/dashboard/profile/types";
import { EmployeeProfileForm } from "./employee-profile-form";
import { VendorProfileForm } from "./vendor-profile-form";

type RoleProfileSectionProps = {
  profileData: DashboardProfileData;
};

export function RoleProfileSection({ profileData }: RoleProfileSectionProps) {
  const { basic, profile } = profileData;

  if (basic.role === "VENDOR") {
    return (
      <VendorProfileForm
        basic={basic}
        profile={profile && "vendorName" in profile ? profile : null}
      />
    );
  }

  if (basic.role === "EMPLOYEE") {
    return (
      <EmployeeProfileForm
        profile={profile && "serviceCategoryId" in profile ? profile : null}
      />
    );
  }

  return null;
}
