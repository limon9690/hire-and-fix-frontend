"use client";

import { useEffect, useState } from "react";
import type { VendorEmployeeItem } from "@/lib/dashboard/vendor-employees";
import { VendorEmployeeCard } from "./vendor-employee-card";

type VendorEmployeesListProps = {
  employees: VendorEmployeeItem[];
};

export function VendorEmployeesList({ employees }: VendorEmployeesListProps) {
  const [visibleEmployees, setVisibleEmployees] = useState(employees);

  useEffect(() => {
    setVisibleEmployees(employees);
  }, [employees]);

  const handleDeleted = (employeeId: string) => {
    setVisibleEmployees((current) =>
      current.filter((employee) => employee.id !== employeeId)
    );
  };

  if (visibleEmployees.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight">No employees yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your first employee to start receiving bookings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visibleEmployees.map((employee) => (
        <VendorEmployeeCard
          key={employee.id}
          employee={employee}
          onDeleted={handleDeleted}
        />
      ))}
    </div>
  );
}
