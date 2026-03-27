import type { ServiceCategory } from "./category";
import type { VendorSummary } from "./vendor";

export type BookingActor = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REJECTED"
  | "CANCELLED"
  | string;

export type PaymentStatus =
  | "PENDING"
  | "UNPAID"
  | "PAID"
  | "SUCCESSFUL"
  | "FAILED"
  | "REFUNDED"
  | string;

export type BookingSortBy = "createdAt" | "startTime" | "endTime" | "totalPrice";

export type BookingReview = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BookingPayment = {
  id: string;
  bookingId: string;
  amount: string;
  status: PaymentStatus;
  provider: string;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
} | null;

export type BookingEmployee = {
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
  user: BookingActor;
  serviceCategory: ServiceCategory;
};

export type BookingRecord = {
  id: string;
  userId: string;
  vendorId: string;
  employeeId: string;
  startTime: string;
  endTime: string;
  serviceAddress: string;
  note: string | null;
  totalPrice: string;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  user?: BookingActor;
  vendor: VendorSummary;
  employee: BookingEmployee;
  payment: BookingPayment;
  review: BookingReview | null;
};
