import { IUser } from "./user";

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  destinationId: string;
  user: Pick<IUser, "id" | "name" | "profileImage">;
  createdAt: string;
  updatedAt: string;
}
