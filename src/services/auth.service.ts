import { api } from "@/lib/api";
import { IUser, ApiResponse } from "@/types";

export const authService = {
  login: async (data: any) => {
    return api.post<ApiResponse<{ user: IUser; accessToken: string }>>("/auth/login", data);
  },
  register: async (data: any) => {
    return api.post<ApiResponse<IUser>>("/auth/register", data);
  },
  logout: async () => {
    return api.post<ApiResponse<null>>("/auth/logout");
  },
  forgotPassword: async (email: string) => {
    return api.post<ApiResponse<null>>("/auth/forgot-password", { email });
  },
  resetPassword: async (data: any) => {
    return api.post<ApiResponse<null>>("/auth/reset-password", data);
  },
  verifyEmail: async (token: string) => {
    return api.post<ApiResponse<null>>("/auth/verify-email", { token });
  },
};
