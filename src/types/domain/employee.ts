import type { ServiceCategory } from "./category";
import type { VendorSummary } from "./vendor";
import type { UserIdentity } from "./user";

export type EmployeeCard = {
  id: string;
  profilePhoto: string | null;
  hourlyRate: string | null;
  experienceYears: number | null;
  user: Pick<UserIdentity, "name"> | null;
  vendor: Pick<VendorSummary, "vendorName"> | null;
  serviceCategory: Pick<ServiceCategory, "name"> | null;
};

export type EmployeeDetails = {
  id: string;
  profilePhoto: string | null;
  bio: string | null;
  address: string | null;
  phone: string | null;
  hourlyRate: string | null;
  experienceYears: number | null;
  isActive: boolean;
  user: UserIdentity | null;
  vendor: VendorSummary | null;
  serviceCategory: ServiceCategory | null;
};

export type EmployeeReviewItem = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: Pick<UserIdentity, "id" | "name" | "role"> | null;
};

export type EmployeeReviews = {
  averageRating: number;
  totalReviews: number;
  reviews: EmployeeReviewItem[];
};
