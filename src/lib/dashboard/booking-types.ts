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

export type MyBookingItem = {
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
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  vendor: {
    id: string;
    vendorName: string;
    logo: string | null;
    phone: string;
    address: string;
    isApproved: boolean;
    isActive: boolean;
  };
  employee: {
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
    };
    serviceCategory: {
      id: string;
      name: string;
      description: string | null;
    };
  };
  payment: {
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
  review: BookingReview | null;
};
