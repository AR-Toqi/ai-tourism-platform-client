import { api } from "@/lib/api";
import { IUser, ApiResponse } from "@/types";

export const userService = {
  getMe: async () => {
    return api.get<ApiResponse<IUser>>("/users/me");
  },
  updateProfile: async (data: FormData | any) => {
    return api.patch<ApiResponse<IUser>>("/users/me", data);
  },
  deleteAccount: async () => {
    return api.delete<ApiResponse<null>>("/users/me");
  },
  changePassword: async (data: any) => {
    return api.post<ApiResponse<null>>("/auth/change-password", data);
  },
};
