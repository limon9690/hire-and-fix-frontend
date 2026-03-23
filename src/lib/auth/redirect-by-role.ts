import type { Role } from "./roles";

export const getDashboardPathByRole = (role: Role) => {
  switch (role) {
    case "USER":
      return "/dashboard/user";
    case "VENDOR":
      return "/dashboard/vendor";
    case "EMPLOYEE":
      return "/dashboard/employee";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/unauthorized";
  }
};
