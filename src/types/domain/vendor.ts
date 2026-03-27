import type { UserIdentity } from "./user";

export type VendorSummary = {
  id: string;
  vendorName: string;
  logo: string | null;
  phone: string | null;
  address: string | null;
  isApproved: boolean;
  isActive: boolean;
};

export type VendorCard = VendorSummary & {
  description: string | null;
  user: UserIdentity | null;
};

export type VendorReviewSummary = {
  averageRating: number;
  totalReviews: number;
  employeeCount: number;
};

export type VendorDetails = VendorSummary & {
  userId: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  user:
    | (UserIdentity & {
        createdAt?: string;
        updatedAt?: string;
      })
    | null;
  reviewSummary?: VendorReviewSummary | null;
};
