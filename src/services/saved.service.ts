import { api } from "@/lib/api";
import { ISavedDestination, ISavedItinerary, ApiResponse } from "@/types";

export const savedService = {
  getSavedItems: async () => {
    return api.get<ApiResponse<{ destinations: ISavedDestination[]; itineraries: ISavedItinerary[] }>>("/saved");
  },
};
