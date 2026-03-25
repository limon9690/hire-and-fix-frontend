import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BasicProfileInfo } from "@/lib/dashboard/profile";

type BasicInfoCardProps = {
  profile: BasicProfileInfo;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function BasicInfoCard({ profile }: BasicInfoCardProps) {
  return (
    <Card className="ring-0">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          This section is currently read-only.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Name
            </dt>
            <dd className="mt-1 text-sm font-medium">{profile.name || "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Role
            </dt>
            <dd className="mt-1 text-sm font-medium">{profile.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Email
            </dt>
            <dd className="mt-1 break-all text-sm font-medium">
              {profile.email}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">
              Joined
            </dt>
            <dd className="mt-1 text-sm font-medium">
              {formatDate(profile.createdAt)}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
