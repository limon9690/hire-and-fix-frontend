export type AppRole = "USER" | "VENDOR" | "EMPLOYEE" | "ADMIN" | string;

export type UserIdentity = {
  id: string;
  name: string | null;
  email: string;
  role: AppRole;
};

export type UserBaseInfo = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  createdAt: string;
  updatedAt: string;
};

export type UserProfile = {
  id: string;
  userId: string;
  phone: string | null;
  address: string | null;
  profilePhoto: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type VendorProfile = {
  id: string;
  userId: string;
  vendorName: string | null;
  logo: string | null;
  phone: string | null;
  description: string | null;
  address: string | null;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EmployeeProfile = {
  id: string;
  userId: string;
  vendorId: string;
  serviceCategoryId: string;
  profilePhoto: string | null;
  bio: string | null;
  address: string | null;
  phone: string | null;
  hourlyRate: string;
  experienceYears: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  serviceCategory?: {
    id: string;
    name: string | null;
    description: string | null;
  } | null;
  vendor?: {
    id: string;
    vendorName: string | null;
    logo: string | null;
    phone: string | null;
    address: string | null;
    isApproved: boolean;
    isActive: boolean;
  } | null;
};

export type RoleProfile = UserProfile | VendorProfile | EmployeeProfile | null;
