import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { aiChatService } from "@/services/ai-chat.service";
import { queryKeys } from "@/lib/query-keys";

export function useMyChats() {
  return useQuery({
    queryKey: queryKeys.chat.my,
    queryFn: () => aiChatService.getMyChats(),
  });
}

export function useChatMessages(chatId: string) {
  return useQuery({
    queryKey: queryKeys.chat.messages(chatId),
    queryFn: () => aiChatService.getMessages(chatId),
    enabled: !!chatId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chatId, content }: { chatId: string; content: string }) => 
      aiChatService.sendMessage(chatId, content),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages(variables.chatId) });
    },
  });
}
