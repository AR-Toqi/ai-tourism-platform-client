import { api } from "@/lib/api";
import { IDestination, PaginatedResponse, ApiResponse } from "@/types";

export const destinationService = {
  getAll: async (params?: any) => {
    return api.get<PaginatedResponse<IDestination>>("/destinations", { params });
  },
  getBySlug: async (slug: string) => {
    return api.get<ApiResponse<IDestination>>(`/destinations/${slug}`);
  },
  save: async (destinationId: string) => {
    return api.post<ApiResponse<null>>("/saved/destination", { destinationId });
  },
};
