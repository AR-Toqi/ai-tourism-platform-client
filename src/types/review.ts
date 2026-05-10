import { IUser } from "./user";

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  destinationId: string;
  isHidden: boolean;
  user: Pick<IUser, "id" | "name" | "image">;
  createdAt: string;
  updatedAt: string;
}
