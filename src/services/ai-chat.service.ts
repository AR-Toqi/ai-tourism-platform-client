import { api } from "@/lib/api";
import { IChat, IChatMessage, ApiResponse, PaginatedResponse } from "@/types";

export const aiChatService = {
  getMyChats: async () => {
    return api.get<PaginatedResponse<IChat>>("/ai-chat/my-chats");
  },
  getMessages: async (chatId: string) => {
    return api.get<PaginatedResponse<IChatMessage>>(`/ai-chat/${chatId}/messages`);
  },
  sendMessage: async (chatId: string, content: string) => {
    return api.post<ApiResponse<IChatMessage>>("/ai-chat/send", { chatId, content });
  },
  startChat: async (title: string) => {
    return api.post<ApiResponse<IChat>>("/ai-chat", { title });
  },
};
