import { api } from "@/lib/api";
import { IReview, ApiResponse, PaginatedResponse } from "@/types";

export const reviewService = {
  getByDestination: async (destinationId: string) => {
    return api.get<PaginatedResponse<IReview>>(`/reviews/${destinationId}`);
  },
  create: async (data: any) => {
    return api.post<ApiResponse<IReview>>("/reviews", data);
  },
};
