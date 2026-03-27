import type { Role } from "@/lib/auth/roles";

export type SidebarNavItem = {
  href: string;
  label: string;
};

export const dashboardGeneralNavItems: SidebarNavItem[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/profile", label: "Profile" },
];

const roleSidebarNavItems: Record<Role, SidebarNavItem[]> = {
  USER: [
    { href: "/dashboard/user/bookings", label: "Bookings" },
    { href: "/dashboard/user/reviews", label: "Reviews" },
  ],
  VENDOR: [
    { href: "/dashboard/vendor", label: "Dashboard Summary" },
    { href: "/dashboard/vendor/employees", label: "Manage Employees" },
    { href: "/dashboard/vendor/bookings", label: "Manage Bookings" },
  ],
  EMPLOYEE: [{ href: "/dashboard/employee/bookings", label: "Assigned Bookings" }],
  ADMIN: [
    { href: "/dashboard/admin", label: "Dashboard Summary" },
    { href: "/dashboard/admin/users", label: "Manage Users" },
    { href: "/dashboard/admin/vendors", label: "Vendors" },
    { href: "/dashboard/admin/employees", label: "Employees" },
    { href: "/dashboard/admin/bookings", label: "Bookings" },
    { href: "/dashboard/admin/payments", label: "Payments" },
    { href: "/dashboard/admin/categories", label: "Categories" },
  ],
};

export const getRoleSidebarNavItems = (role: Role | null | undefined) => {
  if (!role) {
    return [];
  }

  return roleSidebarNavItems[role] ?? [];
};
