export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  CONTENT_MANAGER = "CONTENT_MANAGER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  profileImage?: string;
  image?: string;

  needsPasswordChange: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
