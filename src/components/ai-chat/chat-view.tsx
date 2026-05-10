"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { IChatMessage } from "@/types/chat";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatViewProps {
  chatId: string;
}

export function ChatView({ chatId }: ChatViewProps) {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsFetching(true);
        const res = await api.get<{ data: IChatMessage[] }>(`/ai-chat/${chatId}/messages`);
        setMessages(res.data || []);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setIsFetching(false);
        setTimeout(scrollToBottom, 100);
      }
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");

    // Optimistically add user message
    const tempUserMsg: IChatMessage = {
      id: Date.now().toString(),
      chatId,
      role: "user",
      content: userText,
      createdAt: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const res = await api.post<{ data: IChatMessage }>("/ai-chat/send", {
        chatId,
        content: userText,
      });
      // Add AI response
      setMessages((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Failed to send message:", error);
      // Revert optimistic update on failure? Or just show error?
      setMessages((prev) => [...prev, {
        id: Date.now().toString(),
        chatId,
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        createdAt: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white h-[calc(100vh-4rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-slate-500 font-medium">Loading conversation...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white h-[calc(100vh-4rem)] relative">
      {/* Header */}
      <div className="h-16 border-b border-slate-100 flex items-center px-6 bg-white/80 backdrop-blur-sm z-10 sticky top-0">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mr-4">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-slate-800">AI Travel Assistant</h2>
          <p className="text-xs text-slate-500 font-medium">Always here to help you plan</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Start Planning</h3>
            <p className="text-slate-500">
              Ask me about destinations, travel tips, or to help refine your AI-generated itinerary!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={cn(
                "flex w-full",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "flex max-w-[80%] md:max-w-[70%] gap-4",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1",
                    msg.role === "user"
                      ? "bg-slate-800 text-white"
                      : "bg-primary text-white"
                  )}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "px-5 py-3.5 rounded-2xl shadow-sm overflow-hidden",
                    msg.role === "user"
                      ? "bg-slate-800 text-white rounded-tr-sm"
                      : "bg-slate-100 text-slate-800 rounded-tl-sm"
                  )}
                >
                  {msg.role === "user" ? (
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="prose prose-sm prose-slate max-w-none dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="flex max-w-[80%] md:max-w-[70%] gap-4 flex-row">
              <div className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center mt-1 bg-primary text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-slate-100 rounded-tl-sm flex items-center gap-1.5 shadow-sm">
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form
          onSubmit={handleSend}
          className="max-w-4xl mx-auto relative flex items-center"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your travel plans..."
            disabled={isLoading}
            className="w-full h-14 pl-6 pr-14 rounded-full border-slate-200 bg-slate-50 focus-visible:ring-primary shadow-inner"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            size="icon"
            className="absolute right-2 rounded-full w-10 h-10 shadow-md"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
