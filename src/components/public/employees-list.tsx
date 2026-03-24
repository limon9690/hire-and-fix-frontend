import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { EmployeeCard } from "@/components/public/employee-card";
import type { EmployeeCardItem } from "@/lib/public/employees";

type EmployeesListProps = {
  employees: EmployeeCardItem[];
  error: string | null;
};

export function EmployeesList({ employees, error }: EmployeesListProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Could not load professionals</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        No professionals found yet.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}
