import { api } from "@/lib/api";
import { IDestination, ApiResponse, PaginatedResponse } from "@/types";

export const contentManagerService = {
  updateDestination: async (id: string, data: any) => {
    return api.patch<ApiResponse<IDestination>>(`/content-manager/destinations/${id}`, data);
  },
  updateCover: async (id: string, data: FormData) => {
    return api.patch<ApiResponse<IDestination>>(`/content-manager/destinations/${id}/cover`, data);
  },
  uploadImages: async (id: string, data: FormData) => {
    return api.post<ApiResponse<IDestination>>(`/content-manager/destinations/${id}/images`, data);
  },
  deleteImage: async (destinationId: string, imageId: string) => {
    return api.delete<ApiResponse<null>>(`/content-manager/destinations/${destinationId}/images/${imageId}`);
  },
};
