export type UserRole = 'user' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  purchasedCourses: string[];
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  fullDescription: string;
  benefits: string[];
  learnings: string[];
  isComingSoon?: boolean;
}

export interface PaymentProof {
  id: string;
  userId: string;
  userEmail: string;
  utrId: string;
  courseId: string;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: string;
}
