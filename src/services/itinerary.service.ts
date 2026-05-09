import { api } from "@/lib/api";
import { IItinerary, ApiResponse, PaginatedResponse } from "@/types";

export const itineraryService = {
  getMy: async () => {
    return api.get<PaginatedResponse<IItinerary>>("/itineraries/my-itineraries");
  },
  getById: async (id: string) => {
    return api.get<ApiResponse<IItinerary>>(`/itineraries/${id}`);
  },
  generate: async (data: any) => {
    return api.post<ApiResponse<IItinerary>>("/itineraries", data);
  },
};
