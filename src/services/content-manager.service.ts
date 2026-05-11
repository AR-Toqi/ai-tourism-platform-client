import { api } from "@/lib/api";
import { IDestination, ApiResponse, PaginatedResponse } from "@/types";

export const contentManagerService = {
  getDestinations: async (params?: any) => {
    return api.get<PaginatedResponse<IDestination>>("/destinations", { params });
  },
  getDestinationById: async (id: string) => {
    return api.get<ApiResponse<IDestination>>(`/content-manager/destinations/${id}`);
  },
  createDestination: async (data: any) => {
    return api.post<ApiResponse<IDestination>>("/destinations", data);
  },
  updateDestination: async (id: string, data: any) => {
    return api.patch<ApiResponse<IDestination>>(`/content-manager/destinations/${id}`, data);
  },
  updateCover: async (id: string, data: FormData) => {
    return api.patch<ApiResponse<IDestination>>(`/content-manager/destinations/${id}/cover`, data);
  },
  uploadImages: async (id: string, data: FormData) => {
    return api.post<ApiResponse<IDestination>>(`/content-manager/destinations/${id}/images`, data);
  },
  updateGalleryImage: async (imageId: string, data: FormData | any) => {
    return api.patch<ApiResponse<any>>(`/content-manager/destinations/images/${imageId}`, data);
  },
  deleteImage: async (imageId: string) => {
    return api.delete<ApiResponse<null>>(`/content-manager/destinations/images/${imageId}`);
  },
};
