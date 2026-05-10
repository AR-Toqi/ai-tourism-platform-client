import { api } from "@/lib/api";
import { ApiResponse, PaginatedResponse, IUser, IItinerary } from "@/types";

export const adminService = {
  getStats: async () => {
    return api.get<ApiResponse<any>>("/admin/dashboard-stats");
  },
  getUsers: async (role: "normal" | "content-managers") => {
    return api.get<PaginatedResponse<IUser>>(`/admin/users/${role}`);
  },
  updateUserStatus: async (id: string, status: string) => {
    return api.put<ApiResponse<IUser>>(`/admin/users/${id}/status`, { status });
  },
  updateUserRole: async (id: string, role: string) => {
    return api.put<ApiResponse<IUser>>(`/admin/users/${id}/role`, { role });
  },
  deleteUser: async (id: string) => {
    return api.delete<ApiResponse<null>>(`/admin/users/${id}`);
  },
  getAllItineraries: async () => {
    return api.get<PaginatedResponse<IItinerary>>("/admin/itineraries");
  },
  getAllReviews: async () => {
    return api.get<PaginatedResponse<any>>("/admin/reviews");
  },
};
