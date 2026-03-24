import type { Role } from "./roles";

export const getDashboardPathByRole = (role: Role) => {
  switch (role) {
    case "USER":
      return "/dashboard";
    case "VENDOR":
      return "/dashboard";
    case "EMPLOYEE":
      return "/dashboard";
    case "ADMIN":
      return "/dashboard";
    default:
      return "/unauthorized";
  }
};
