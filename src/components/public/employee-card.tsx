import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { EmployeeCardItem } from "@/lib/public/employees";

type EmployeeCardProps = {
  employee: EmployeeCardItem;
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase() ?? "").join("");
};

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const name = employee.user?.name || "Professional";
  const vendorName = employee.vendor?.vendorName || "Independent";
  const category = employee.serviceCategory?.name || "General Service";
  const rate = employee.hourlyRate ? `$${employee.hourlyRate}/hr` : "Rate unavailable";
  const experience =
    typeof employee.experienceYears === "number"
      ? `${employee.experienceYears} years experience`
      : "Experience not listed";

  return (
    <Card className="h-full border-border/80">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3">
          {employee.profilePhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={employee.profilePhoto}
              alt={name}
              className="h-16 w-16 rounded-full object-cover ring-1 ring-border"
            />
          ) : (
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary ring-1 ring-border">
              {getInitials(name) || "PR"}
            </div>
          )}
          <div className="space-y-0.5">
            <CardTitle className="text-base">{name}</CardTitle>
            <p className="text-xs text-muted-foreground">{vendorName}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
            {category}
          </span>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-medium">{rate}</p>
          <p className="text-muted-foreground">{experience}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/services/${employee.id}`}
          className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
