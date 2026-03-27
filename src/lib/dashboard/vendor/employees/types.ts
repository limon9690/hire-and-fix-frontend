export type VendorEmployeeItem = {
  id: string;
  isActive: boolean;
  isDeleted: boolean;
  hourlyRate: string;
  experienceYears: number;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  serviceCategory: {
    id: string;
    name: string;
    description: string | null;
  } | null;
};

export type VendorEmployeeDetails = {
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
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  vendor: {
    id: string;
    vendorName: string;
    logo: string | null;
    phone: string;
    address: string;
    isApproved: boolean;
    isActive: boolean;
  } | null;
  serviceCategory: {
    id: string;
    name: string;
    description: string | null;
  } | null;
};
