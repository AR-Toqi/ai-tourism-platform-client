"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/ai-chat/chat-sidebar";
import { ChatView } from "@/components/ai-chat/chat-view";
import { api } from "@/lib/api";
import { IChat } from "@/types/chat";
import { Bot } from "lucide-react";

export default function AiChatPage() {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleNewChat = async () => {
    try {
      setIsCreating(true);
      const res = await api.post<{ data: IChat }>("/ai-chat", {
        title: "New Conversation"
      });
      setActiveChatId(res.data.id);
    } catch (error) {
      console.error("Failed to create new chat:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-slate-50 overflow-hidden">
      {/* Sidebar - Hidden on mobile unless toggled (for future mobile optimization) */}
      <div className="hidden md:block">
        <ChatSidebar 
          activeChatId={activeChatId} 
          onSelectChat={setActiveChatId} 
          onNewChat={handleNewChat} 
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        {activeChatId ? (
          <ChatView chatId={activeChatId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-sm">
              <Bot className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Welcome to AI Chat</h2>
            <p className="text-slate-500 max-w-md mb-8">
              Select a conversation from the sidebar or start a new one to get expert travel advice and itinerary planning.
            </p>
            <button 
              onClick={handleNewChat}
              disabled={isCreating}
              className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70"
            >
              {isCreating ? "Starting..." : "Start New Conversation"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

