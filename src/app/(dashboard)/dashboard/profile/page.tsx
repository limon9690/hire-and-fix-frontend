import { BasicInfoCard } from "@/components/dashboard/profile/basic-info-card";
import { RoleProfileSection } from "@/components/dashboard/profile/role-profile-section";
import { getDashboardProfileData } from "@/lib/dashboard/profile/profile";

export default async function DashboardProfilePage() {
  const { data, error } = await getDashboardProfileData();

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">
          Manage your account details and role profile settings.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {data ? <BasicInfoCard profile={data.basic} /> : null}
      {data ? <RoleProfileSection profileData={data} /> : null}
    </section>
  );
}
