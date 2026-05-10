"use client";

import { useEffect, useState } from "react";
import { PlusCircle, MessageSquare, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { IChat } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
}

export function ChatSidebar({ activeChatId, onSelectChat, onNewChat }: ChatSidebarProps) {
  const [chats, setChats] = useState<IChat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchChats = async () => {
    try {
      setIsLoading(true);
      const res = await api.get<{ data: IChat[] }>("/ai-chat/my-chats");
      setChats(res.data);
    } catch (error) {
      console.error("Failed to fetch chats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [activeChatId]); // Refetch when active chat changes to update titles if needed

  return (
    <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50 flex flex-col h-[calc(100vh-4rem)]">
      <div className="p-4 border-b border-slate-200">
        <Button 
          onClick={onNewChat} 
          className="w-full justify-start gap-2 h-12 rounded-xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 shadow-sm"
        >
          <PlusCircle className="w-5 h-5 text-primary" />
          <span className="font-semibold">New Chat</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
          Your Conversations
        </h3>

        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
          </div>
        ) : chats.length === 0 ? (
          <div className="text-center p-4 text-slate-500 text-sm">
            No past conversations.
          </div>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl flex items-start gap-3 transition-colors group",
                activeChatId === chat.id 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-slate-200 text-slate-700"
              )}
            >
              <MessageSquare className={cn(
                "w-5 h-5 shrink-0 mt-0.5",
                activeChatId === chat.id ? "text-primary" : "text-slate-400 group-hover:text-slate-600"
              )} />
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate text-sm">
                  {chat.title || "New Conversation"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(chat.createdAt).toLocaleDateString()}
                </p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
